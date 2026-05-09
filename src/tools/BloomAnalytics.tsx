import { useMemo, useState } from "react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend,
} from "recharts";
import { arNumber, toArabicDigits } from "@/lib/utils";

const months = ["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس","سبتمبر","أكتوبر","نوفمبر","ديسمبر"];
const sources = ["Google", "Direct", "Social", "Referral"] as const;
type Source = typeof sources[number];

// deterministic pseudo-data
const seed = (m: number, s: number) => Math.abs(Math.sin((m + 1) * (s + 2) * 7.91)) ;
const visitors = (m: number, s: Source) => Math.round(800 + seed(m, sources.indexOf(s)) * 4200);
const conversions = (m: number, s: Source) => Math.round(visitors(m, s) * (0.02 + seed(m, sources.indexOf(s)) * 0.06));

export function BloomAnalytics() {
  const [source, setSource] = useState<Source | "all">("all");
  const [from, setFrom] = useState(0);
  const [to, setTo] = useState(11);

  const range = useMemo(() => months.slice(from, to + 1).map((_, idx) => from + idx), [from, to]);

  const trend = useMemo(
    () =>
      range.map((m) => {
        const srcs: Source[] = source === "all" ? [...sources] : [source];
        const v = srcs.reduce((a, s) => a + visitors(m, s), 0);
        const c = srcs.reduce((a, s) => a + conversions(m, s), 0);
        return { name: months[m], زوار: v, تحويلات: c };
      }),
    [range, source]
  );

  const bySource = useMemo(
    () =>
      sources.map((s) => ({
        name: s,
        قيمة: range.reduce((a, m) => a + visitors(m, s), 0),
      })),
    [range]
  );

  const totals = useMemo(() => {
    const v = trend.reduce((a, b) => a + b.زوار, 0);
    const c = trend.reduce((a, b) => a + b.تحويلات, 0);
    return { v, c, rate: v ? ((c / v) * 100).toFixed(1) : "0" };
  }, [trend]);

  const colors = ["#00e5ff", "#e9b3ff", "#52ec6f", "#7d01b1"];

  return (
    <div className="space-y-5" dir="rtl">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <select
          value={source}
          onChange={(e) => setSource(e.target.value as Source | "all")}
          className="bg-input border border-border rounded-xl p-2.5 text-sm"
        >
          <option value="all">كل المصادر</option>
          {sources.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={from} onChange={(e) => setFrom(Math.min(+e.target.value, to))} className="bg-input border border-border rounded-xl p-2.5 text-sm">
          {months.map((m, i) => <option key={i} value={i}>من: {m}</option>)}
        </select>
        <select value={to} onChange={(e) => setTo(Math.max(+e.target.value, from))} className="bg-input border border-border rounded-xl p-2.5 text-sm">
          {months.map((m, i) => <option key={i} value={i}>إلى: {m}</option>)}
        </select>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">إجمالي الزوار</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#00e5ff" }}>{arNumber(totals.v)}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-right">
          <div className="text-xs text-muted-foreground">التحويلات</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#52ec6f" }}>{arNumber(totals.c)}</div>
        </div>
        <div className="rounded-2xl border border-border bg-card p-4 text-right col-span-2 md:col-span-1">
          <div className="text-xs text-muted-foreground">معدل التحويل</div>
          <div className="text-2xl font-extrabold mt-1" style={{ color: "#e9b3ff" }}>{toArabicDigits(totals.rate)}٪</div>
        </div>
      </div>

      {/* Area chart */}
      <div className="rounded-2xl border border-border bg-card p-4">
        <div className="text-sm font-bold mb-3 text-right">الزوار والتحويلات</div>
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <AreaChart data={trend} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00e5ff" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#00e5ff" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#52ec6f" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#52ec6f" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
              <Legend />
              <Area type="monotone" dataKey="زوار" stroke="#00e5ff" fill="url(#gv)" strokeWidth={2} />
              <Area type="monotone" dataKey="تحويلات" stroke="#52ec6f" fill="url(#gc)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar + Pie */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-sm font-bold mb-3 text-right">الزوار حسب المصدر</div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <BarChart data={bySource} margin={{ left: -10, right: 10, top: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={11} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Bar dataKey="قيمة" radius={[8, 8, 0, 0]}>
                  {bySource.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-4">
          <div className="text-sm font-bold mb-3 text-right">التوزيع</div>
          <div style={{ width: "100%", height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={bySource} dataKey="قيمة" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                  {bySource.map((_, i) => <Cell key={i} fill={colors[i % colors.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 12 }} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
