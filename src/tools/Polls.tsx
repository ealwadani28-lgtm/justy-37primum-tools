import { useState } from "react";

export function Polls() {
  const [votes, setVotes] = useState<Record<string, number>>({
    "React": 124,
    "Vue": 78,
    "Svelte": 56,
    "Angular": 32,
  });
  const [voted, setVoted] = useState<string | null>(null);
  const total = Object.values(votes).reduce((a, b) => a + b, 0);

  const vote = (key: string) => {
    if (voted) return;
    setVotes((v) => ({ ...v, [key]: v[key] + 1 }));
    setVoted(key);
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">ما هو إطار العمل المفضل لديك؟</h3>
      <div className="space-y-3">
        {Object.entries(votes).map(([key, val]) => {
          const pct = Math.round((val / total) * 100);
          const isMine = voted === key;
          return (
            <button
              key={key}
              onClick={() => vote(key)}
              disabled={!!voted}
              className={`w-full relative overflow-hidden rounded-xl border ${isMine ? "border-primary" : "border-border"} bg-secondary p-4 text-right ${!voted && "hover:border-primary cursor-pointer"} disabled:cursor-default`}
            >
              <div
                className="absolute inset-y-0 right-0 bg-mint-gradient opacity-20 transition-all duration-700"
                style={{ width: voted ? `${pct}%` : "0%" }}
              />
              <div className="relative flex items-center justify-between">
                <span className="font-semibold">{key}</span>
                {voted && <span className="text-sm text-primary font-bold">{pct}% • {val} صوت</span>}
              </div>
            </button>
          );
        })}
      </div>
      {voted && <p className="text-sm text-muted-foreground mt-4 text-center">شكراً لتصويتك! • {total} مصوّت</p>}
    </div>
  );
}
