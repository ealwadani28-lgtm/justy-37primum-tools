import { useEffect, useState } from "react";
import { arNumber } from "@/lib/utils";

type Card = { id: string; title: string; assignee: string; priority: "low" | "med" | "high" };
type Col = { id: string; title: string; color: string; cards: Card[] };

const STORAGE_KEY = "projects-kanban-state";

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
    id: "review",
    title: "مراجعة",
    color: "#7d01b1",
    cards: [],
  },
  {
    id: "done",
    title: "مكتمل",
    color: "#52ec6f",
    cards: [{ id: "5", title: "تجهيز قاعدة البيانات", assignee: "خ.س", priority: "med" }],
  },
];

const priLabel = { low: "عادي", med: "مهم", high: "عاجل" };
const priColor = { low: "#94a3b8", med: "#fbbf24", high: "#ef4444" };

export function ProjectsKanban() {
  const [cols, setCols] = useState<Col[]>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Col[]) : initial;
    } catch {
      return initial;
    }
  });
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOverCol, setDragOverCol] = useState<string | null>(null);
  const [newCard, setNewCard] = useState("");
  const [newPri, setNewPri] = useState<"low" | "med" | "high">("med");

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cols));
    } catch {}
  }, [cols]);

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
          ? {
              ...c,
              cards: [
                ...c.cards,
                { id: Date.now().toString(), title: newCard.trim(), assignee: "—", priority: newPri },
              ],
            }
          : c
      )
    );
    setNewCard("");
  };

  const removeCard = (id: string) =>
    setCols((cs) => cs.map((c) => ({ ...c, cards: c.cards.filter((k) => k.id !== id) })));

  const reset = () => {
    if (confirm("استعادة البيانات الافتراضية؟")) setCols(initial);
  };

  const total = cols.reduce((s, c) => s + c.cards.length, 0);

  return (
    <div className="space-y-4" dir="rtl">
      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={newCard}
          onChange={(e) => setNewCard(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addCard()}
          placeholder="مهمة جديدة..."
          className="flex-1 min-w-[200px] bg-input border border-border rounded-xl p-2.5 text-sm text-right"
        />
        <select
          value={newPri}
          onChange={(e) => setNewPri(e.target.value as "low" | "med" | "high")}
          className="bg-input border border-border rounded-xl p-2.5 text-sm"
        >
          <option value="low">عادي</option>
          <option value="med">مهم</option>
          <option value="high">عاجل</option>
        </select>
        <button onClick={addCard} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm">
          + إضافة
        </button>
        <button onClick={reset} className="px-3 py-2 rounded-xl border border-border text-xs text-muted-foreground hover:text-foreground">
          إعادة تعيين
        </button>
      </div>

      <div className="text-xs text-muted-foreground text-right">
        إجمالي المهام: <span className="font-bold text-foreground">{arNumber(total)}</span> — تُحفظ تلقائياً في متصفحك
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {cols.map((col) => (
          <div
            key={col.id}
            onDragOver={(e) => {
              e.preventDefault();
              setDragOverCol(col.id);
            }}
            onDragLeave={() => setDragOverCol((c) => (c === col.id ? null : c))}
            onDrop={() => {
              if (dragId) move(dragId, col.id);
              setDragOverCol(null);
            }}
            className="rounded-2xl border bg-card/60 p-3 min-h-[300px] transition-all"
            style={{
              borderColor: dragOverCol === col.id ? col.color : undefined,
              boxShadow: dragOverCol === col.id ? `0 0 0 2px ${col.color}55` : undefined,
            }}
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
                  onDragEnd={() => {
                    setDragId(null);
                    setDragOverCol(null);
                  }}
                  className="rounded-xl border border-border bg-secondary/60 p-3 cursor-grab active:cursor-grabbing hover:border-primary/50 transition group"
                >
                  <div className="flex items-start justify-between gap-2 flex-row-reverse">
                    <div className="text-sm text-foreground font-bold text-right flex-1">{c.title}</div>
                    <button
                      onClick={() => removeCard(c.id)}
                      className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground hover:text-destructive transition"
                      aria-label="حذف"
                    >
                      ✕
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-2 flex-row-reverse">
                    <div
                      className="w-6 h-6 rounded-full text-[10px] flex items-center justify-center font-bold"
                      style={{ background: col.color, color: "#0a0a0b" }}
                    >
                      {c.assignee}
                    </div>
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full"
                      style={{ background: `${priColor[c.priority]}22`, color: priColor[c.priority] }}
                    >
                      {priLabel[c.priority]}
                    </span>
                  </div>
                </div>
              ))}
              {col.cards.length === 0 && (
                <div className="text-[11px] text-muted-foreground/60 text-center py-6 border border-dashed border-border rounded-xl">
                  أفلت هنا
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
