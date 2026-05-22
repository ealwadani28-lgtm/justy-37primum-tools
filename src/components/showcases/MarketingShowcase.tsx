export function MarketingShowcase() {
  return (
    <div
      className="relative overflow-hidden rounded-[2rem] border border-white/40 p-8 md:p-12 min-h-[480px] shadow-[0_30px_120px_-30px_rgba(255,138,60,0.55)]"
      style={{ background: "linear-gradient(135deg, #ffb37a 0%, #ff9a4a 45%, #ff7a2e 100%)" }}
    >
      {/* Ambient highlights */}
      <div
        className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, #ffe6c2aa, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #ff5a1f88, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative grid md:grid-cols-2 gap-10 items-center">
        {/* Left: workflow canvas */}
        <div className="relative h-[440px]">
          {/* Trigger node */}
          <div className="absolute top-2 right-4 rounded-2xl border border-white/50 bg-white/30 backdrop-blur-xl p-4 w-44 shadow-[0_10px_40px_rgba(255,90,30,0.25)]">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#7a2e00] font-bold mb-1">⚡ Trigger</div>
            <div className="text-[#3d1500] text-sm font-bold">عميل جديد</div>
            <div className="text-[10px] text-[#7a2e00]/80 mt-1">سجّل في الموقع</div>
          </div>

          {/* Connector line */}
          <svg className="absolute top-[90px] right-24 w-32 h-20" viewBox="0 0 128 80" aria-hidden>
            <path d="M 110 0 Q 60 40 10 80" stroke="url(#g1)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-pulse" />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fff3e0" />
                <stop offset="100%" stopColor="#ff5a1f" />
              </linearGradient>
            </defs>
          </svg>

          {/* Email node */}
          <div className="absolute top-[140px] right-1/2 translate-x-1/2 rounded-2xl border border-white/50 bg-white/35 backdrop-blur-xl p-4 w-52 shadow-[0_10px_40px_rgba(255,138,60,0.35)]">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#7a2e00] font-bold mb-1">📧 Email Step</div>
            <div className="text-[#3d1500] text-sm font-bold mb-2">رسالة ترحيب</div>
            <div className="rounded-lg bg-white/60 border border-white/60 p-2 text-[10px] text-[#5a2000] leading-relaxed text-right">
              مرحباً {"{name}"} 👋<br />
              عرضك الخاص جاهز...
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px]">
              <span className="text-[#1f6b2e] font-bold">معدل الفتح 64%</span>
              <span className="text-[#7a2e00]/70">الآن</span>
            </div>
          </div>

          {/* Wait node */}
          <div className="absolute top-[310px] right-8 rounded-2xl border border-white/50 bg-white/25 backdrop-blur-xl p-3 w-36 shadow-lg">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#7a2e00] font-bold mb-1">⏱ Wait</div>
            <div className="text-[#3d1500] text-xs font-bold">٢٤ ساعة</div>
          </div>

          {/* Branch node */}
          <div className="absolute bottom-2 left-4 rounded-2xl border border-white/50 bg-white/35 backdrop-blur-xl p-3 w-40 shadow-[0_10px_40px_rgba(255,90,30,0.3)]">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#1f6b2e] font-bold mb-1">✓ Converted</div>
            <div className="text-[#3d1500] text-xs font-bold">تم الشراء</div>
            <div className="text-[10px] text-[#7a2e00]/80 mt-1">12 عميل اليوم</div>
          </div>
        </div>

        {/* Right: copy */}
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/50 bg-white/30 backdrop-blur text-[10px] uppercase tracking-[0.25em] text-[#5a2000] font-bold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff5a1f] animate-pulse" />
            Marketing Automation
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold leading-[1.1] text-white mb-4 tracking-tight drop-shadow-[0_2px_10px_rgba(122,46,0,0.35)]">
            أتمتة <br />
            <span style={{ background: "linear-gradient(135deg, #fff7ec, #ffd9a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              التسويق والبريد
            </span>
          </h3>
          <p className="text-[#3d1500]/90 leading-loose mb-6">
            اصنع رحلات بريدية ذكية تشتغل وحدها. حدّث حالة العميل، أرسل عروضاً مخصّصة، وحوّل الزائر لعميل دائم — بدون متابعة يدوية.
          </p>

          <div className="space-y-2">
            {[
              { l: "📨 سلاسل بريدية تلقائية", v: "Drip" },
              { l: "🎯 شرائح ديناميكية", v: "Segmentation" },
              { l: "📊 تتبّع الفتح والنقرات", v: "Analytics" },
            ].map((f) => (
              <div key={f.v} className="flex items-center justify-between rounded-xl border border-white/50 bg-white/25 backdrop-blur-xl px-4 py-2.5">
                <span className="text-[10px] text-[#7a2e00]/80 font-mono">{f.v}</span>
                <span className="text-sm text-[#3d1500] font-semibold">{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
