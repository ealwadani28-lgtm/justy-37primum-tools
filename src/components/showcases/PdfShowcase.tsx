import { Highlighter, MessageSquare, PenLine, Share2, ChevronsLeft, MousePointer2, Check } from "lucide-react";

export function PdfShowcase() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#e6e8ec] bg-gradient-to-br from-[#f4f6f8] via-[#eef1f5] to-[#e8ecf1] p-8 md:p-14 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.25)]" dir="rtl">
      <div className="pointer-events-none absolute -top-24 -right-20 w-96 h-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-32 -left-16 w-[28rem] h-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(250,204,21,0.10),transparent_60%)]" />

      <div className="pointer-events-none absolute top-6 right-6 w-40 h-52 rounded-xl bg-white/70 border border-white shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)] rotate-[8deg] opacity-70 hidden md:block">
        <div className="p-3 space-y-1.5">
          <div className="h-1.5 w-3/4 bg-slate-200 rounded-full" />
          <div className="h-1.5 w-full bg-slate-200 rounded-full" />
          <div className="h-1.5 w-2/3 bg-slate-200 rounded-full" />
          <div className="h-1.5 w-5/6 bg-slate-200 rounded-full" />
        </div>
      </div>
      <div className="pointer-events-none absolute bottom-10 left-8 w-44 h-56 rounded-xl bg-white/60 border border-white shadow-[0_20px_40px_-20px_rgba(15,23,42,0.15)] -rotate-[10deg] opacity-70 hidden md:block">
        <div className="p-3 space-y-1.5">
          <div className="h-1.5 w-2/3 bg-slate-200 rounded-full" />
          <div className="h-1.5 w-5/6 bg-slate-200 rounded-full" />
          <div className="h-1.5 w-3/4 bg-slate-200 rounded-full" />
        </div>
      </div>

      <div className="relative z-20 mx-auto mb-10 w-fit">
        <div className="flex items-center gap-1 rounded-2xl bg-[#1e1f23] border border-white/5 px-2 py-2 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.5)]">
          <button className="p-2 text-slate-400 hover:text-white transition" aria-label="طي">
            <ChevronsLeft className="w-4 h-4" />
          </button>
          <div className="w-px h-8 bg-white/10 mx-1" />
          <ToolbarBtn icon={<span className="font-bold text-base">T</span>} label="تحرير" />
          <ToolbarBtn icon={<Highlighter className="w-4 h-4 text-amber-400" />} label="تمييز" />
          <ToolbarBtn icon={<MessageSquare className="w-4 h-4 text-sky-400" />} label="تعليق" />
          <ToolbarBtn icon={<PenLine className="w-4 h-4 text-sky-400" />} label="إضافة توقيع" />
          <div className="w-px h-8 bg-white/10 mx-1" />
          <ToolbarBtn icon={<Share2 className="w-4 h-4 text-slate-300" />} label="مشاركة" />
        </div>
      </div>

      <div className="relative z-10 mx-auto h-72 md:h-80 w-full max-w-2xl">
        <DocCard title="عقد إيجار" className="absolute top-8 right-1/2 translate-x-[140%] md:translate-x-[160%] -rotate-[14deg] w-44 md:w-52" accent="amber" />
        <DocCard title="التقرير المالي السنوي" className="absolute top-8 left-1/2 -translate-x-[140%] md:-translate-x-[160%] rotate-[14deg] w-44 md:w-52" accent="sky" chart />
        <DocCard title="عقد إيجار" className="absolute top-0 right-1/2 translate-x-1/2 w-52 md:w-60 z-10" accent="amber" cursor />

        <div className="absolute top-16 md:top-20 left-1/2 md:left-[58%] -translate-x-1/2 z-20 w-64 rounded-2xl bg-white border border-slate-200 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.35)] p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500 tracking-wide">Signature</span>
            <span className="text-sm font-bold text-slate-800">إضافة توقيع</span>
          </div>
          <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50/60 h-20 flex items-center justify-center relative">
            <span className="text-3xl italic text-slate-700" style={{ fontFamily: "'Brush Script MT', cursive" }}>Signature</span>
            <PenLine className="w-4 h-4 text-sky-500 absolute bottom-2 left-2" />
          </div>
          <div className="flex justify-start mt-3">
            <button className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-1.5 rounded-lg flex items-center gap-1.5">
              <Check className="w-3 h-3" />
              تأكيد
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-center mt-8 md:mt-12">
        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight">
          العارض والمحرر الذكي لملفات <span className="text-slate-900">PDF</span>
        </h2>
        <p className="text-base md:text-lg text-slate-600 mt-3 font-medium">
          تجربة مميزة لإدارة مستنداتك بكفاءة
        </p>
      </div>
    </div>
  );
}

function ToolbarBtn({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-2.5 py-1 rounded-lg hover:bg-white/5 transition group">
      <div className="w-5 h-5 flex items-center justify-center text-slate-200">{icon}</div>
      <span className="text-[10px] text-slate-400 group-hover:text-slate-200 font-medium">{label}</span>
    </div>
  );
}

function DocCard({ title, className, accent, cursor, chart }: { title: string; className?: string; accent: "amber" | "sky"; cursor?: boolean; chart?: boolean; }) {
  const accentBar = accent === "amber" ? "bg-amber-300" : "bg-sky-300";
  return (
    <div className={`rounded-2xl bg-white border border-slate-200/80 shadow-[0_25px_50px_-15px_rgba(15,23,42,0.25)] p-4 ${className ?? ""}`}>
      <div className="flex justify-end mb-3">
        <h4 className="text-sm font-bold text-slate-800">{title}</h4>
      </div>
      <div className="space-y-1.5">
        <div className="h-1.5 w-full bg-slate-200 rounded-full" />
        <div className={`h-2 w-3/4 ${accentBar} rounded-full`} />
        <div className="h-1.5 w-5/6 bg-slate-200 rounded-full" />
        <div className="h-1.5 w-2/3 bg-slate-200 rounded-full" />
        <div className={`h-2 w-1/2 ${accent === "amber" ? "bg-sky-300" : "bg-amber-300"} rounded-full`} />
        <div className="h-1.5 w-4/5 bg-slate-200 rounded-full" />
        <div className="h-1.5 w-3/5 bg-slate-200 rounded-full" />
      </div>
      {chart && (
        <div className="mt-3 flex justify-end">
          <div className="w-10 h-10 rounded-full border-[3px] border-amber-300 border-t-sky-400 border-r-sky-400" />
        </div>
      )}
      {cursor && (
        <div className="mt-3 flex justify-start relative">
          <div className="w-8 h-8 rounded-full border-2 border-sky-400 flex items-center justify-center">
            <MousePointer2 className="w-3 h-3 text-sky-500 fill-sky-500" />
          </div>
        </div>
      )}
    </div>
  );
}
