export function TalentShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0b] p-8 md:p-12 min-h-[500px] shadow-[0_30px_120px_-30px_rgba(233,179,255,0.25)]">
      <div className="absolute -top-32 -left-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #e9b3ff44, transparent 70%)" }} aria-hidden />
      <div className="absolute -bottom-40 -right-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #c3f5ff55, transparent 70%)" }} aria-hidden />

      <div className="relative grid md:grid-cols-2 gap-10 items-center">
        {/* Copy */}
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#e9b3ff]/30 bg-[#7d01b1]/20 text-[10px] uppercase tracking-[0.25em] text-[#e9b3ff] font-bold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#e9b3ff] animate-pulse" />
            Talent Management · HR
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold leading-[1.1] text-white mb-4 tracking-tight">
            إدارة <br />
            <span style={{ background: "linear-gradient(135deg, #e9b3ff, #c3f5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              المواهب البشرية
            </span>
          </h3>
          <p className="text-[#bac9cc] leading-loose mb-6">
            من التوظيف إلى التطوير. تتبّع الأداء، اقترح التدريبات، واكتشف نجوم فريقك بالذكاء الاصطناعي.
          </p>
          <div className="space-y-2">
            {[
              { l: "🎯 تقييم الأداء الفصلي", v: "OKR" },
              { l: "📚 خطط التطوير الشخصية", v: "L&D" },
              { l: "🏆 برامج المكافآت", v: "Rewards" },
            ].map((f) => (
              <div key={f.v} className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] backdrop-blur-xl px-4 py-2.5">
                <span className="text-[10px] text-[#849396] font-mono">{f.v}</span>
                <span className="text-sm text-white">{f.l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Talent cards */}
        <div className="grid grid-cols-2 gap-3 h-[440px]">
          {[
            { name: "سارة العتيبي", role: "Lead Designer", score: 94, color: "#e9b3ff", avatar: "س" },
            { name: "محمد الراشد", role: "Senior Dev", score: 88, color: "#00e5ff", avatar: "م" },
            { name: "نورة القحطاني", role: "Product Manager", score: 91, color: "#52ec6f", avatar: "ن" },
            { name: "فيصل الشمري", role: "Data Analyst", score: 85, color: "#c3f5ff", avatar: "ف" },
          ].map((p, i) => (
            <div key={p.name} className="relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-4 overflow-hidden flex flex-col justify-between"
              style={{ marginTop: i % 2 === 1 ? "1.5rem" : "0" }}>
              <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full opacity-30 blur-2xl" style={{ background: p.color }} aria-hidden />
              <div className="relative">
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold mb-3" style={{ background: `${p.color}33`, color: p.color, border: `1px solid ${p.color}66` }}>
                  {p.avatar}
                </div>
                <div className="text-sm font-bold text-white mb-1">{p.name}</div>
                <div className="text-[10px] text-[#849396]">{p.role}</div>
              </div>
              <div className="relative mt-3">
                <div className="flex items-center justify-between text-[10px] mb-1">
                  <span className="font-bold" style={{ color: p.color }}>{p.score}/100</span>
                  <span className="text-[#849396]">الأداء</span>
                </div>
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${p.score}%`, background: `linear-gradient(90deg, ${p.color}, ${p.color}88)` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
