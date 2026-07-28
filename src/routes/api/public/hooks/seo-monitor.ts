import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { tools, SITE } from "@/data/tools";

// روابط ثابتة من السايت ماب
function sitemapUrls(): string[] {
  return [
    `${SITE.url}/`,
    `${SITE.url}/about`,
    `${SITE.url}/privacy`,
    `${SITE.url}/terms`,
    ...tools.map((t) => `${SITE.url}/tools/${t.slug}`),
  ];
}

// عيّنة روابط شائعة الشك (سلاجات قديمة/محذوفة أو أخطاء شائعة)
const SUSPECT_STALE_URLS: string[] = [
  `${SITE.url}/tools/transalor`,
  `${SITE.url}/tools/qr`,
  `${SITE.url}/tools/qr-code`,
  `${SITE.url}/tools/whats-app`,
  `${SITE.url}/tools/ai`,
  `${SITE.url}/tools/analytics`,
  `${SITE.url}/tools/security`,
  `${SITE.url}/admin`,
  `${SITE.url}/wp-login.php`,
  `${SITE.url}/wp-admin`,
  `${SITE.url}/login`,
  `${SITE.url}/dashboard`,
];

type InspectionResult = {
  inspectionResult?: {
    indexStatusResult?: {
      verdict?: string;
      coverageState?: string;
      robotsTxtState?: string;
      indexingState?: string;
      pageFetchState?: string;
      lastCrawlTime?: string;
    };
  };
};

async function inspectUrl(url: string) {
  const res = await fetch(
    "https://connector-gateway.lovable.dev/google_search_console/v1/urlInspection/index:inspect",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.LOVABLE_API_KEY}`,
        "X-Connection-Api-Key": process.env.GOOGLE_SEARCH_CONSOLE_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inspectionUrl: url, siteUrl: `${SITE.url}/` }),
    }
  );
  if (!res.ok) return { url, error: `HTTP ${res.status}` };
  const data = (await res.json()) as InspectionResult;
  return { url, data };
}

function classify(idx?: InspectionResult["inspectionResult"]) {
  if (!idx?.indexStatusResult) return null;
  const s = idx.indexStatusResult;
  const verdict = s.verdict ?? "";
  const coverage = (s.coverageState ?? "").toLowerCase();
  const robots = s.robotsTxtState ?? "";
  // نلتقط فقط المشاكل الحقيقية — noindex أو soft-404 أو حجب robots
  if (coverage.includes("noindex")) return "noindex";
  if (coverage.includes("soft 404") || coverage.includes("soft_404")) return "soft_404";
  if (robots.toUpperCase() === "DISALLOWED" && verdict === "FAIL") return "blocked_by_robots";
  return null;
}

export const Route = createFileRoute("/api/public/hooks/seo-monitor")({
  server: {
    handlers: {
      POST: async () => {
        if (!process.env.LOVABLE_API_KEY || !process.env.GOOGLE_SEARCH_CONSOLE_API_KEY) {
          return new Response(JSON.stringify({ error: "Missing GSC credentials" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
        const supabase = createClient(
          process.env.SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!,
          { auth: { persistSession: false, autoRefreshToken: false } }
        );

        const urls = Array.from(new Set([...sitemapUrls(), ...SUSPECT_STALE_URLS]));

        // فحص متوازي (5 دفعات) لتجنّب المهلة
        const results: Array<{
          url: string;
          issue?: string;
          idx?: InspectionResult["inspectionResult"];
          error?: string;
        }> = [];
        const CONCURRENCY = 5;
        for (let i = 0; i < urls.length; i += CONCURRENCY) {
          const chunk = urls.slice(i, i + CONCURRENCY);
          const chunkResults = await Promise.all(chunk.map(inspectUrl));
          for (const r of chunkResults) {
            if ("error" in r && r.error) {
              results.push({ url: r.url, error: r.error });
            } else if ("data" in r && r.data) {
              const idx = r.data.inspectionResult;
              const issue = classify(idx);
              results.push({ url: r.url, issue: issue ?? undefined, idx });
            }
          }
        }

        const issues = results.filter((r) => r.issue);

        const { data: scan, error: scanErr } = await supabase
          .from("seo_index_scans")
          .insert({
            urls_checked: urls.length,
            issues_found: issues.length,
            status: issues.length ? "issues_found" : "ok",
          })
          .select("id")
          .single();
        if (scanErr) throw scanErr;

        if (issues.length) {
          await supabase.from("seo_index_issues").insert(
            issues.map((i) => ({
              scan_id: scan.id,
              url: i.url,
              verdict: i.idx?.indexStatusResult?.verdict ?? null,
              coverage_state: i.idx?.indexStatusResult?.coverageState ?? null,
              robots_txt_state: i.idx?.indexStatusResult?.robotsTxtState ?? null,
              indexing_state: i.idx?.indexStatusResult?.indexingState ?? null,
              issue_type: i.issue!,
              raw: i.idx as unknown as Record<string, unknown>,
            }))
          );

          // تنبيه بالإيميل عبر Lovable Emails
          const recipient = process.env.SEO_ALERT_EMAIL;
          if (recipient) {
            try {
              await supabase.rpc("enqueue_email", {
                queue_name: "transactional_emails",
                payload: {
                  templateName: "seo-index-alert",
                  recipientEmail: recipient,
                  idempotencyKey: `seo-alert-${scan.id}`,
                  templateData: {
                    issueCount: issues.length,
                    urlsChecked: urls.length,
                    issues: issues.slice(0, 20).map((i) => ({
                      url: i.url,
                      issue: i.issue,
                      coverage: i.idx?.indexStatusResult?.coverageState ?? "",
                    })),
                  },
                },
              });
            } catch (e) {
              console.error("Failed to enqueue SEO alert email", e);
            }
          }
        }

        return new Response(
          JSON.stringify({
            ok: true,
            scan_id: scan.id,
            urls_checked: urls.length,
            issues_found: issues.length,
            issues: issues.map((i) => ({ url: i.url, issue: i.issue })),
          }),
          { headers: { "Content-Type": "application/json" } }
        );
      },
    },
  },
} as any);
