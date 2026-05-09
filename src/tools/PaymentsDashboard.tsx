import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { arNumber, toArabicDigits } from "@/lib/utils";

type Method = { id: string; name: string; brand: string; color: string; share: number; revenue: number };

const initial: Method[] = [
  { id: "visa", name: "فيزا", brand: "VISA", color: "#1a1f71", share: 38, revenue: 142500 },
  { id: "mc", name: "ماستركارد", brand: "Mastercard", color: "#eb001b", share: 24, revenue: 89200 },
  { id: "mada", name: "مدى", brand: "mada", color: "#52ec6f", share: 22, revenue: 81800 },
  { id: "apple", name: "آبل باي", brand: "  Pay", color: "#f5f5f7", share: 11, revenue: 41200 },
  { id: "stc", name: "STC Pay", brand: "STC Pay", color: "#7d01b1", share: 5, revenue: 18600 },
];

export function PaymentsDashboard() {
  const [methods, setMethods] = useState<Method[]>(initial);
  const [active, setActive] = useState<string>("visa");

  const toggle = (id: string) =>
    setMethods((m) => m.map((x) => (x.id === id ? { ...x, share: x.share === 0 ? 10 : 0 } : x)));

  const enabled = methods.filter((m) => m.share > 0);
  const total = enabled.reduce((s, m) => s + m.revenue, 0);
  const txCount = Math.round(total / 145);
  const avg = enabled.length ? Math.round(total / enabled.length) : 0;
  const activeCard = methods.find((m) => m.id === active) ?? methods[0];

  const pieData = enabled.map((m) => ({ name: m.name, قيمة: m.revenue }));
  const barData = methods.map((m) => ({ name: m.name, إيرادات: m.revenue }));

  return (
    <div className="space-y-5" dir="rtl">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">إجمالي الإيرادات</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#00e5ff" }}>{arNumber(total)} ر.س</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">عدد المعاملات</div>
          <div className="text-2xl font-extrabold mt-1">{arNumber(txCount)}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">متوسط المعاملة</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#52ec6f" }}>{arNumber(145)} ر.س</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">طرق دفع نشطة</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#e9b3ff" }}>{toArabicDigits(enabled.length)}</div>
        </div>
      </div>

      {/* Active card preview */}
      <div className="grid md:grid-cols-3 gap-3">
        <div className="md:col-span-1 flex items-center justify-center p-4">
          <div
            className="w-full max-w-[280px] aspect-[1.6/1] rounded-2xl p-5 relative overflow-hidden shadow-2xl"
            style={{
              background: `linear-gradient(135deg, ${activeCard.color} 0%, ${activeCard.color}88 100%)`,
              boxShadow: `0 20px 40px -10px ${activeCard.color}66`,
            }}
            dir="ltr"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/10 blur-2xl" />
            <div className="flex justify-between items-start relative">
              <div className="text-white/90 text-xs font-bold tracking-widest">BLOOMSPACE</div>
              <div className="text-white font-extrabold text-sm">{activeCard.brand}</div>
            </div>
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <div className="text-[10px] opacity-70 mb-1">CARD HOLDER</div>
              <div className="font-mono text-sm tracking-wider">•••• •••• •••• 4{toArabicDigits(2 + methods.indexOf(activeCard))}{toArabicDigits(8)}{toArabicDigits(1)}</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-2">
          {methods.map((m) => {
            const isActive = active === m.id;
            const isOn = m.share > 0;
            return (
              <button
                key={m.id}
                onClick={() => setActive(m.id)}
                onDoubleClick={() => toggle(m.id)}
                className="rounded-xl border p-3 text-right transition-all"
                style={{
                  borderColor: isActive ? m.color : "hsl(var(--border))",
                  background: isActive ? `${m.color}11` : "hsl(var(--card))",
                  opacity: isOn ? 1 : 0.4,
                }}
              >
                <div className="flex items-center justify-between flex-row-reverse">
                  <span className="text-sm font-bold">{m.name}</span>
                  <span
                    className="text-[10px] cursor-pointer px-2 py-0.5 rounded-full"
                    onClick={(e) => { e.stopPropagation(); toggle(m.id); }}
                    style={{
                      background: isOn ? `${m.color}22` : "hsl(var(--muted))",
                      color: isOn ? m.color : "hsl(var(--muted-foreground))",
                    }}
                  >
                    {isOn ? "مفعّل" : "موقوف"}
                  </span>
                </div>
                <div className="text-[10px] text-muted-foreground text-right mt-1">{toArabicDigits(m.share)}٪ حصة</div>
                <div className="text-sm font-extrabold mt-2 text-right" style={{ color: m.color === "#f5f5f7" ? undefined : m.color }}>
                  {arNumber(m.revenue)} ر.س
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-sm font-bold mb-3 text-right">توزيع الإيرادات</div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={pieData} dataKey="قيمة" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {pieData.map((_, i) => <Cell key={i} fill={enabled[i].color === "#f5f5f7" ? "#94a3b8" : enabled[i].color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-sm font-bold mb-3 text-right">إيرادات حسب الطريقة</div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={barData} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Bar dataKey="إيرادات" radius={[8, 8, 0, 0]}>
                  {barData.map((_, i) => <Cell key={i} fill={methods[i].color === "#f5f5f7" ? "#94a3b8" : methods[i].color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <p className="text-[11px] text-muted-foreground text-center">
        انقر بطاقة للمعاينة · انقر مزدوج (أو شارة الحالة) لتفعيل/إيقاف الطريقة · المتوسط: {arNumber(avg)} ر.س
      </p>
    </div>
  );
}
