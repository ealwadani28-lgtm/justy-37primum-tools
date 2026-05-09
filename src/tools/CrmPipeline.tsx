import { useEffect, useState } from "react";
import { arNumber, toArabicDigits } from "@/lib/utils";

type Lead = { id: string; name: string; company: string; value: number; stage: number };

const STORAGE_KEY = "crm-pipeline-leads";

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
  const [leads, setLeads] = useState<Lead[]>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Lead[]) : initial;
    } catch {
      return initial;
    }
  });
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [value, setValue] = useState("");
  const [dragId, setDragId] = useState<string | null>(null);
  const [overStage, setOverStage] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch {}
  }, [leads]);

  const addLead = () => {
    if (!name.trim()) return;
    setLeads((l) => [
      ...l,
      { id: Date.now().toString(), name: name.trim(), company: company.trim(), value: Number(value) || 0, stage: 0 },
    ]);
    setName("");
    setCompany("");
    setValue("");
  };

  const moveTo = (id: string, stage: number) =>
    setLeads((l) => l.map((x) => (x.id === id ? { ...x, stage } : x)));

  const advance = (id: string) =>
    setLeads((l) => l.map((x) => (x.id === id ? { ...x, stage: Math.min(4, x.stage + 1) } : x)));

  const removeLead = (id: string) => setLeads((l) => l.filter((x) => x.id !== id));

  const reset = () => {
    if (confirm("استعادة البيانات الافتراضية؟")) setLeads(initial);
  };

  const total = leads.reduce((s, l) => s + l.value, 0);
  const won = leads.filter((l) => l.stage === 4).reduce((s, l) => s + l.value, 0);
  const winRate = leads.length ? Math.round((leads.filter((l) => l.stage === 4).length / leads.length) * 100) : 0;
  const avg = leads.length ? Math.round(total / leads.length) : 0;

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
          <div className="text-xs text-muted-foreground">متوسط الصفقة</div>
          <div className="text-2xl font-extrabold mt-1">{arNumber(avg)} ر.س</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">معدل الإغلاق</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#e9b3ff" }}>
            {toArabicDigits(winRate)}٪
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-5 gap-2">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="اسم العميل" className="bg-input border border-border rounded-xl p-2.5 text-sm text-right" />
        <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="الشركة" className="bg-input border border-border rounded-xl p-2.5 text-sm text-right" />
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="القيمة (ر.س)" type="number" className="bg-input border border-border rounded-xl p-2.5 text-sm text-right" />
        <button onClick={addLead} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-sm md:col-span-1">+ إضافة عميل</button>
        <button onClick={reset} className="px-3 py-2 rounded-xl border border-border text-xs text-muted-foreground hover:text-foreground">إعادة تعيين</button>
      </div>

      <div className="text-xs text-muted-foreground text-right">
        اسحب البطاقات بين المراحل — تُحفظ تلقائياً
      </div>

      <div className="grid md:grid-cols-5 gap-3">
        {stages.map((s, i) => {
          const stageLeads = leads.filter((l) => l.stage === i);
          const stageVal = stageLeads.reduce((a, b) => a + b.value, 0);
          return (
            <div
              key={s.name}
              onDragOver={(e) => { e.preventDefault(); setOverStage(i); }}
              onDragLeave={() => setOverStage((v) => (v === i ? null : v))}
              onDrop={() => { if (dragId) moveTo(dragId, i); setOverStage(null); }}
              className="rounded-2xl border bg-card/60 p-3 min-h-[280px] transition-all"
              style={{
                borderColor: overStage === i ? s.color : undefined,
                boxShadow: overStage === i ? `0 0 0 2px ${s.color}55` : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-1 flex-row-reverse">
                <span className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: `${s.color}22`, color: s.color, border: `1px solid ${s.color}55` }}>
                  {arNumber(stageLeads.length)}
                </span>
                <div className="text-sm font-bold">{s.name}</div>
              </div>
              <div className="text-[10px] text-muted-foreground text-right mb-3">{arNumber(stageVal)} ر.س</div>
              <div className="space-y-2">
                {stageLeads.map((l) => (
                  <div
                    key={l.id}
                    draggable
                    onDragStart={() => setDragId(l.id)}
                    onDragEnd={() => { setDragId(null); setOverStage(null); }}
                    className="rounded-xl border border-border bg-secondary/60 p-3 cursor-grab active:cursor-grabbing hover:border-primary/50 transition group"
                  >
                    <div className="flex items-start justify-between gap-2 flex-row-reverse">
                      <div className="text-sm font-bold text-right flex-1">{l.name}</div>
                      <button onClick={() => removeLead(l.id)} className="opacity-0 group-hover:opacity-100 text-xs text-muted-foreground hover:text-destructive">✕</button>
                    </div>
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
                {stageLeads.length === 0 && (
                  <div className="text-[10px] text-muted-foreground/60 text-center py-4 border border-dashed border-border rounded-xl">
                    أفلت هنا
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
