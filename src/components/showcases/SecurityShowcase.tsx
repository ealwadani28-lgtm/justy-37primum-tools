import { ShieldCheck, Lock, AlertTriangle } from "lucide-react";

export function SecurityShowcase() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#1a3556] bg-[radial-gradient(ellipse_at_center,#0d2742_0%,#061629_60%,#020812_100%)] p-8 md:p-14" dir="rtl">
      {/* Circuit grid */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: "linear-gradient(rgba(56,189,248,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.15) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />
      <div className="pointer-events-none absolute top-0 inset-x-0 h-64 bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.3),transparent_70%)]" />

      {/* Top nav mock */}
      <div className="relative z-10 flex items-center justify-between mb-12">
        <span className="text-xs text-sky-300/70 border border-sky-300/30 rounded-lg px-3 py-1.5">تسجيل الدخول</span>
        <div className="hidden md:flex items-center gap-6 text-sm text-white/70">
          <span>اتصل بنا</span><span>حول</span><span>الأسعار</span><span>المنتجات</span>
          <span className="text-sky-300 border-b-2 border-sky-300 pb-1">الرئيسية</span>
        </div>
        <div className="flex items-center gap-2 text-white">
          <span className="font-bold text-lg">مدقق الأمان</span>
          <ShieldCheck className="w-6 h-6 text-amber-400" />
        </div>
      </div>

      {/* Main shield */}
      <div className="relative z-10 flex justify-center mb-8">
        <div className="relative">
          <div className="absolute inset-0 bg-sky-400/30 blur-3xl rounded-full scale-150" />
          <div className="relative w-48 h-56 rounded-3xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 border-2 border-sky-400/60 shadow-[0_0_60px_rgba(56,189,248,0.5)] flex flex-col items-center justify-center p-6">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-600 text-amber-950 text-[10px] font-black px-4 py-1 rounded-full">
              🔒 PROTECTED
            </div>
            <Lock className="w-12 h-12 text-amber-400 mb-3" />
            <div className="text-white font-black text-xl text-center leading-tight">مدقق<br/>الأمان</div>
            <div className="mt-3 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-bold">
              ✓ تم التحقق
            </div>
          </div>
        </div>
      </div>

      {/* Issues panel */}
      <div className="relative z-10 mx-auto max-w-2xl rounded-2xl bg-slate-900/70 backdrop-blur-md border border-sky-400/20 p-5 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.6)]">
        <h3 className="text-white font-bold mb-3 text-right">تقرير الثغرات الأمنية</h3>
        <div className="space-y-2">
          {[
            { sev: "حرجة", color: "text-rose-400", icon: "⊘", title: "حقن SQL", status: "تم الحل", time: "12:45" },
            { sev: "عالية", color: "text-amber-400", icon: "🔥", title: "تجاوز المصادقة", status: "قيد المعالجة", time: "12:43" },
            { sev: "متوسطة", color: "text-yellow-300", icon: "🛡", title: "تسريب المعلومات", status: "مفتوح", time: "13:51" },
            { sev: "منخفضة", color: "text-emerald-400", icon: "👤", title: "تكوين خاطئ", status: "تم الحل", time: "12:46" },
          ].map((i, idx) => (
            <div key={idx} className="flex items-center justify-between bg-slate-800/60 border border-white/5 rounded-xl px-3 py-2 text-sm">
              <span className="text-xs text-white/40">🕐 {i.time} مدخل</span>
              <div className="flex items-center gap-2 text-white/90">
                <span className={`font-bold ${i.color}`}>{i.sev}</span>
                <span className="text-white/50">-</span>
                <span>{i.title}</span>
                <span className="text-white/50">-</span>
                <span>{i.status}</span>
                <span className="text-base">{i.icon}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating firewall card */}
      <div className="absolute top-32 left-6 md:left-12 z-10 w-56 rounded-xl bg-slate-900/80 backdrop-blur border border-sky-400/30 p-4 shadow-[0_0_40px_rgba(56,189,248,0.3)] hidden md:block">
        <div className="flex items-center justify-between mb-2">
          <AlertTriangle className="w-4 h-4 text-sky-300" />
          <span className="text-white text-xs font-bold">حالة جدار الحماية</span>
        </div>
        <div className="flex items-end gap-0.5 h-12 mb-2">
          {[40,60,30,80,50,70,90,55,75,60,85,45].map((h, i) => (
            <div key={i} className="flex-1 bg-gradient-to-t from-sky-500 to-cyan-300 rounded-sm" style={{height:`${h}%`}} />
          ))}
        </div>
        <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1 mb-1">✓ نشط ومحمي</div>
        <div className="text-[10px] text-rose-400 flex items-center justify-end gap-1 mb-1">! التهديدات المحظورة: 1,265</div>
        <div className="text-[10px] text-emerald-400 flex items-center justify-end gap-1">✓ وقت التشغيل: 99.99%</div>
      </div>

      <div className="relative z-10 text-center mt-10">
        <h2 className="text-3xl md:text-5xl font-black text-white">مدقق الأمان</h2>
        <p className="text-white/60 mt-2">احمِ موقعك من الثغرات قبل أن يكتشفها المخترقون</p>
      </div>
    </div>
  );
}
