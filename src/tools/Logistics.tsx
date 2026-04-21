import { useMemo, useState } from "react";
import { arNumber } from "@/lib/utils";

type Shipment = {
  id: string;
  from: string;
  to: string;
  status: "in_transit" | "delivered" | "delayed" | "preparing";
  driver: string;
  eta: string;
};

const seed: Shipment[] = [
  { id: "SHP-8421", from: "الرياض", to: "جدة", status: "in_transit", driver: "محمد ع.", eta: "٤ ساعات" },
  { id: "SHP-8420", from: "الدمام", to: "الرياض", status: "delivered", driver: "خالد س.", eta: "—" },
  { id: "SHP-8419", from: "مكة", to: "المدينة", status: "delayed", driver: "أحمد ر.", eta: "٢ ساعة (تأخير)" },
  { id: "SHP-8418", from: "أبها", to: "الطائف", status: "in_transit", driver: "سعود ف.", eta: "٦ ساعات" },
  { id: "SHP-8417", from: "تبوك", to: "حائل", status: "preparing", driver: "—", eta: "قيد التحضير" },
  { id: "SHP-8416", from: "الرياض", to: "بريدة", status: "delivered", driver: "ناصر م.", eta: "—" },
];

const statusMeta: Record<Shipment["status"], { label: string; color: string }> = {
  in_transit: { label: "في الطريق", color: "#00e5ff" },
  delivered: { label: "تم التسليم", color: "#52ec6f" },
  delayed: { label: "تأخير", color: "#ffb4ab" },
  preparing: { label: "قيد التحضير", color: "#e9b3ff" },
};

export function Logistics() {
  const [filter, setFilter] = useState<Shipment["status"] | "all">("all");
  const [query, setQuery] = useState("");

  const shipments = useMemo(
    () =>
      seed.filter(
        (s) =>
          (filter === "all" || s.status === filter) &&
          (query === "" || s.id.includes(query) || s.from.includes(query) || s.to.includes(query))
      ),
    [filter, query]
  );

  const kpis = [
    { l: "النشطة", v: seed.filter((s) => s.status === "in_transit").length, c: "#00e5ff" },
    { l: "تم التسليم", v: seed.filter((s) => s.status === "delivered").length, c: "#52ec6f" },
    { l: "متأخّرة", v: seed.filter((s) => s.status === "delayed").length, c: "#ffb4ab" },
    { l: "تحضير", v: seed.filter((s) => s.status === "preparing").length, c: "#e9b3ff" },
  ];

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3" dir="rtl">
        {kpis.map((k) => (
          <div key={k.l} className="relative rounded-2xl border border-border bg-card p-4 overflow-hidden text-right">
            <div className="absolute -top-8 -right-8 w-20 h-20 rounded-full opacity-20 blur-2xl" style={{ background: k.c }} />
            <div className="relative">
              <div className="text-xs text-muted-foreground">{k.l}</div>
              <div className="text-3xl font-extrabold mt-1" style={{ color: k.c }}>{arNumber(k.v)}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 items-center">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ابحث برقم الشحنة أو المدينة..."
          className="flex-1 min-w-[200px] bg-input border border-border rounded-xl p-2.5 text-sm"
        />
        {(["all", "in_transit", "delivered", "delayed", "preparing"] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`text-xs px-3 py-2 rounded-xl border transition ${
              filter === s ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border hover:bg-card"
            }`}
          >
            {s === "all" ? "الكل" : statusMeta[s].label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-border bg-card overflow-hidden" dir="rtl">
        <div className="grid grid-cols-12 gap-2 text-[11px] uppercase tracking-wider text-muted-foreground p-3 border-b border-border bg-secondary/40 text-right">
          <div className="col-span-2">رقم الشحنة</div>
          <div className="col-span-3">من ← إلى</div>
          <div className="col-span-2">السائق</div>
          <div className="col-span-2">الوصول المتوقّع</div>
          <div className="col-span-3">الحالة</div>
        </div>
        {shipments.map((s) => {
          const m = statusMeta[s.status];
          return (
            <div key={s.id} className="grid grid-cols-12 gap-2 items-center p-3 border-b border-border/50 last:border-0 text-sm hover:bg-secondary/30 transition text-right">
              <div className="col-span-2 font-mono text-xs" dir="ltr">{s.id}</div>
              <div className="col-span-3">
                {s.from} <span className="text-muted-foreground">←</span> {s.to}
              </div>
              <div className="col-span-2 text-muted-foreground">{s.driver}</div>
              <div className="col-span-2 text-xs">{s.eta}</div>
              <div className="col-span-3">
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold"
                  style={{ background: `${m.color}22`, color: m.color, border: `1px solid ${m.color}55` }}
                >
                  {m.label}
                </span>
              </div>
            </div>
          );
        })}
        {shipments.length === 0 && (
          <div className="p-8 text-center text-sm text-muted-foreground">لا توجد شحنات تطابق البحث.</div>
        )}
      </div>

      <p className="text-xs text-muted-foreground text-center">
        * بيانات تجريبية للعرض. اربط لوحة التحكم ببياناتك الفعلية عبر API.
      </p>
    </div>
  );
}
