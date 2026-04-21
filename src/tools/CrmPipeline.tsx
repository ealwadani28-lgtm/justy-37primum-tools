import { useState } from "react";
import { arNumber, toArabicDigits } from "@/lib/utils";

type Lead = { id: string; name: string; company: string; value: number; stage: number };

const stages = [
  { name: "محتمل", color: "#00e5ff" },
  { name: "مؤهّل", color: "#c3f5ff" },
  { name: "عرض سعر", color: "#e9b3ff" },
  { name: "تفاوض", color: "#7d01b1" },
  { name: "إغلاق ✓", color: "#52ec6f" },
];

const initial: Lead[] = [
  { id: "1", name: "أحمد المطيري", company: "شركة الراجحي", value: 45000, stage: 3 },
  { id: "2", name: "نوف الزهراني", company: "STC", value: 120000, stage: 2 },
  { id: "3", name: "خالد الدوسري", company: "NEOM", value: 280000, stage: 4 },
  { id: "4", name: "ريم القحطاني", company: "أرامكو", value: 90000, stage: 1 },
  { id: "5", name: "سعد العنزي", company: "موبايلي", value: 60000, stage: 0 },
];

export function CrmPipeline() {
  const [leads, setLeads] = useState<Lead[]>(initial);
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [value, setValue] = useState("");

  const addLead = () => {
    if (!name.trim()) return;
    setLeads((l) => [
      ...l,
      { id: Date.now().toString(), name, company, value: Number(value) || 0, stage: 0 },
    ]);
    setName("");
    setCompany("");
    setValue("");
  };

  const advance = (id: string) =>
    setLeads((l) => l.map((x) => (x.id === id ? { ...x, stage: Math.min(4, x.stage + 1) } : x)));

  const total = leads.reduce((s, l) => s + l.value, 0);
  const won = leads.filter((l) => l.stage === 4).reduce((s, l) => s + l.value, 0);

  return (
    <div className="space-y-6" dir="rtl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">إجمالي الأنبوب</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#00e5ff" }}>{arNumber(total)} ر.س</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">صفقات مغلقة</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#52ec6f" }}>{arNumber(won)} ر.س</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">عدد العملاء</div>
          <div className="text-2xl font-extrabold mt-1">{arNumber(leads.length)}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">معدل الإغلاق</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#e9b3ff" }}>
            {toArabicDigits(leads.length ? Math.round((leads.filter((l) => l.stage === 4).length / leads.length) * 100) : 0)}٪
          </div>
        </div>
      </div>

      {/* Add */}
      <div className="grid md:grid-cols-4 gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم العميل" className="bg-input border border-border rounded-xl p-2.5 text-sm text-right" />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="الشركة" className="bg-input border border-border rounded-xl p-2.5 text-sm text-right" />
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="القيمة (ر.س)" type="number" className="bg-input border border-border rounded-xl p-2.5 text-sm text-right" />
        <button onClick={addLead} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm">+ إضافة عميل</button>
      </div>

      {/* Pipeline */}
      <div className="grid md:grid-cols-5 gap-3">
        {stages.map((s, i) => {
          const stageLeads = leads.filter((l) => l.stage === i);
          return (
            <div key={s.name} className="rounded-2xl border border-border bg-card/60 p-3 min-h-[280px]">
              <div className="flex items-center justify-between mb-3 flex-row-reverse">
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}55` }}>
                  {arNumber(stageLeads.length)}
                </span>
                <div className="text-sm font-bold">{s.name}</div>
              </div>
              <div className="space-y-2">
                {stageLeads.map((l) => (
                  <div key={l.id} className="rounded-xl border border-border bg-secondary/60 p-3">
                    <div className="text-sm font-bold text-right">{l.name}</div>
                    <div className="text-[10px] text-muted-foreground text-right">{l.company}</div>
                    <div className="flex items-center justify-between mt-2 flex-row-reverse">
                      <button
                        onClick={() => advance(l.id)}
                        disabled={l.stage === 4}
                        className="text-[10px] px-2 py-1 rounded bg-primary/10 text-primary border border-primary/30 disabled:opacity-30"
                      >
                        تقدّم ←
                      </button>
                      <span className="text-[11px] font-bold" style={{ color: s.color }}>{arNumber(l.value)} ر.س</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
