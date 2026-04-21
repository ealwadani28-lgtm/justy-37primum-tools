export function LogisticsShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0b] p-8 md:p-12 min-h-[520px] shadow-[0_30px_120px_-30px_rgba(0,229,255,0.25)]">
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #00e5ff44, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #52ec6f44, transparent 70%)" }}
        aria-hidden
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: "linear-gradient(#bac9cc 1px, transparent 1px), linear-gradient(90deg, #bac9cc 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden
      />

      <div className="relative">
        {/* Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div className="text-right">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00e5ff]/30 bg-[#00626e]/20 text-[10px] uppercase tracking-[0.25em] text-[#c3f5ff] font-bold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
              Logistics Dashboard · Live
            </div>
            <h3 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              داشبورد <span style={{ background: "linear-gradient(135deg, #00e5ff, #52ec6f)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>الحلول اللوجستية</span>
            </h3>
            <p className="text-[#bac9cc] mt-2 max-w-xl">تتبّع الشحنات، الأساطيل، والمستودعات في الوقت الفعلي — لوحة قيادة واحدة لكل عملياتك.</p>
          </div>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          {[
            { l: "الشحنات النشطة", v: "١٬٢٨٤", t: "+١٢٪", c: "#00e5ff" },
            { l: "تم التسليم اليوم", v: "٣٤٢", t: "+٨٪", c: "#52ec6f" },
            { l: "في الطريق", v: "٧٦٨", t: "—", c: "#e9b3ff" },
            { l: "متأخّرة", v: "١٢", t: "-٣٪", c: "#ffb4ab" },
          ].map((k) => (
            <div
              key={k.l}
              className="relative rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-4 overflow-hidden"
            >
              <div
                className="absolute -top-10 -right-10 w-24 h-24 rounded-full opacity-30 blur-2xl"
                style={{ background: k.c }}
                aria-hidden
              />
              <div className="relative">
                <div className="text-[10px] text-[#849396] mb-1">{k.l}</div>
                <div className="text-2xl font-extrabold text-white">{k.v}</div>
                <div className="text-[10px] mt-1 font-bold" style={{ color: k.c }}>{k.t}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Map + table */}
        <div className="grid md:grid-cols-3 gap-3">
          {/* Map mock */}
          <div className="md:col-span-2 relative rounded-2xl border border-white/5 bg-gradient-to-br from-[#0e1a1c] to-[#050a0b] h-64 overflow-hidden">
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: "radial-gradient(circle at 20% 30%, #00e5ff44, transparent 30%), radial-gradient(circle at 70% 60%, #52ec6f44, transparent 30%), radial-gradient(circle at 50% 80%, #e9b3ff44, transparent 25%)"
            }} aria-hidden />
            {/* Routes */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 256" preserveAspectRatio="none" aria-hidden>
              <path d="M 50 180 Q 150 50 280 130 T 380 80" stroke="#00e5ff" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.6" />
              <path d="M 80 220 Q 200 200 320 100" stroke="#52ec6f" strokeWidth="1.5" fill="none" strokeDasharray="4 4" opacity="0.6" />
            </svg>
            {/* Pins */}
            {[
              { t: "20%", l: "20%", c: "#00e5ff" },
              { t: "55%", l: "70%", c: "#52ec6f" },
              { t: "75%", l: "45%", c: "#e9b3ff" },
              { t: "30%", l: "85%", c: "#00e5ff" },
            ].map((p, i) => (
              <div key={i} className="absolute" style={{ top: p.t, left: p.l }}>
                <div className="w-3 h-3 rounded-full animate-ping absolute" style={{ background: p.c, opacity: 0.5 }} />
                <div className="w-3 h-3 rounded-full relative" style={{ background: p.c, boxShadow: `0 0 12px ${p.c}` }} />
              </div>
            ))}
            <div className="absolute top-3 right-3 text-[10px] uppercase tracking-[0.2em] text-[#849396] font-bold">
              🗺 Live Tracking
            </div>
          </div>

          {/* Active shipments */}
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-4">
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#849396] font-bold mb-3">آخر الشحنات</div>
            <div className="space-y-2.5">
              {[
                { id: "SHP-8421", c: "الرياض → جدة", s: "في الطريق", col: "#00e5ff" },
                { id: "SHP-8420", c: "الدمام → الرياض", s: "تم التسليم", col: "#52ec6f" },
                { id: "SHP-8419", c: "مكة → المدينة", s: "تأخير", col: "#ffb4ab" },
                { id: "SHP-8418", c: "أبها → الطائف", s: "في الطريق", col: "#00e5ff" },
              ].map((row) => (
                <div key={row.id} className="flex items-center justify-between text-[11px]">
                  <div className="text-right">
                    <div className="text-white font-bold">{row.id}</div>
                    <div className="text-[9px] text-[#849396]">{row.c}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold" style={{ background: `${row.col}22`, color: row.col, border: `1px solid ${row.col}44` }}>
                    {row.s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
