import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ActionBar } from "@/components/ActionBar";
import { translateText } from "@/lib/translator.functions";

export function Translator() {
  const translate = useServerFn(translateText);
  const [text, setText] = useState("مرحباً، كيف حالك اليوم؟");
  const [lang, setLang] = useState<"ar" | "en" | "fr" | "es" | "tr">("en");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const langs = [
    { code: "ar", label: "العربية" },
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "tr", label: "Türkçe" },
  ] as const;

  useEffect(() => {
    const trimmed = text.trim();
    if (!trimmed) {
      setResult("");
      setErr(null);
      return;
    }
    const ctrl = { cancelled: false };
    setLoading(true);
    setErr(null);
    const t = setTimeout(async () => {
      try {
        const res = await translate({ data: { text: trimmed, target: lang } });
        if (ctrl.cancelled) return;
        if (res.error) setErr(res.error);
        setResult(res.translation);
      } catch (e) {
        if (!ctrl.cancelled) setErr((e as Error).message);
      } finally {
        if (!ctrl.cancelled) setLoading(false);
      }
    }, 600);
    return () => {
      ctrl.cancelled = true;
      clearTimeout(t);
    };
  }, [text, lang, translate]);

  return (
    <div className="space-y-6">
      <div className="text-xs text-muted-foreground bg-secondary border border-border rounded-xl p-3">
        💡 ترجمة فورية مدعومة بالذكاء الاصطناعي — يدعم نصوصاً طويلة وأي لغة من القائمة
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold mb-2 block">النص الأصلي</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={8}
            className="w-full bg-input border border-border rounded-xl p-3"
            placeholder="اكتب أو الصق النص هنا..."
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">
              الترجمة {loading && <span className="text-xs text-muted-foreground">· جاري الترجمة...</span>}
            </label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as typeof lang)}
              className="bg-input border border-border rounded-lg px-3 py-1 text-sm"
            >
              {langs.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
          <div
            className="w-full bg-secondary border border-border rounded-xl p-3 min-h-[196px] text-lg whitespace-pre-wrap"
            dir={lang === "ar" ? "rtl" : "ltr"}
          >
            {err ? <span className="text-destructive text-sm">{err}</span> : result || <span className="text-muted-foreground text-sm">ستظهر الترجمة هنا...</span>}
          </div>
        </div>
      </div>

      <ActionBar
        copyText={result}
        copyLabel="نسخ الترجمة"
        downloadText={{ content: `${text}\n→ ${result}`, filename: "translation.txt" }}
        downloadLabel="تحميل نص"
        share={{ title: "ترجمة", text: result }}
      />
    </div>
  );
}
