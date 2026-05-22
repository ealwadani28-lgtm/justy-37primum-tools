import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { ActionBar } from "@/components/ActionBar";
import { generateAiContent } from "@/lib/ai-studio.functions";

const FORMATS = [
  { id: "ad", label: "إعلان", icon: "📣" },
  { id: "social", label: "منشور سوشيال", icon: "💬" },
  { id: "product", label: "وصف منتج", icon: "🛍️" },
  { id: "email", label: "بريد تسويقي", icon: "✉️" },
] as const;

const TONES = [
  { id: "professional", label: "احترافية" },
  { id: "friendly", label: "ودودة" },
  { id: "luxury", label: "فاخرة" },
  { id: "playful", label: "مرحة" },
] as const;

export function AiContent() {
  const generate = useServerFn(generateAiContent);
  const [idea, setIdea] = useState("عطر فاخر نسائي بنفحات الورد والعود يناسب المناسبات");
  const [format, setFormat] = useState<(typeof FORMATS)[number]["id"]>("ad");
  const [tone, setTone] = useState<(typeof TONES)[number]["id"]>("luxury");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function run() {
    const trimmed = idea.trim();
    if (!trimmed) return;
    setLoading(true);
    setErr(null);
    setText("");
    try {
      const res = await generate({ data: { idea: trimmed, format, tone } });
      if (res.error) setErr(res.error);
      setText(res.text);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-xs text-muted-foreground bg-secondary border border-border rounded-xl p-3">
        ✨ صياغة احترافية مدعومة بالذكاء الاصطناعي — اكتب فكرتك واترك الباقي علينا
      </div>

      <div>
        <label className="text-sm font-semibold mb-2 block">فكرة المنتج أو الموضوع</label>
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          rows={3}
          placeholder="مثال: كورس تعلّم البرمجة للمبتدئين..."
          className="w-full bg-input border border-border rounded-xl p-3"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold mb-2 block">نوع المحتوى</label>
          <div className="grid grid-cols-2 gap-2">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                onClick={() => setFormat(f.id)}
                className={`rounded-xl border p-3 text-sm text-right transition ${
                  format === f.id ? "border-primary bg-primary/10" : "border-border bg-input hover:border-primary/50"
                }`}
              >
                <span className="me-2">{f.icon}</span>
                {f.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label className="text-sm font-semibold mb-2 block">نبرة الكتابة</label>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTone(t.id)}
                className={`rounded-xl border p-3 text-sm transition ${
                  tone === t.id ? "border-primary bg-primary/10" : "border-border bg-input hover:border-primary/50"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={run}
        disabled={loading || !idea.trim()}
        className="w-full rounded-xl bg-primary text-primary-foreground font-bold py-3 hover:opacity-90 disabled:opacity-50 transition"
      >
        {loading ? "جاري الإبداع..." : "✨ ولّد المحتوى"}
      </button>

      <div className="rounded-2xl border border-border bg-secondary p-5 min-h-[140px] whitespace-pre-wrap leading-relaxed text-base">
        {err ? (
          <span className="text-destructive text-sm">{err}</span>
        ) : text ? (
          text
        ) : (
          <span className="text-muted-foreground text-sm">سيظهر المحتوى هنا بعد التوليد...</span>
        )}
      </div>

      {text && (
        <ActionBar
          copyText={text}
          copyLabel="نسخ المحتوى"
          downloadText={{ content: text, filename: "ai-content.txt" }}
          downloadLabel="تحميل ملف"
          share={{ title: "محتوى مولّد بالذكاء الاصطناعي", text }}
        />
      )}
    </div>
  );
}
