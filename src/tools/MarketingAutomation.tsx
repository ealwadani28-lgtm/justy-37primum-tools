import { useState } from "react";
import { ActionBar } from "@/components/ActionBar";

type Step = { id: string; type: "trigger" | "email" | "wait" | "branch"; label: string; detail: string };

const defaultSteps: Step[] = [
  { id: "1", type: "trigger", label: "عميل جديد", detail: "عند التسجيل في الموقع" },
  { id: "2", type: "email", label: "رسالة ترحيب", detail: "أهلاً {name}، عرضك جاهز..." },
  { id: "3", type: "wait", label: "انتظار", detail: "٢٤ ساعة" },
  { id: "4", type: "email", label: "تذكير العرض", detail: "خصم 30% ينتهي خلال 6 ساعات" },
  { id: "5", type: "branch", label: "تحقق", detail: "هل تم الشراء؟" },
];

const typeMeta: Record<Step["type"], { icon: string; color: string; bg: string }> = {
  trigger: { icon: "⚡", color: "text-purple-300", bg: "from-purple-500/20 to-fuchsia-500/10 border-purple-400/30" },
  email: { icon: "📧", color: "text-cyan-300", bg: "from-cyan-500/20 to-blue-500/10 border-cyan-400/30" },
  wait: { icon: "⏱", color: "text-muted-foreground", bg: "from-white/5 to-white/0 border-white/10" },
  branch: { icon: "🔀", color: "text-emerald-300", bg: "from-emerald-500/20 to-teal-500/10 border-emerald-400/30" },
};

export function MarketingAutomation() {
  const [steps, setSteps] = useState<Step[]>(defaultSteps);
  const [name, setName] = useState("رحلة الترحيب");

  const addStep = (type: Step["type"]) => {
    const labels: Record<Step["type"], { label: string; detail: string }> = {
      trigger: { label: "محفّز جديد", detail: "حدث ما" },
      email: { label: "إيميل جديد", detail: "نص الرسالة هنا" },
      wait: { label: "انتظار", detail: "١ ساعة" },
      branch: { label: "تفرّع", detail: "شرط" },
    };
    setSteps((s) => [...s, { id: Date.now().toString(), type, ...labels[type] }]);
  };

  const remove = (id: string) => setSteps((s) => s.filter((x) => x.id !== id));

  const json = JSON.stringify({ name, steps }, null, 2);

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold mb-2 block">اسم الرحلة</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full bg-input border border-border rounded-xl p-3"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {(["trigger", "email", "wait", "branch"] as const).map((t) => (
          <button
            key={t}
            onClick={() => addStep(t)}
            className="text-xs px-3 py-1.5 rounded-full bg-secondary border border-border hover:bg-card transition"
          >
            + {typeMeta[t].icon} {t === "trigger" ? "محفّز" : t === "email" ? "إيميل" : t === "wait" ? "انتظار" : "تفرّع"}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {steps.map((s, i) => {
          const m = typeMeta[s.type];
          return (
            <div key={s.id} className="relative">
              <div className={`relative rounded-2xl border bg-gradient-to-br ${m.bg} backdrop-blur p-4 flex items-start gap-3`}>
                <div className="text-2xl">{m.icon}</div>
                <div className="flex-1">
                  <div className={`text-[10px] uppercase tracking-[0.2em] ${m.color} font-bold mb-1`}>
                    خطوة {i + 1} · {s.type}
                  </div>
                  <input
                    value={s.label}
                    onChange={(e) => setSteps((arr) => arr.map((x) => (x.id === s.id ? { ...x, label: e.target.value } : x)))}
                    className="w-full bg-transparent text-base font-bold text-foreground border-b border-transparent focus:border-border outline-none"
                  />
                  <input
                    value={s.detail}
                    onChange={(e) => setSteps((arr) => arr.map((x) => (x.id === s.id ? { ...x, detail: e.target.value } : x)))}
                    className="w-full bg-transparent text-xs text-muted-foreground mt-1 outline-none"
                  />
                </div>
                <button onClick={() => remove(s.id)} className="text-xs text-muted-foreground hover:text-foreground">✕</button>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-px h-4 bg-border" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div>
        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">JSON للرحلة</label>
        <pre dir="ltr" className="text-xs bg-background border border-border rounded-xl p-3 overflow-auto whitespace-pre-wrap font-mono max-h-64">
          {json}
        </pre>
      </div>

      <ActionBar
        copyText={json}
        copyLabel="نسخ JSON"
        downloadText={{ content: json, filename: "automation.json", mime: "application/json" }}
        downloadLabel="تحميل JSON"
      />
    </div>
  );
}
