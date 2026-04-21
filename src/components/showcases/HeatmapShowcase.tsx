import { MousePointer2 } from "lucide-react";

export function HeatmapShowcase() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-orange-900/30 bg-[radial-gradient(ellipse_at_center,#1a1208_0%,#0a0604_60%,#000_100%)] p-8 md:p-14" dir="rtl">
      <div className="pointer-events-none absolute top-0 inset-x-0 h-64 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.25),transparent_70%)]" />

      {/* Title */}
      <div className="relative z-10 text-center mb-10">
        <h2 className="text-4xl md:text-6xl font-black text-white" style={{ textShadow: "0 0 40px rgba(249,115,22,0.6)" }}>
          تحليلات حرارية فورية
        </h2>
        <p className="text-white/60 mt-3">راقب تفاعل الزوار مباشرة واكتشف أنماط السلوك</p>
      </div>

      {/* Browser mockup with heatmap */}
      <div className="relative z-10 mx-auto max-w-3xl">
        <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10 shadow-[0_30px_80px_-20px_rgba(249,115,22,0.4)]">
          {/* Mock site */}
          <div className="aspect-video bg-gradient-to-br from-slate-800 to-slate-900 p-4 md:p-6 relative">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <div className="w-6 h-6 rounded bg-white/10" />
                <div className="w-6 h-6 rounded-full bg-white/10" />
              </div>
              <div className="flex gap-3 text-[10px] text-white/40">
                <span>اتصل</span><span>المنتجات</span><span>المتجر</span>
              </div>
              <span className="text-white font-bold text-sm">تسوّق الأصفياء</span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="h-32 bg-slate-700/50 rounded-xl flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-orange-400 opacity-50" />
              </div>
              <div className="space-y-2">
                <div className="text-white text-sm font-bold">عروض الصيف الحصرية</div>
                <div className="h-1 w-3/4 bg-white/20 rounded-full" />
                <div className="h-1 w-2/3 bg-white/20 rounded-full" />
                <button className="bg-indigo-600 text-white text-xs px-4 py-1.5 rounded-lg mt-2">تسوق الآن</button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {["🧴","👕","👗","⌚"].map((e, i) => (
                <div key={i} className="aspect-square bg-slate-700/40 rounded-lg flex items-center justify-center text-xl">{e}</div>
              ))}
            </div>

            {/* Heatmap blobs overlay */}
            {[
              { top: "20%", right: "20%", size: 120, intensity: 0.9 },
              { top: "25%", right: "35%", size: 100, intensity: 0.85 },
              { top: "35%", right: "25%", size: 90, intensity: 0.7 },
              { top: "50%", right: "30%", size: 80, intensity: 0.6 },
              { top: "30%", right: "55%", size: 70, intensity: 0.5 },
              { top: "70%", right: "45%", size: 60, intensity: 0.4 },
              { top: "60%", right: "15%", size: 50, intensity: 0.4 },
            ].map((b, i) => (
              <div key={i} className="absolute pointer-events-none" style={{
                top: b.top, right: b.right,
                width: `${b.size}px`, height: `${b.size}px`,
                transform: "translate(50%, -50%)",
                background: `radial-gradient(circle, rgba(239,68,68,${b.intensity}) 0%, rgba(249,115,22,${b.intensity*0.6}) 30%, rgba(234,179,8,${b.intensity*0.3}) 60%, transparent 80%)`,
                mixBlendMode: "screen",
              }} />
            ))}
          </div>
        </div>

        {/* Floating clicks card */}
        <div className="absolute -bottom-6 right-2 md:right-12 z-10 rounded-2xl bg-slate-900/80 backdrop-blur border border-orange-500/30 px-4 py-3 shadow-[0_0_30px_rgba(249,115,22,0.4)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center">
              <MousePointer2 className="w-5 h-5 text-white fill-white" />
            </div>
            <div className="text-right">
              <div className="text-white text-lg font-black">٤,٥٢٣</div>
              <div className="text-white/60 text-[10px]">نقرات</div>
            </div>
          </div>
        </div>

        {/* Floating scroll card */}
        <div className="absolute top-4 left-2 md:left-8 z-10 w-48 rounded-2xl bg-slate-900/80 backdrop-blur border border-orange-500/30 p-3 shadow-[0_0_30px_rgba(249,115,22,0.4)]">
          <div className="flex items-center justify-between mb-2">
            <div className="h-2 flex-1 rounded-full bg-gradient-to-l from-rose-500 via-orange-400 to-yellow-300 mx-2" />
            <span className="text-white text-xs font-bold">تمرير</span>
          </div>
          <div className="text-orange-400 text-2xl font-black text-left">78%</div>
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 flex justify-center mt-16">
        <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold px-10 py-3.5 rounded-full text-base shadow-[0_10px_40px_rgba(249,115,22,0.5)]">
          استكشف الآن
        </button>
      </div>
    </div>
  );
}
