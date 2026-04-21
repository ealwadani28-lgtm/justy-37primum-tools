import { useState } from "react";

const monthly = [
  { m: "يناير", v: 42 },
  { m: "فبراير", v: 65 },
  { m: "مارس", v: 78 },
  { m: "أبريل", v: 55 },
  { m: "مايو", v: 92 },
  { m: "يونيو", v: 110 },
];

export function Charts() {
  const [type, setType] = useState<"bar" | "line">("bar");
  const max = Math.max(...monthly.map((d) => d.v));
  const W = 500, H = 220, pad = 24;

  return (
    <div>
      <div className="flex gap-2 mb-6">
        <button onClick={() => setType("bar")} className={`px-4 py-2 rounded-lg text-sm ${type === "bar" ? "bg-mint-gradient text-primary-foreground" : "bg-secondary border border-border"}`}>أعمدة</button>
        <button onClick={() => setType("line")} className={`px-4 py-2 rounded-lg text-sm ${type === "line" ? "bg-mint-gradient text-primary-foreground" : "bg-secondary border border-border"}`}>خط</button>
      </div>
      <div className="bg-secondary border border-border rounded-2xl p-6 overflow-x-auto" dir="ltr">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto min-w-[500px]">
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.15 170)" />
              <stop offset="100%" stopColor="oklch(0.78 0.14 175)" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {type === "bar" ? (
            monthly.map((d, i) => {
              const bw = (W - pad * 2) / monthly.length - 8;
              const bh = (d.v / max) * (H - pad * 2);
              const x = pad + i * ((W - pad * 2) / monthly.length) + 4;
              const y = H - pad - bh;
              return (
                <g key={d.m}>
                  <rect x={x} y={y} width={bw} height={bh} rx="6" fill="url(#grad)" />
                  <text x={x + bw / 2} y={H - 8} textAnchor="middle" fontSize="11" fill="oklch(0.68 0.02 200)">{d.m}</text>
                  <text x={x + bw / 2} y={y - 6} textAnchor="middle" fontSize="11" fill="oklch(0.85 0.15 170)" fontWeight="bold">{d.v}</text>
                </g>
              );
            })
          ) : (
            <>
              <polyline
                fill="none"
                stroke="oklch(0.78 0.14 175)"
                strokeWidth="3"
                points={monthly.map((d, i) => {
                  const x = pad + i * ((W - pad * 2) / (monthly.length - 1));
                  const y = H - pad - (d.v / max) * (H - pad * 2);
                  return `${x},${y}`;
                }).join(" ")}
              />
              {monthly.map((d, i) => {
                const x = pad + i * ((W - pad * 2) / (monthly.length - 1));
                const y = H - pad - (d.v / max) * (H - pad * 2);
                return (
                  <g key={d.m}>
                    <circle cx={x} cy={y} r="5" fill="oklch(0.85 0.15 170)" />
                    <text x={x} y={H - 8} textAnchor="middle" fontSize="11" fill="oklch(0.68 0.02 200)">{d.m}</text>
                  </g>
                );
              })}
            </>
          )}
        </svg>
      </div>
    </div>
  );
}
