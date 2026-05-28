import { Play, Clock, Share2, MoreHorizontal } from "lucide-react";

export function VideoShowcase() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#2a1f4d] bg-[radial-gradient(ellipse_at_top_right,#3d1d6b_0%,#1a0b3a_50%,#0a0420_100%)] p-8 md:p-14" dir="rtl">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.35),transparent_60%)] blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-[30rem] h-[30rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.25),transparent_60%)] blur-3xl" />

      {/* Brand */}
      <div className="relative z-10 flex justify-start mb-6">
        <div className="flex items-center gap-2 text-white/90">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.6)]">
            <Play className="w-3.5 h-3.5 text-white fill-white" />
          </div>
          <span className="font-bold text-lg">تفاعل</span>
        </div>
      </div>

      {/* Premium label */}
      <div className="relative z-10 text-center mb-4">
        <span className="text-xs text-white/60 tracking-wide">الفيديو التفاعلي - إصدار Premium</span>
      </div>

      {/* Video player mockup */}
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_-20px_rgba(168,85,247,0.4)]">
          {/* Fake video frame */}
          <div className="relative aspect-video bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900">
            {/* Office scene placeholder */}
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(100,116,139,0.4)_0%,rgba(30,41,59,0.6)_50%,rgba(15,23,42,0.8)_100%)]" />
            <div className="absolute top-1/3 left-1/4 w-1/2 h-1/3 bg-gradient-to-br from-slate-600/40 to-slate-800/40 rounded-lg blur-sm" />
            <div className="absolute bottom-1/4 right-1/4 w-1/3 h-1/4 bg-slate-700/30 rounded blur-sm" />

            {/* Top bar */}
            <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
              <div className="flex items-center gap-2 text-white/80">
                <Clock className="w-4 h-4" />
                <Share2 className="w-4 h-4" />
              </div>
              <span className="text-white/90 text-sm font-medium">4K product demo footage</span>
            </div>

            {/* Interactive hotspots */}
            <Hotspot label="انقر للشراء" className="top-[30%] right-[25%]" />
            <Hotspot label="استكشف الميزات" className="top-[42%] right-[55%]" />
            <Hotspot label="شاهد العرض" className="top-[50%] right-[15%]" />

            {/* Center play button */}
            <button aria-label="تشغيل الفيديو" className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/15 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-[0_0_40px_rgba(168,85,247,0.6)] hover:scale-110 transition">
              <Play className="w-7 h-7 text-white fill-white ml-1" />
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 inset-x-0 h-1 bg-white/10">
              <div className="h-full w-1/3 bg-gradient-to-r from-pink-500 to-orange-400" />
            </div>
          </div>
        </div>

        {/* Engagement Stats card */}
        <div className="absolute -bottom-6 right-4 md:right-12 w-56 rounded-xl bg-[#1a0b3a]/90 backdrop-blur-md border border-white/10 p-3 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white/50 text-xs">•••</span>
            <span className="text-white text-xs font-semibold">Engagement Stats</span>
          </div>
          {/* Mini chart */}
          <svg viewBox="0 0 200 50" className="w-full h-10">
            <defs>
              <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#a855f7" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,30 Q30,10 60,25 T120,20 T200,15 L200,50 L0,50 Z" fill="url(#chartGrad)" />
            <path d="M0,30 Q30,10 60,25 T120,20 T200,15" fill="none" stroke="#c084fc" strokeWidth="1.5" />
          </svg>
          <div className="flex justify-between mt-2 text-center">
            <Stat value="500K" label="مشاهدة" />
            <Stat value="40%" label="تفاعل" />
            <Stat value="12K" label="نقرة" />
          </div>
        </div>

        {/* Timeline editor card */}
        <div className="absolute -bottom-8 left-2 md:left-12 w-64 rounded-xl bg-[#1a0b3a]/90 backdrop-blur-md border border-white/10 p-2.5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)] hidden sm:block">
          <div className="flex gap-1 mb-2">
            {[0,1,2,3].map(i => (
              <div key={i} className={`flex-1 h-10 rounded bg-gradient-to-br from-slate-600 to-slate-800 ${i===1?"ring-2 ring-purple-400":""}`} />
            ))}
          </div>
          <div className="flex items-center gap-1 mb-1.5">
            <div className="flex-1 h-2 rounded-full bg-amber-500/60" />
            <div className="w-12 h-2 rounded-full bg-emerald-500/60" />
            <MoreHorizontal className="w-3 h-3 text-red-400" />
          </div>
          <div className="flex items-center gap-2">
            <Play className="w-3 h-3 text-white fill-white" />
            <div className="flex-1 h-1 rounded-full bg-white/20 relative">
              <div className="absolute top-1/2 -translate-y-1/2 left-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-md" />
            </div>
            <span className="text-[9px] text-white/60">1.5x</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="relative z-10 text-center mt-20 md:mt-24">
        <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
          مشغل الفيديو التفاعلي
        </h2>
        <p className="text-base md:text-lg text-white/70 mt-3">
          عزّز مشاركة جمهورك مع ميزات تفاعلية متقدمة
        </p>
        <div className="flex items-center justify-center gap-3 mt-6">
          <span className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold px-5 py-2.5 rounded-full text-sm shadow-[0_10px_30px_-5px_rgba(168,85,247,0.5)]">
            ابدأ الفترة التجريبية مجاناً
          </span>
          <span className="border border-white/20 text-white/90 font-semibold px-5 py-2.5 rounded-full text-sm">
            تعرف على المزيد
          </span>
        </div>
      </div>
    </div>
  );
}

function Hotspot({ label, className }: { label: string; className: string }) {
  return (
    <div className={`absolute ${className} pointer-events-none`}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full bg-purple-400/30 animate-ping" />
        <div className="relative w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-purple-300/60 flex items-center justify-center shadow-[0_0_25px_rgba(192,132,252,0.6)]">
          <span className="text-[9px] text-white text-center font-medium leading-tight px-1">{label}</span>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex-1">
      <div className="text-white text-sm font-bold">{value}</div>
      <div className="text-white/50 text-[9px]">{label}</div>
    </div>
  );
}
