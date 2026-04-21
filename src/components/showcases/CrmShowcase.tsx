export function CrmShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0b] p-8 md:p-12 min-h-[520px] shadow-[0_30px_120px_-30px_rgba(0,229,255,0.25)]">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #00e5ff44, transparent 70%)" }} aria-hidden />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #e9b3ff55, transparent 70%)" }} aria-hidden />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00e5ff]/30 bg-[#00626e]/20 text-[10px] uppercase tracking-[0.25em] text-[#c3f5ff] font-bold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
              CRM · Sales Pipeline
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              نظام إدارة <span style={{ background: "linear-gradient(135deg, #00e5ff, #e9b3ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>العملاء</span>
            </h3>
            <p className="text-[#bac9cc] mt-2 max-w-xl">واجهة عربية كاملة لتتبّع الصفقات، المتابعات، وتاريخ كل عميل. مبني للسوق السعودي والخليجي.</p>
          </div>
        </div>

        {/* Pipeline + leads */}
        <div className="grid md:grid-cols-3 gap-3">
          {/* Pipeline funnel */}
          <div className="md:col-span-2 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-5">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#849396] font-bold mb-4 text-right">قمع المبيعات</div>
            <div className="space-y-2">
              {[
                { stage: "عملاء محتملون", count: 240, value: "SAR 1.2M", color: "#00e5ff", w: "100%" },
                { stage: "مؤهّلون", count: 142, value: "SAR 850K", color: "#c3f5ff", w: "75%" },
                { stage: "عرض سعر مرسل", count: 68, value: "SAR 480K", color: "#e9b3ff", w: "55%" },
                { stage: "تفاوض", count: 32, value: "SAR 290K", color: "#7d01b1", w: "35%" },
                { stage: "تم الإغلاق ✓", count: 18, value: "SAR 165K", color: "#52ec6f", w: "20%" },
              ].map((s) => (
                <div key={s.stage} className="relative rounded-xl border border-white/5 overflow-hidden" style={{ background: `linear-gradient(90deg, ${s.color}22 0%, transparent ${s.w})` }}>
                  <div className="flex items-center justify-between p-3">
                    <div className="flex items-center gap-3">
                      <div className="text-xs font-bold" style={{ color: s.color }}>{s.value}</div>
                      <div className="text-[10px] text-[#849396]">({s.count})</div>
                    </div>
                    <div className="text-sm text-white font-bold">{s.stage}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's tasks */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#849396] font-bold mb-3 text-right">مهام اليوم</div>
            <div className="space-y-2.5">
              {[
                { t: "اتصال بـ شركة الراجحي", time: "10:00", icon: "📞", c: "#00e5ff" },
                { t: "اجتماع مع فريق NEOM", time: "13:30", icon: "🎥", c: "#e9b3ff" },
                { t: "إرسال عرض لـ STC", time: "15:00", icon: "📧", c: "#52ec6f" },
                { t: "متابعة عميل أرامكو", time: "16:30", icon: "📋", c: "#c3f5ff" },
              ].map((t) => (
                <div key={t.t} className="flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.02] p-2.5">
                  <span className="text-base">{t.icon}</span>
                  <div className="flex-1 text-right">
                    <div className="text-[11px] text-white font-bold leading-tight">{t.t}</div>
                    <div className="text-[9px]" style={{ color: t.c }}>{t.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
