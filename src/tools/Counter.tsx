import { useEffect, useRef, useState } from "react";

function AnimatedNumber({ value, duration = 2000 }: { value: number; duration?: number }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const start = Date.now();
          const tick = () => {
            const t = Math.min(1, (Date.now() - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setN(Math.round(value * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          tick();
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [value, duration]);
  return <div ref={ref} className="text-5xl md:text-6xl font-black text-mint-gradient tabular-nums">{n.toLocaleString("ar-EG")}</div>;
}

export function Counter() {
  const stats = [
    { value: 12500, label: "عميل سعيد", suffix: "+" },
    { value: 98, label: "نسبة الرضا", suffix: "%" },
    { value: 250, label: "مشروع مكتمل", suffix: "" },
    { value: 36, label: "أداة متاحة", suffix: "" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((s) => (
        <div key={s.label} className="text-center bg-secondary border border-border rounded-2xl p-6">
          <div className="flex items-baseline justify-center gap-1">
            <AnimatedNumber value={s.value} />
            <span className="text-3xl font-bold text-primary">{s.suffix}</span>
          </div>
          <div className="text-sm text-muted-foreground mt-2">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
