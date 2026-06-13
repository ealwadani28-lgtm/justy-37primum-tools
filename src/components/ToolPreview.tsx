/**
 * ToolPreview — معاينات بصرية مميزة لكل أداة (mockups مصغّرة)
 * مستوحى من ستايل PlumSpace: بطاقات فاتحة على خلفية مينت ناعمة
 * مع معاينة حقيقية تعكس روح الأداة.
 */

type Props = { slug: string };

export function ToolPreview({ slug }: Props) {
  const Comp = previews[slug] ?? GenericPreview;
  return (
    <div className="relative w-full h-full flex items-center justify-center p-4 select-none pointer-events-none">
      <Comp />
    </div>
  );
}

// ============ Helpers ============
const Window = ({
  children,
  className = "",
  title = "",
}: {
  children: React.ReactNode;
  className?: string;
  title?: string;
}) => (
  <div
    className={`bg-white rounded-2xl shadow-[0_20px_50px_-15px_rgba(20,80,70,0.25)] border border-emerald-100/80 overflow-hidden ${className}`}
  >
    {title !== "" && (
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-emerald-50 bg-emerald-50/30">
        <span className="w-2 h-2 rounded-full bg-rose-300" />
        <span className="w-2 h-2 rounded-full bg-amber-300" />
        <span className="w-2 h-2 rounded-full bg-emerald-300" />
        <span className="text-[9px] text-emerald-900/60 mr-auto font-mono" dir="ltr">
          {title}
        </span>
      </div>
    )}
    {children}
  </div>
);

// ============ Previews ============

function WhatsappPreview() {
  return (
    <div className="relative w-full h-full">
      <Window title="site.com" className="absolute top-2 left-6 right-6 rotate-[-4deg]">
        <div className="p-3 space-y-1.5">
          <div className="h-1.5 rounded-full bg-emerald-100 w-3/4" />
          <div className="h-1.5 rounded-full bg-emerald-100/70 w-1/2" />
          <div className="h-1.5 rounded-full bg-emerald-100/70 w-2/3" />
        </div>
      </Window>
      <Window className="absolute top-10 left-3 right-12 rotate-[3deg]">
        <div className="bg-gradient-to-br from-emerald-400 to-teal-500 p-3 text-white">
          <div className="text-[10px] font-bold mb-0.5">مرحباً 👋</div>
          <div className="text-[8px] opacity-90">كيف نقدر نساعدك اليوم؟</div>
        </div>
        <div className="p-2 space-y-1.5">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-emerald-200" />
            <div className="h-1 rounded-full bg-slate-200 flex-1" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-teal-200" />
            <div className="h-1 rounded-full bg-slate-200 flex-1" />
          </div>
        </div>
      </Window>
      <div className="absolute bottom-2 right-4 w-9 h-9 rounded-full bg-emerald-500 shadow-lg flex items-center justify-center text-white text-base">
        💬
      </div>
    </div>
  );
}

function QrPreview() {
  return (
    <div className="flex items-center justify-center gap-3 w-full">
      <Window className="p-3 rotate-[-3deg]">
        <div className="grid grid-cols-7 gap-[2px] w-20 h-20">
          {Array.from({ length: 49 }).map((_, i) => {
            const pattern = [0,1,2,4,6,7,8,10,12,14,15,17,18,21,23,24,26,28,30,31,33,35,37,38,40,42,44,45,47,48].includes(i);
            return (
              <div key={i} className={pattern ? "bg-emerald-700 rounded-[1px]" : "bg-transparent"} />
            );
          })}
        </div>
      </Window>
      <div className="space-y-2">
        <div className="px-2 py-1 rounded-full bg-white text-[8px] font-bold text-emerald-700 shadow">
          justlator.com
        </div>
        <div className="px-2 py-1 rounded-full bg-emerald-500 text-[8px] font-bold text-white shadow">
          تحميل ⬇
        </div>
      </div>
    </div>
  );
}

function CountdownPreview() {
  const cells = [
    { v: "07", l: "يوم" },
    { v: "12", l: "س" },
    { v: "45", l: "د" },
    { v: "23", l: "ث" },
  ];
  return (
    <div className="w-full">
      <div className="text-center text-[9px] font-bold text-emerald-900 mb-2">
        🔥 ينتهي العرض خلال
      </div>
      <div className="grid grid-cols-4 gap-2">
        {cells.map((c) => (
          <Window key={c.l} className="text-center py-2">
            <div className="text-base font-extrabold text-emerald-700 font-mono">{c.v}</div>
            <div className="text-[7px] text-slate-500">{c.l}</div>
          </Window>
        ))}
      </div>
    </div>
  );
}

function CounterPreview() {
  const stats = [
    { n: "12k+", l: "عميل" },
    { n: "98%", l: "رضا" },
    { n: "24/7", l: "دعم" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {stats.map((s) => (
        <Window key={s.l} className="py-3 text-center">
          <div className="text-lg font-extrabold bg-gradient-to-br from-emerald-500 to-teal-600 bg-clip-text text-transparent">
            {s.n}
          </div>
          <div className="text-[8px] text-slate-500 mt-0.5">{s.l}</div>
        </Window>
      ))}
    </div>
  );
}

function FaqPreview() {
  return (
    <Window className="w-full p-2 space-y-1.5">
      {[
        { q: "كيف أبدأ؟", open: true },
        { q: "هل الأدوات مجانية؟", open: false },
        { q: "هل تدعم العربية؟", open: false },
      ].map((it, i) => (
        <div key={i} className="border border-emerald-100 rounded-lg overflow-hidden">
          <div className="flex items-center justify-between px-2 py-1.5 bg-emerald-50/40">
            <span className="text-[9px] font-bold text-emerald-900">{it.q}</span>
            <span className={`text-emerald-600 text-[10px] transition ${it.open ? "rotate-180" : ""}`}>
              ▾
            </span>
          </div>
          {it.open && (
            <div className="px-2 py-1.5 space-y-1">
              <div className="h-1 rounded-full bg-slate-100 w-full" />
              <div className="h-1 rounded-full bg-slate-100 w-3/4" />
            </div>
          )}
        </div>
      ))}
    </Window>
  );
}

function PollsPreview() {
  const opts = [
    { l: "خيار أ", p: 65, color: "bg-emerald-500" },
    { l: "خيار ب", p: 25, color: "bg-teal-400" },
    { l: "خيار ج", p: 10, color: "bg-emerald-300" },
  ];
  return (
    <Window className="w-full p-3 space-y-2">
      <div className="text-[9px] font-bold text-emerald-900 mb-1">ما رأيك؟ 📊</div>
      {opts.map((o) => (
        <div key={o.l}>
          <div className="flex justify-between text-[8px] text-slate-600 mb-0.5">
            <span>{o.l}</span>
            <span className="font-bold">{o.p}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className={`h-full ${o.color} rounded-full`} style={{ width: `${o.p}%` }} />
          </div>
        </div>
      ))}
    </Window>
  );
}

function BeforeAfterPreview() {
  return (
    <Window className="w-full overflow-hidden">
      <div className="relative h-28">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-300 to-slate-500" />
        <div
          className="absolute inset-0 bg-gradient-to-br from-emerald-300 to-teal-500"
          style={{ clipPath: "inset(0 0 0 50%)" }}
        />
        <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-white shadow-lg">
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center text-[8px]">
            ↔
          </div>
        </div>
        <div className="absolute top-1 right-2 text-[8px] text-white font-bold bg-black/30 px-1.5 rounded">قبل</div>
        <div className="absolute top-1 left-2 text-[8px] text-white font-bold bg-black/30 px-1.5 rounded">بعد</div>
      </div>
    </Window>
  );
}

function TranslatorPreview() {
  return (
    <div className="w-full space-y-2">
      <Window className="p-2">
        <div className="text-[7px] uppercase tracking-wider text-emerald-600 font-bold mb-1">EN</div>
        <div className="text-[9px] text-slate-700" dir="ltr">Hello, how are you today?</div>
      </Window>
      <div className="text-center text-emerald-500 text-xs">↓</div>
      <Window className="p-2 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-[7px] uppercase tracking-wider text-emerald-600 font-bold mb-1">AR</div>
        <div className="text-[9px] text-slate-800 font-bold">مرحباً، كيف حالك اليوم؟</div>
      </Window>
    </div>
  );
}

function RecipesPreview() {
  return (
    <Window className="w-full">
      <div className="h-14 bg-gradient-to-br from-amber-200 via-rose-200 to-emerald-200 flex items-center justify-center text-2xl">
        🍝
      </div>
      <div className="p-2">
        <div className="text-[10px] font-bold text-emerald-900">باستا بالكريمة</div>
        <div className="flex gap-1 mt-1">
          <span className="text-[7px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full">⏱ 20د</span>
          <span className="text-[7px] bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full">👥 4</span>
          <span className="text-[7px] bg-rose-100 text-rose-700 px-1.5 py-0.5 rounded-full">⭐ 4.8</span>
        </div>
      </div>
    </Window>
  );
}

function PopupPreview() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-slate-200/50 rounded-xl" />
      <Window className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] p-3 text-center">
        <div className="text-base mb-1">🎁</div>
        <div className="text-[9px] font-bold text-emerald-900">خصم 20%</div>
        <div className="text-[7px] text-slate-500 mb-1.5">على أول طلب</div>
        <div className="text-[8px] bg-emerald-500 text-white rounded-md py-1 font-bold">احصل عليه</div>
      </Window>
    </div>
  );
}

function MenuPreview() {
  const items = [
    { n: "كابتشينو", p: "15", e: "☕" },
    { n: "كرواسون", p: "12", e: "🥐" },
    { n: "كيك", p: "20", e: "🍰" },
  ];
  return (
    <Window className="w-full p-2 space-y-1">
      <div className="text-[9px] font-bold text-emerald-900 border-b border-emerald-100 pb-1 mb-1">القائمة</div>
      {items.map((it) => (
        <div key={it.n} className="flex items-center justify-between text-[9px]">
          <div className="flex items-center gap-1.5">
            <span>{it.e}</span>
            <span className="text-slate-700">{it.n}</span>
          </div>
          <span className="font-bold text-emerald-700">{it.p} ر.س</span>
        </div>
      ))}
    </Window>
  );
}

function TeamPreview() {
  const members = [
    { e: "👩‍💼", c: "from-rose-200 to-pink-300" },
    { e: "👨‍💻", c: "from-emerald-200 to-teal-300" },
    { e: "👩‍🎨", c: "from-amber-200 to-orange-300" },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 w-full">
      {members.map((m, i) => (
        <Window key={i} className="text-center p-2">
          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${m.c} mx-auto flex items-center justify-center text-lg`}>
            {m.e}
          </div>
          <div className="h-1 rounded-full bg-slate-200 w-3/4 mx-auto mt-1.5" />
          <div className="h-0.5 rounded-full bg-slate-100 w-1/2 mx-auto mt-1" />
        </Window>
      ))}
    </div>
  );
}

function ChartsPreview() {
  const bars = [40, 70, 55, 90, 65, 80];
  return (
    <Window className="w-full p-3">
      <div className="text-[8px] font-bold text-emerald-900 mb-2">المبيعات</div>
      <div className="flex items-end gap-1.5 h-16">
        {bars.map((h, i) => (
          <div
            key={i}
            className="flex-1 bg-gradient-to-t from-emerald-500 to-teal-300 rounded-t"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </Window>
  );
}

function ProtectionPreview() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <Window className="w-[85%] p-3">
        <div className="space-y-1.5">
          <div className="h-1.5 rounded-full bg-slate-200 w-full" />
          <div className="h-1.5 rounded-full bg-slate-200 w-5/6" />
          <div className="h-1.5 rounded-full bg-slate-200 w-3/4" />
          <div className="h-1.5 rounded-full bg-slate-200 w-4/5" />
        </div>
      </Window>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-2xl bg-emerald-500/95 shadow-xl flex items-center justify-center text-white text-2xl">
          🛡️
        </div>
      </div>
    </div>
  );
}

function PricingPreview() {
  const plans = [
    { n: "أساسي", p: "0", h: false },
    { n: "احترافي", p: "29", h: true },
    { n: "أعمال", p: "99", h: false },
  ];
  return (
    <div className="grid grid-cols-3 gap-1.5 w-full">
      {plans.map((p) => (
        <div
          key={p.n}
          className={`rounded-xl p-2 text-center ${
            p.h ? "bg-emerald-500 text-white shadow-lg scale-105" : "bg-white border border-emerald-100"
          }`}
        >
          <div className={`text-[8px] font-bold ${p.h ? "text-white/90" : "text-emerald-900"}`}>{p.n}</div>
          <div className={`text-base font-extrabold mt-1 ${p.h ? "text-white" : "text-emerald-700"}`}>
            ${p.p}
          </div>
          <div className={`text-[7px] mt-0.5 ${p.h ? "text-white/80" : "text-slate-400"}`}>/شهرياً</div>
        </div>
      ))}
    </div>
  );
}

function AudioPreview() {
  return (
    <Window className="w-full p-3">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white">
          ▶
        </div>
        <div className="flex-1">
          <div className="text-[9px] font-bold text-emerald-900">حلقة #12</div>
          <div className="h-1 rounded-full bg-slate-100 mt-1.5 overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full" />
          </div>
          <div className="flex justify-between text-[7px] text-slate-400 mt-0.5">
            <span>1:23</span>
            <span>4:05</span>
          </div>
        </div>
      </div>
    </Window>
  );
}

function TimelinePreview() {
  const events = ["2022", "2023", "2024", "2025"];
  return (
    <div className="w-full relative py-2">
      <div className="absolute top-1/2 left-2 right-2 h-0.5 bg-emerald-200" />
      <div className="relative flex justify-between">
        {events.map((y, i) => (
          <div key={y} className="flex flex-col items-center">
            <div
              className={`w-3 h-3 rounded-full border-2 ${
                i <= 2 ? "bg-emerald-500 border-emerald-500" : "bg-white border-emerald-300"
              }`}
            />
            <div className="text-[8px] font-bold text-emerald-700 mt-1">{y}</div>
          </div>
        ))}
      </div>
    </div>
  );
}


function TestimonialsPreview() {
  return (
    <Window className="w-full p-3">
      <div className="text-emerald-300 text-2xl leading-none mb-1">"</div>
      <div className="space-y-1">
        <div className="h-1 rounded-full bg-slate-200 w-full" />
        <div className="h-1 rounded-full bg-slate-200 w-5/6" />
        <div className="h-1 rounded-full bg-slate-200 w-2/3" />
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-300 to-teal-400" />
        <div className="flex-1">
          <div className="h-1 rounded-full bg-slate-300 w-1/2" />
          <div className="h-0.5 rounded-full bg-slate-200 w-1/3 mt-1" />
        </div>
        <div className="text-amber-400 text-[8px]">★★★★★</div>
      </div>
    </Window>
  );
}

function OpenHoursPreview() {
  const days = [
    { d: "السبت", h: "9-22", on: false },
    { d: "الأحد", h: "9-22", on: true },
    { d: "الاثنين", h: "9-22", on: false },
    { d: "الثلاثاء", h: "مغلق", on: false, off: true },
  ];
  return (
    <Window className="w-full p-2">
      <div className="flex items-center justify-between mb-1.5">
        <div className="text-[9px] font-bold text-emerald-900">ساعات العمل</div>
        <div className="text-[7px] bg-emerald-500 text-white px-1.5 py-0.5 rounded-full font-bold">مفتوح</div>
      </div>
      {days.map((d) => (
        <div
          key={d.d}
          className={`flex justify-between text-[8px] py-0.5 px-1.5 rounded ${
            d.on ? "bg-emerald-50 font-bold text-emerald-700" : "text-slate-600"
          }`}
        >
          <span>{d.d}</span>
          <span className={d.off ? "text-rose-400" : ""}>{d.h}</span>
        </div>
      ))}
    </Window>
  );
}

function TrustBadgesPreview() {
  const badges = [
    { e: "🔒", l: "دفع آمن" },
    { e: "🚚", l: "شحن مجاني" },
    { e: "↩️", l: "إرجاع 14 يوم" },
    { e: "✅", l: "ضمان" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 w-full">
      {badges.map((b) => (
        <Window key={b.l} className="p-2 flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-emerald-100 flex items-center justify-center text-xs">
            {b.e}
          </div>
          <div className="text-[8px] font-bold text-emerald-900">{b.l}</div>
        </Window>
      ))}
    </div>
  );
}


function GdprPreview() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 bg-slate-200/40 rounded-xl" />
      <Window className="absolute bottom-2 left-2 right-2 p-2">
        <div className="flex items-start gap-2">
          <div className="text-base">🍪</div>
          <div className="flex-1">
            <div className="text-[8px] font-bold text-emerald-900">نستخدم الكوكيز</div>
            <div className="text-[7px] text-slate-500">لتحسين تجربتك</div>
          </div>
          <div className="flex flex-col gap-1">
            <button className="text-[7px] bg-emerald-500 text-white px-2 py-0.5 rounded font-bold">قبول</button>
            <button className="text-[7px] border border-slate-200 text-slate-600 px-2 py-0.5 rounded">رفض</button>
          </div>
        </div>
      </Window>
    </div>
  );
}

function FormBuilderPreview() {
  return (
    <Window className="w-full p-2.5 space-y-1.5">
      <div className="text-[9px] font-bold text-emerald-900 mb-1">نموذج تواصل</div>
      <div className="h-4 rounded-md border border-emerald-100 bg-emerald-50/30" />
      <div className="h-4 rounded-md border border-emerald-100 bg-emerald-50/30" />
      <div className="h-8 rounded-md border border-emerald-100 bg-emerald-50/30" />
      <div className="h-5 rounded-md bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white text-[8px] font-bold">
        إرسال
      </div>
    </Window>
  );
}

function GenericPreview() {
  return (
    <Window className="w-full p-3">
      <div className="space-y-2">
        <div className="h-2 rounded-full bg-emerald-200 w-1/2" />
        <div className="h-1.5 rounded-full bg-slate-200 w-full" />
        <div className="h-1.5 rounded-full bg-slate-200 w-3/4" />
        <div className="h-6 rounded-lg bg-gradient-to-r from-emerald-400 to-teal-500 mt-2" />
      </div>
    </Window>
  );
}

const previews: Record<string, () => React.JSX.Element> = {
  whatsapp: WhatsappPreview,
  "qr-generator": QrPreview,
  countdown: CountdownPreview,
  counter: CounterPreview,
  faq: FaqPreview,
  polls: PollsPreview,
  "before-after": BeforeAfterPreview,
  translator: TranslatorPreview,
  recipes: RecipesPreview,
  popup: PopupPreview,
  menu: MenuPreview,
  team: TeamPreview,
  charts: ChartsPreview,
  protection: ProtectionPreview,
  pricing: PricingPreview,
  audio: AudioPreview,
  timeline: TimelinePreview,
  
  testimonials: TestimonialsPreview,
  "open-hours": OpenHoursPreview,
  "trust-badges": TrustBadgesPreview,
  
  gdpr: GdprPreview,
  "form-builder": FormBuilderPreview,
};
