import { useState } from "react";

function analyze(text: string) {
  const positive = ["رائع", "ممتاز", "جميل", "مذهل", "أحب", "سعيد", "جيد", "ممتازة", "good", "great", "love"];
  const negative = ["سيء", "كره", "أسوأ", "فظيع", "حزين", "مشكلة", "bad", "hate", "terrible"];
  const lower = text.toLowerCase();
  const pos = positive.filter((w) => lower.includes(w)).length;
  const neg = negative.filter((w) => lower.includes(w)).length;
  if (pos === 0 && neg === 0) return { label: "محايد", emoji: "😐", color: "text-sky-400", confidence: 60 };
  const score = pos - neg;
  if (score > 0) return { label: "إيجابي جداً", emoji: "😊", color: "text-emerald-400", confidence: Math.min(98, 70 + pos * 8) };
  if (score < 0) return { label: "سلبي", emoji: "😞", color: "text-rose-400", confidence: Math.min(98, 70 + neg * 8) };
  return { label: "متباين", emoji: "🤔", color: "text-amber-400", confidence: 65 };
}

export function SentimentAi() {
  const [text, setText] = useState("المنتج رائع جداً، تجربة ممتازة.");
  const result = text.trim() ? analyze(text) : null;

  return (
    <div className="space-y-6">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="اكتب أو الصق نص تعليق العميل هنا..."
        rows={4}
        className="w-full bg-input border border-border rounded-2xl px-4 py-3 text-sm resize-none"
      />

      {result && (
        <div className="rounded-2xl border border-border bg-card p-8 text-center space-y-4">
          <div className="text-7xl">{result.emoji}</div>
          <div>
            <div className={`text-3xl font-bold ${result.color}`}>{result.label}</div>
            <div className="text-sm text-muted-foreground mt-1">ثقة: {result.confidence}%</div>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-border">
            <Stat label="سعيد" value="65%" color="text-emerald-400" />
            <Stat label="محايد" value="25%" color="text-sky-400" />
            <Stat label="غاضب" value="10%" color="text-rose-400" />
          </div>
          <div className="text-xs text-muted-foreground bg-secondary/50 rounded-xl p-3 mt-4">
            💡 رؤى تحليلية: تحسن ملحوظ في رضا العملاء
          </div>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
