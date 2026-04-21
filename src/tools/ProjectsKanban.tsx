import { useState } from "react";
import { arNumber } from "@/lib/utils";

type Card = { id: string; title: string; assignee: string; priority: "low" | "med" | "high" };
type Col = { id: string; title: string; color: string; cards: Card[] };

const initial: Col[] = [
  {
    id: "todo",
    title: "للتنفيذ",
    color: "#00e5ff",
    cards: [
      { id: "1", title: "تصميم صفحة الهبوط", assignee: "س.ع", priority: "high" },
      { id: "2", title: "مراجعة API", assignee: "م.ك", priority: "med" },
    ],
  },
  {
    id: "doing",
    title: "قيد العمل",
    color: "#e9b3ff",
    cards: [
      { id: "3", title: "بناء لوحة التحكم", assignee: "أ.ر", priority: "high" },
      { id: "4", title: "اختبار المدفوعات", assignee: "ن.م", priority: "high" },
    ],
  },
  {
    id: "done",
    title: "مكتمل",
    color: "#52ec6f",
    cards: [{ id: "5", title: "تجهيز قاعدة البيانات", assignee: "خ.س", priority: "med" }],
  },
];

const priLabel = { low: "عادي", med: "مهم", high: "عاجل" };

export function ProjectsKanban() {
  const [cols, setCols] = useState<Col[]>(initial);
  const [dragId, setDragId] = useState<string | null>(null);
  const [newCard, setNewCard] = useState("");

  const move = (cardId: string, toCol: string) => {
    setCols((cs) => {
      let card: Card | undefined;
      const stripped = cs.map((c) => ({
        ...c,
        cards: c.cards.filter((k) => {
          if (k.id === cardId) {
            card = k;
            return false;
          }
          return true;
        }),
      }));
      if (!card) return cs;
      return stripped.map((c) => (c.id === toCol ? { ...c, cards: [...c.cards, card!] } : c));
    });
  };

  const addCard = () => {
    if (!newCard.trim()) return;
    setCols((cs) =>
      cs.map((c, i) =>
        i === 0
          ? { ...c, cards: [...c.cards, { id: Date.now().toString(), title: newCard, assignee: "—", priority: "med" }] }
          : c
      )
    );
    setNewCard("");
  };

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex gap-2">
        <input
          value={newCard}
          onChange={(e) => setNewCard(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCard()}
          placeholder="مهمة جديدة..."
          className="flex-1 bg-input border border-border rounded-xl p-2.5 text-sm text-right"
        />
        <button onClick={addCard} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm">
          + إضافة
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        {cols.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => dragId && move(dragId, col.id)}
            className="rounded-2xl border border-border bg-card/60 p-3 min-h-[300px]"
          >
            <div className="flex items-center justify-between mb-3 flex-row-reverse">
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: `${col.color}22`, color: col.color, border: `1px solid ${col.color}55` }}
              >
                {arNumber(col.cards.length)}
              </span>
              <div className="text-sm font-bold">{col.title}</div>
            </div>
            <div className="space-y-2">
              {col.cards.map((c) => (
                <div
                  key={c.id}
                  draggable
                  onDragStart={() => setDragId(c.id)}
                  onDragEnd={() => setDragId(null)}
                  className="rounded-xl border border-border bg-secondary/60 p-3 cursor-grab active:cursor-grabbing hover:border-primary/50 transition"
                >
                  <div className="text-sm text-foreground font-bold mb-2 text-right">{c.title}</div>
                  <div className="flex items-center justify-between">
                    <div
                      className="w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold"
                      style={{ background: col.color, color: "#0a0a0b" }}
                    >
                      {c.assignee}
                    </div>
                    <span className="text-[10px] text-muted-foreground">{priLabel[c.priority]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-muted-foreground text-center">اسحب البطاقات بين الأعمدة لتحديث الحالة.</p>
    </div>
  );
}
