import { useState } from "react";

export function Protection() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-secondary border border-border rounded-2xl p-5">
        <div>
          <h3 className="font-bold">تفعيل حماية المحتوى</h3>
          <p className="text-sm text-muted-foreground">امنع النسخ والنقر بزر اليمين والسحب.</p>
        </div>
        <button onClick={() => setEnabled(!enabled)} className={`relative w-14 h-8 rounded-full transition ${enabled ? "bg-primary" : "bg-muted"}`}>
          <span className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${enabled ? "right-1" : "right-7"}`} />
        </button>
      </div>
      <div
        className="bg-secondary border-2 border-dashed border-border rounded-2xl p-8"
        onCopy={(e) => enabled && e.preventDefault()}
        onContextMenu={(e) => enabled && e.preventDefault()}
        onDragStart={(e) => enabled && e.preventDefault()}
        style={enabled ? { userSelect: "none" } : undefined}
      >
        <h3 className="font-bold mb-2">منطقة محمية للتجربة</h3>
        <p className="text-muted-foreground leading-relaxed">
          حاول نسخ هذا النص أو النقر بزر الفأرة الأيمن. عند تفعيل الحماية، ستجد أن العمليات معطّلة.
          هذا النص جزء من المحتوى المحمي للموقع.
        </p>
        <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=400" className="mt-4 rounded-xl pointer-events-none" alt="محمية" />
      </div>
      <p className="text-xs text-muted-foreground text-center">⚠️ الحماية على مستوى المتصفح فقط — ليست بديلاً عن حماية الخادم.</p>
    </div>
  );
}
