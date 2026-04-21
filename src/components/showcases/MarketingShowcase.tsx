export function MarketingShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0b] p-8 md:p-12 min-h-[480px] shadow-[0_30px_120px_-30px_rgba(233,179,255,0.25)]">
      <div
        className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #e9b3ff44, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #00e5ff55, transparent 70%)" }}
        aria-hidden
      />

      <div className="relative grid md:grid-cols-2 gap-10 items-center">
        {/* Left: workflow canvas */}
        <div className="relative h-[440px]">
          {/* Trigger node */}
          <div className="absolute top-2 right-4 rounded-2xl border border-[#e9b3ff]/30 bg-gradient-to-br from-[#7d01b1]/40 to-[#510074]/20 backdrop-blur-xl p-4 w-44 shadow-[0_10px_40px_rgba(233,179,255,0.25)]">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#e9b3ff] font-bold mb-1">⚡ Trigger</div>
            <div className="text-white text-sm font-bold">عميل جديد</div>
            <div className="text-[10px] text-[#bac9cc] mt-1">سجّل في الموقع</div>
          </div>

          {/* Connector line */}
          <svg className="absolute top-[90px] right-24 w-32 h-20" viewBox="0 0 128 80" aria-hidden>
            <path d="M 110 0 Q 60 40 10 80" stroke="url(#g1)" strokeWidth="2" fill="none" strokeDasharray="4 4" className="animate-pulse" />
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e9b3ff" />
                <stop offset="100%" stopColor="#00e5ff" />
              </linearGradient>
            </defs>
          </svg>

          {/* Email node */}
          <div className="absolute top-[140px] right-1/2 translate-x-1/2 rounded-2xl border border-[#00e5ff]/30 bg-gradient-to-br from-[#00626e]/40 to-[#0e0e0f]/60 backdrop-blur-xl p-4 w-52 shadow-[0_10px_40px_rgba(0,229,255,0.25)]">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#c3f5ff] font-bold mb-1">📧 Email Step</div>
            <div className="text-white text-sm font-bold mb-2">رسالة ترحيب</div>
            <div className="rounded-lg bg-black/40 border border-white/5 p-2 text-[10px] text-[#bac9cc] leading-relaxed text-right">
              مرحباً {"{name}"} 👋<br />
              عرضك الخاص جاهز...
            </div>
            <div className="mt-2 flex items-center justify-between text-[9px]">
              <span className="text-[#52ec6f]">معدل الفتح 64%</span>
              <span className="text-[#849396]">الآن</span>
            </div>
          </div>

          {/* Wait node */}
          <div className="absolute top-[310px] right-8 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-3 w-36 shadow-lg">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#849396] font-bold mb-1">⏱ Wait</div>
            <div className="text-white text-xs font-bold">٢٤ ساعة</div>
          </div>

          {/* Branch node */}
          <div className="absolute bottom-2 left-4 rounded-2xl border border-[#52ec6f]/30 bg-gradient-to-br from-[#003910]/40 to-[#0e0e0f]/60 backdrop-blur-xl p-3 w-40 shadow-[0_10px_40px_rgba(82,236,111,0.2)]">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#52ec6f] font-bold mb-1">✓ Converted</div>
            <div className="text-white text-xs font-bold">تم الشراء</div>
            <div className="text-[10px] text-[#bac9cc] mt-1">12 عميل اليوم</div>
          </div>
        </div>

        {/* Right: copy */}
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e9b3ff]/30 bg-[#7d01b1]/20 text-[10px] uppercase tracking-[0.25em] text-[#e9b3ff] font-bold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e9b3ff] animate-pulse" />
            Marketing Automation
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold leading-[1.1] text-white mb-4 tracking-tight">
            أتمتة <br />
            <span style={{ background: "linear-gradient(135deg, #e9b3ff, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              التسويق والبريد
            </span>
          </h3>
          <p className="text-[#bac9cc] leading-loose mb-6">
            اصنع رحلات بريدية ذكية تشتغل وحدها. حدّث حالة العميل، أرسل عروضاً مخصّصة، وحوّل الزائر لعميل دائم — بدون متابعة يدوية.
          </p>

          <div className="space-y-2">
            {[
              { l: "📨 سلاسل بريدية تلقائية", v: "Drip" },
              { l: "🎯 شرائح ديناميكية", v: "Segmentation" },
              { l: "📊 تتبّع الفتح والنقرات", v: "Analytics" },
            ].map((f) => (
              <div key={f.v} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-xl px-4 py-2.5">
                <span className="text-[10px] text-[#849396] font-mono">{f.v}</span>
                <span className="text-sm text-white">{f.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
