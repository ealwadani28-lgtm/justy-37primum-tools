import { useState, useRef } from "react";

export function Heatmap() {
  const [points, setPoints] = useState<{ x: number; y: number }[]>([
    { x: 30, y: 25 }, { x: 35, y: 28 }, { x: 50, y: 35 }, { x: 55, y: 40 },
    { x: 60, y: 45 }, { x: 70, y: 30 }, { x: 65, y: 55 }, { x: 40, y: 60 },
  ]);
  const ref = useRef<HTMLDivElement>(null);

  const addPoint = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPoints((p) => [...p, { x, y }]);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        <Stat label="نقرات" value={points.length.toLocaleString("ar")} color="text-orange-400" />
        <Stat label="تمرير" value="78%" color="text-rose-400" />
        <Stat label="زوار" value="4,523" color="text-amber-400" />
      </div>

      <div
        ref={ref}
        onClick={addPoint}
        className="relative aspect-video rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-slate-800 to-slate-900 cursor-crosshair"
      >
        {/* Fake page mockup */}
        <div className="absolute inset-0 p-6 opacity-40 pointer-events-none">
          <div className="h-8 w-1/3 bg-white/20 rounded mb-4" />
          <div className="h-32 w-full bg-white/10 rounded-xl mb-4" />
          <div className="grid grid-cols-4 gap-3">
            {[0,1,2,3].map(i => <div key={i} className="h-20 bg-white/10 rounded-lg" />)}
          </div>
        </div>

        {/* Heatmap blobs */}
        {points.map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: "translate(-50%, -50%)",
              width: "80px",
              height: "80px",
              background: "radial-gradient(circle, rgba(239,68,68,0.7) 0%, rgba(249,115,22,0.4) 30%, rgba(234,179,8,0.2) 60%, transparent 80%)",
              mixBlendMode: "screen",
            }}
          />
        ))}

        <div className="absolute bottom-3 right-3 text-xs text-white/70 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full">
          اضغط أي مكان لإضافة نقطة حرارية
        </div>
      </div>

      <button
        onClick={() => setPoints([])}
        className="text-sm text-muted-foreground hover:text-foreground transition"
      >
        ↺ إعادة تعيين
      </button>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="rounded-xl bg-card border border-border p-3 text-center">
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
