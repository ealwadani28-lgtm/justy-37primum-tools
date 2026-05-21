import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { runSecurityAudit, type AuditResult } from "@/lib/security-audit.functions";
import { arNumber, toArabicDigits } from "@/lib/utils";

export function SecurityAudit() {
  const auditFn = useServerFn(runSecurityAudit);
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await auditFn({ data: { url: url.trim() } });
      setResult(res);
    } catch (err) {
      setResult({
        url,
        host: url,
        https: false,
        status: null,
        totalScore: 0,
        headersScore: 0,
        httpsScore: 0,
        headerChecks: [],
        allHeaders: {},
        aiSummary: "",
        aiRecommendations: [],
        error: err instanceof Error ? err.message : "فشل غير معروف",
      });
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (s: number) =>
    s >= 80 ? "text-emerald-400" : s >= 50 ? "text-amber-400" : "text-rose-400";

  return (
    <div className="space-y-6" dir="rtl">
      <form onSubmit={handleScan} className="flex flex-col sm:flex-row gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          dir="ltr"
          className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-mint-gradient text-primary-foreground font-bold px-6 py-3 rounded-xl disabled:opacity-50"
        >
          {loading ? "جارٍ الفحص..." : "ابدأ الفحص"}
        </button>
      </form>

      {loading && (
        <div className="rounded-2xl border border-border bg-card p-6 text-center text-muted-foreground shadow-card-soft">
          نُحلّل رؤوس الأمان والشهادة ونمرّر النتيجة لمحرك الذكاء الاصطناعي...
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {result.error && (
            <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-4 text-rose-300">
              ⚠️ {result.error}
            </div>
          )}

          {!result.error && (
            <>
              {/* KPIs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="rounded-2xl border border-border bg-card p-4 shadow-card-soft">
                  <div className="text-xs text-muted-foreground">الدرجة الكلية</div>
                  <div className={`text-2xl font-extrabold ${scoreColor(result.totalScore)}`}>
                    {toArabicDigits(result.totalScore)}%
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-card-soft">
                  <div className="text-xs text-muted-foreground">HTTPS</div>
                  <div
                    className={`text-2xl font-extrabold ${result.https ? "text-emerald-400" : "text-rose-400"}`}
                  >
                    {result.https ? "✓ مفعّل" : "✗ معطّل"}
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-card-soft">
                  <div className="text-xs text-muted-foreground">رؤوس الأمان</div>
                  <div className={`text-2xl font-extrabold ${scoreColor(result.headersScore)}`}>
                    {toArabicDigits(result.headersScore)}%
                  </div>
                </div>
                <div className="rounded-2xl border border-border bg-card p-4 shadow-card-soft">
                  <div className="text-xs text-muted-foreground">حالة الاستجابة</div>
                  <div className="text-2xl font-extrabold text-foreground">
                    {result.status ? toArabicDigits(result.status) : "—"}
                  </div>
                </div>
              </div>

              {/* AI Summary */}
              {result.aiSummary && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-primary">🤖</span>
                    <h3 className="font-bold">تحليل الذكاء الاصطناعي</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{result.aiSummary}</p>
                </div>
              )}

              {/* Recommendations */}
              {result.aiRecommendations.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
                  <h3 className="font-bold mb-4">التوصيات ({arNumber(result.aiRecommendations.length)})</h3>
                  <div className="space-y-4">
                    {result.aiRecommendations.map((r, i) => {
                      const priorityStyle =
                        r.priority === "critical"
                          ? { label: "حرجة", cls: "bg-rose-500/15 text-rose-300 border-rose-500/30" }
                          : r.priority === "warning"
                          ? { label: "متوسطة", cls: "bg-amber-500/15 text-amber-300 border-amber-500/30" }
                          : { label: "اختيارية", cls: "bg-sky-500/15 text-sky-300 border-sky-500/30" };
                      return (
                        <div key={i} className="rounded-xl border border-border bg-secondary/30 p-4 space-y-3">
                          <div className="flex items-start justify-between gap-3 flex-wrap">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-primary">{toArabicDigits(i + 1)}.</span>
                              <h4 className="font-bold">{r.title}</h4>
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full border ${priorityStyle.cls}`}>
                              {priorityStyle.label}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground leading-relaxed">{r.description}</p>
                          {r.codeSnippet && (
                            <div className="relative">
                              <div className="text-xs text-muted-foreground mb-1">انسخ السطر التالي إلى إعدادات خادمك:</div>
                              <pre
                                dir="ltr"
                                className="bg-background border border-border rounded-lg p-3 text-xs font-mono overflow-x-auto"
                              >
                                {r.codeSnippet}
                              </pre>
                              <button
                                type="button"
                                onClick={() => navigator.clipboard?.writeText(r.codeSnippet)}
                                className="absolute top-7 left-2 text-xs px-2 py-1 rounded bg-primary/20 hover:bg-primary/30 text-primary"
                              >
                                نسخ
                              </button>
                            </div>
                          )}
                          {r.docUrl && (
                            <a
                              href={r.docUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                            >
                              اقرأ المزيد على MDN ↗
                            </a>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Header checks */}
              <div className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
                <h3 className="font-bold mb-3">
                  فحص رؤوس الأمان ({arNumber(result.headerChecks.filter((h) => h.present).length)}/
                  {arNumber(result.headerChecks.length)})
                </h3>
                <div className="space-y-2">
                  {result.headerChecks.map((h) => (
                    <div
                      key={h.key}
                      className="flex items-center justify-between p-3 rounded-xl bg-secondary/40 text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`text-lg ${h.present ? "text-emerald-400" : "text-rose-400"}`}
                        >
                          {h.present ? "✓" : "✗"}
                        </span>
                        <span className="font-semibold">{h.name}</span>
                      </div>
                      <span className="text-xs text-muted-foreground" dir="ltr">
                        {h.value ? h.value.slice(0, 60) + (h.value.length > 60 ? "..." : "") : "مفقود"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Raw headers */}
              {Object.keys(result.allHeaders).length > 0 && (
                <details className="rounded-2xl border border-border bg-card p-5 shadow-card-soft">
                  <summary className="font-bold cursor-pointer">
                    جميع رؤوس الاستجابة ({arNumber(Object.keys(result.allHeaders).length)})
                  </summary>
                  <div className="mt-3 space-y-1 text-xs font-mono max-h-72 overflow-auto" dir="ltr">
                    {Object.entries(result.allHeaders).map(([k, v]) => (
                      <div key={k} className="p-2 rounded bg-secondary/40">
                        <span className="text-primary">{k}:</span>{" "}
                        <span className="text-muted-foreground break-all">{v}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
