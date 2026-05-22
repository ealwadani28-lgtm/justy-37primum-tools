import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { generateAiImage } from "@/lib/ai-studio.functions";

const STYLES = [
  { id: "product", label: "منتج استوديو", icon: "📦" },
  { id: "lifestyle", label: "حياتي طبيعي", icon: "🌿" },
  { id: "minimal", label: "مينيمال أنيق", icon: "◽" },
  { id: "luxury", label: "فاخر سينمائي", icon: "💎" },
] as const;

export function AiImage() {
  const generate = useServerFn(generateAiImage);
  const [prompt, setPrompt] = useState("زجاجة عطر شفافة على رخام أبيض مع بتلات ورد ذهبية");
  const [style, setStyle] = useState<(typeof STYLES)[number]["id"]>("luxury");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function run() {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    setLoading(true);
    setErr(null);
    setImageUrl("");
    try {
      const res = await generate({ data: { prompt: trimmed, style } });
      if (res.error) setErr(res.error);
      setImageUrl(res.imageUrl);
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="text-xs text-muted-foreground bg-secondary border border-border rounded-xl p-3">
        🎨 توليد صور منتجات احترافية بدقة مذهلة — صف منتجك واختر الستايل
      </div>

      <div>
        <label className="text-sm font-semibold mb-2 block">وصف الصورة</label>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          placeholder="مثال: ساعة يد ذهبية على رخام أسود مع إضاءة درامية..."
          className="w-full bg-input border border-border rounded-xl p-3"
        />
      </div>

      <div>
        <label className="text-sm font-semibold mb-2 block">أسلوب التصوير</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {STYLES.map((s) => (
            <button
              key={s.id}
              onClick={() => setStyle(s.id)}
              className={`rounded-xl border p-3 text-sm transition ${
                style === s.id ? "border-primary bg-primary/10" : "border-border bg-input hover:border-primary/50"
              }`}
            >
              <div className="text-xl mb-1">{s.icon}</div>
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={run}
        disabled={loading || !prompt.trim()}
        className="w-full rounded-xl bg-primary text-primary-foreground font-bold py-3 hover:opacity-90 disabled:opacity-50 transition"
      >
        {loading ? "جاري التوليد... (قد يستغرق 10-20 ثانية)" : "🎨 ولّد الصورة"}
      </button>

      <div className="rounded-2xl border border-border bg-secondary p-3 min-h-[280px] flex items-center justify-center overflow-hidden">
        {err ? (
          <span className="text-destructive text-sm">{err}</span>
        ) : loading ? (
          <div className="text-muted-foreground text-sm animate-pulse">يرسم الذكاء الاصطناعي صورتك الآن...</div>
        ) : imageUrl ? (
          <img src={imageUrl} alt="Generated" className="max-w-full max-h-[520px] rounded-xl" />
        ) : (
          <span className="text-muted-foreground text-sm">ستظهر الصورة هنا بعد التوليد...</span>
        )}
      </div>

      {imageUrl && (
        <div className="flex gap-3">
          <a
            href={imageUrl}
            download="ai-image.png"
            className="flex-1 text-center rounded-xl border border-border bg-secondary py-2.5 text-sm hover:border-primary/50 transition"
          >
            ⬇️ تحميل الصورة
          </a>
          <button
            onClick={() => {
              setImageUrl("");
              run();
            }}
            className="flex-1 rounded-xl border border-border bg-secondary py-2.5 text-sm hover:border-primary/50 transition"
          >
            🔄 توليد نسخة أخرى
          </button>
        </div>
      )}
    </div>
  );
}
