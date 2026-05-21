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
  error: string | null;
}

function normalizeUrl(raw: string): string {
  const trimmed = raw.trim();
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `https://${trimmed}`;
}

async function aiAnalyze(payload: {
  host: string;
  https: boolean;
  totalScore: number;
  missingHeaders: string[];
  presentHeaders: string[];
}): Promise<{ summary: string; recommendations: string[] }> {
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
              "أنت خبير أمن سيبراني تكتب باللغة العربية الفصحى الواضحة. أعطِ ملخصاً موجزاً (سطرين) وقائمة توصيات عملية مرتّبة حسب الأولوية. لا تستخدم Markdown.",
          },
          {
            role: "user",
            content: `حلّل نتيجة فحص أمان الموقع التالي:
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
              description: "تقرير تحليل أمني بالعربية",
              parameters: {
                type: "object",
                properties: {
                  summary: { type: "string", description: "ملخص بسطرين" },
                  recommendations: {
                    type: "array",
                    items: { type: "string" },
                    description: "3 إلى 6 توصيات عملية مرتبة بالأولوية",
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

    return {
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
      error: null,
    };
  });
