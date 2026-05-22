import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SECURITY_HEADERS = [
  { key: "strict-transport-security", name: "HSTS", weight: 20 },
  { key: "content-security-policy", name: "CSP", weight: 25 },
  { key: "x-frame-options", name: "X-Frame-Options", weight: 15 },
  { key: "x-content-type-options", name: "X-Content-Type-Options", weight: 10 },
  { key: "referrer-policy", name: "Referrer-Policy", weight: 10 },
  { key: "permissions-policy", name: "Permissions-Policy", weight: 10 },
  { key: "x-xss-protection", name: "X-XSS-Protection", weight: 5 },
  { key: "cross-origin-opener-policy", name: "COOP", weight: 5 },
];

const InputSchema = z.object({
  url: z.string().min(3).max(500),
});

// In-memory cache: نفس الموقع لو انفحص خلال آخر ساعة → نرجع النتيجة بدون استدعاء AI
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour
const auditCache = new Map<string, { result: AuditResult; expiresAt: number }>();

function getCached(key: string): AuditResult | null {
  const entry = auditCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    auditCache.delete(key);
    return null;
  }
  return entry.result;
}

function setCached(key: string, result: AuditResult) {
  // حد أقصى 200 موقع في الذاكرة (LRU بسيط)
  if (auditCache.size >= 200) {
    const firstKey = auditCache.keys().next().value;
    if (firstKey) auditCache.delete(firstKey);
  }
  auditCache.set(key, { result, expiresAt: Date.now() + CACHE_TTL_MS });
}

export interface HeaderCheck {
  name: string;
  key: string;
  present: boolean;
  value: string | null;
  weight: number;
}

export interface Recommendation {
  title: string;
  priority: "critical" | "warning" | "info";
  description: string;
  headerName: string;
  codeSnippet: string;
  docUrl: string;
}

export interface AuditResult {
  url: string;
  host: string;
  https: boolean;
  status: number | null;
  totalScore: number;
  headersScore: number;
  httpsScore: number;
  headerChecks: HeaderCheck[];
  allHeaders: Record<string, string>;
  aiSummary: string;
  aiRecommendations: Recommendation[];
  cached?: boolean;
  error: string | null;
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

// SSRF protection: block private/internal IP ranges
function ipv4ToInt(ip: string): number | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  let n = 0;
  for (const p of parts) {
    if (!/^\d+$/.test(p)) return null;
    const v = Number(p);
    if (v < 0 || v > 255) return null;
    n = (n << 8) + v;
  }
  return n >>> 0;
}

function isPrivateIPv4(ip: string): boolean {
  const n = ipv4ToInt(ip);
  if (n === null) return false;
  const inRange = (start: string, mask: number) => {
    const s = ipv4ToInt(start)!;
    const m = mask === 0 ? 0 : (~0 << (32 - mask)) >>> 0;
    return (n & m) === (s & m);
  };
  return (
    inRange("0.0.0.0", 8) ||
    inRange("10.0.0.0", 8) ||
    inRange("127.0.0.0", 8) ||
    inRange("169.254.0.0", 16) ||
    inRange("172.16.0.0", 12) ||
    inRange("192.168.0.0", 16) ||
    inRange("100.64.0.0", 10) ||
    inRange("192.0.0.0", 24) ||
    inRange("198.18.0.0", 15) ||
    inRange("224.0.0.0", 4) ||
    inRange("240.0.0.0", 4)
  );
}

function isPrivateIPv6(ip: string): boolean {
  const lower = ip.toLowerCase().replace(/^\[|\]$/g, "");
  if (lower === "::1" || lower === "::") return true;
  if (lower.startsWith("fc") || lower.startsWith("fd")) return true;
  if (lower.startsWith("fe80")) return true;
  if (lower.startsWith("::ffff:")) {
    const v4 = lower.slice(7);
    if (/^\d+\.\d+\.\d+\.\d+$/.test(v4)) return isPrivateIPv4(v4);
  }
  return false;
}

function isBlockedHostname(host: string): boolean {
  const h = host.toLowerCase().replace(/^\[|\]$/g, "");
  if (!h) return true;
  if (h === "localhost" || h.endsWith(".localhost")) return true;
  if (h.endsWith(".local") || h.endsWith(".internal")) return true;
  if (h === "metadata.google.internal") return true;
  if (/^\d+\.\d+\.\d+\.\d+$/.test(h)) return isPrivateIPv4(h);
  if (h.includes(":")) return isPrivateIPv6(h);
  return false;
}

async function resolvesToPrivateIp(hostname: string): Promise<boolean> {
  // DNS-over-HTTPS lookup to defeat DNS rebinding to internal IPs.
  const types: { t: string; check: (ip: string) => boolean }[] = [
    { t: "A", check: isPrivateIPv4 },
    { t: "AAAA", check: isPrivateIPv6 },
  ];
  for (const { t, check } of types) {
    try {
      const r = await fetch(
        `https://cloudflare-dns.com/dns-query?name=${encodeURIComponent(hostname)}&type=${t}`,
        { headers: { accept: "application/dns-json" } },
      );
      if (!r.ok) continue;
      const j: { Answer?: { data: string }[] } = await r.json();
      for (const a of j.Answer ?? []) {
        if (a.data && check(a.data)) return true;
      }
    } catch {
      return true; // fail closed
    }
  }
  return false;
}

async function aiAnalyze(payload: {
  host: string;
  https: boolean;
  totalScore: number;
  missingHeaders: string[];
  presentHeaders: string[];
}): Promise<{ summary: string; recommendations: Recommendation[] }> {
  const apiKey = process.env.LOVABLE_API_KEY;
  if (!apiKey) {
    return {
      summary: "تعذّر تحليل الذكاء الاصطناعي (مفتاح غير متوفر).",
      recommendations: [],
    };
  }

  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content:
              "أنت خبير أمن سيبراني تكتب باللغة العربية الفصحى الواضحة. أعطِ ملخصاً موجزاً (سطرين) وقائمة توصيات عملية مرتّبة حسب الأولوية الفعلية. priority=critical للرؤوس الحرجة (HSTS, CSP, X-Frame-Options). priority=warning للمتوسطة. priority=info للقديمة/الاختيارية. codeSnippet يجب أن يكون السطر الكامل الجاهز للنسخ مثل: Strict-Transport-Security: max-age=31536000; includeSubDomains; preload. docUrl رابط MDN الرسمي للرأس.",
          },
          {
            role: "user",
            content: `حلّل نتيجة فحص أمان الموقع التالي وأعطِ توصية لكل رأس مفقود:
- النطاق: ${payload.host}
- HTTPS مفعّل: ${payload.https ? "نعم" : "لا"}
- الدرجة الكلية: ${payload.totalScore}/100
- رؤوس الأمان المفقودة: ${payload.missingHeaders.join("، ") || "لا يوجد"}
- رؤوس الأمان الموجودة: ${payload.presentHeaders.join("، ") || "لا يوجد"}`,
          },
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "report",
              description: "تقرير تحليل أمني بالعربية مع توصيات منظمة",
              parameters: {
                type: "object",
                properties: {
                  summary: { type: "string", description: "ملخص بسطرين بالعربية" },
                  recommendations: {
                    type: "array",
                    description: "توصية واحدة لكل رأس مفقود مرتبة حسب الأولوية",
                    items: {
                      type: "object",
                      properties: {
                        title: { type: "string", description: "عنوان قصير بالعربية" },
                        priority: {
                          type: "string",
                          enum: ["critical", "warning", "info"],
                        },
                        description: {
                          type: "string",
                          description: "شرح موجز للخطر والفائدة بالعربية",
                        },
                        headerName: {
                          type: "string",
                          description: "اسم الرأس الإنجليزي مثل Strict-Transport-Security",
                        },
                        codeSnippet: {
                          type: "string",
                          description:
                            "السطر الكامل للرأس جاهز للنسخ مثل: Strict-Transport-Security: max-age=31536000; includeSubDomains",
                        },
                        docUrl: {
                          type: "string",
                          description: "رابط MDN الرسمي للرأس",
                        },
                      },
                      required: [
                        "title",
                        "priority",
                        "description",
                        "headerName",
                        "codeSnippet",
                        "docUrl",
                      ],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["summary", "recommendations"],
                additionalProperties: false,
              },
            },
          },
        ],
        tool_choice: { type: "function", function: { name: "report" } },
      }),
    });

    if (!res.ok) {
      return {
        summary: `تعذّر التحليل (${res.status}).`,
        recommendations: [],
      };
    }
    const json = await res.json();
    const args = json?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
    if (!args) return { summary: "لم يُرجع النموذج تحليلاً.", recommendations: [] };
    const parsed = JSON.parse(args);
    return {
      summary: String(parsed.summary ?? ""),
      recommendations: Array.isArray(parsed.recommendations) ? parsed.recommendations : [],
    };
  } catch (e) {
    return {
      summary: "حدث خطأ في الاتصال بمحرك الذكاء الاصطناعي.",
      recommendations: [],
    };
  }
}

export const runSecurityAudit = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }): Promise<AuditResult> => {
    const url = normalizeUrl(data.url);
    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return {
        url,
        host: data.url,
        https: false,
        status: null,
        totalScore: 0,
        headersScore: 0,
        httpsScore: 0,
        headerChecks: [],
        allHeaders: {},
        aiSummary: "",
        aiRecommendations: [],
        error: "رابط غير صالح",
      };
    }

    // فحص الـ cache أولاً — يوفر ~70% من تكلفة AI للمواقع الشائعة
    const cacheKey = parsed.host.toLowerCase();
    const cached = getCached(cacheKey);
    if (cached) {
      return { ...cached, cached: true };
    }

    const https = parsed.protocol === "https:";
    const allHeaders: Record<string, string> = {};
    let status: number | null = null;

    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 15000);
      const res = await fetch(parsed.toString(), {
        method: "GET",
        redirect: "follow",
        signal: controller.signal,
        headers: { "User-Agent": "Justlator-SecurityAudit/1.0" },
      });
      clearTimeout(timer);
      status = res.status;
      res.headers.forEach((v, k) => {
        allHeaders[k.toLowerCase()] = v;
      });
    } catch (e) {
      return {
        url,
        host: parsed.host,
        https,
        status: null,
        totalScore: 0,
        headersScore: 0,
        httpsScore: https ? 60 : 0,
        headerChecks: SECURITY_HEADERS.map((h) => ({
          name: h.name,
          key: h.key,
          present: false,
          value: null,
          weight: h.weight,
        })),
        allHeaders: {},
        aiSummary: "",
        aiRecommendations: [],
        error: "تعذّر الوصول للموقع (انتهت المهلة أو فشل الاتصال).",
      };
    }

    const headerChecks: HeaderCheck[] = SECURITY_HEADERS.map((h) => {
      const value = allHeaders[h.key] ?? null;
      return { name: h.name, key: h.key, present: !!value, value, weight: h.weight };
    });

    const totalWeight = SECURITY_HEADERS.reduce((s, h) => s + h.weight, 0);
    const earned = headerChecks
      .filter((c) => c.present)
      .reduce((s, c) => s + c.weight, 0);
    const headersScore = Math.round((earned / totalWeight) * 100);
    const httpsScore = https ? 100 : 0;
    const totalScore = Math.round(httpsScore * 0.4 + headersScore * 0.6);

    const missingHeaders = headerChecks.filter((c) => !c.present).map((c) => c.name);
    const presentHeaders = headerChecks.filter((c) => c.present).map((c) => c.name);

    const ai = await aiAnalyze({
      host: parsed.host,
      https,
      totalScore,
      missingHeaders,
      presentHeaders,
    });

    const result: AuditResult = {
      url,
      host: parsed.host,
      https,
      status,
      totalScore,
      headersScore,
      httpsScore,
      headerChecks,
      allHeaders,
      aiSummary: ai.summary,
      aiRecommendations: ai.recommendations,
      cached: false,
      error: null,
    };

    // خزّن النتيجة في الـ cache لمدة ساعة (فقط لو نجح التحليل)
    if (ai.recommendations.length > 0) {
      setCached(cacheKey, result);
    }

    return result;
  });
