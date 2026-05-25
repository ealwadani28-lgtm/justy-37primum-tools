export function PaymentsShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0b] p-8 md:p-12 min-h-[500px] shadow-[0_30px_120px_-30px_rgba(82,236,111,0.25)]">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #52ec6f44, transparent 70%)" }} aria-hidden />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #00e5ff55, transparent 70%)" }} aria-hidden />

      <div className="relative grid md:grid-cols-2 gap-10 items-center">
        {/* Cards stack */}
        <div className="relative h-[420px]">
          {/* Card 1 - back */}
          <div className="absolute top-4 right-8 left-12 h-52 rounded-3xl bg-gradient-to-br from-[#7d01b1] via-[#510074] to-[#0e0e0f] border border-white/10 p-5 shadow-[0_30px_60px_-15px_rgba(125,1,177,0.5)] rotate-[-6deg]">
            <div className="flex items-center justify-between text-white/60 text-[10px]">
              <span>VISA</span>
              <span>•••• 4521</span>
            </div>
          </div>
          {/* Card 2 - front */}
          <div className="absolute top-12 right-4 left-16 h-52 rounded-3xl bg-gradient-to-br from-[#00626e] via-[#003940] to-[#0e0e0f] border border-[#00e5ff]/30 p-5 shadow-[0_30px_60px_-15px_rgba(0,229,255,0.5)] rotate-[3deg]">
            <div className="flex flex-col h-full justify-between text-white">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.2em] text-[#c3f5ff]">FinPay</span>
                <div className="flex gap-1">
                  <div className="w-6 h-4 rounded bg-[#00e5ff]/40" />
                  <div className="w-6 h-4 rounded bg-[#52ec6f]/40 -mr-3" />
                </div>
              </div>
              <div>
                <div className="text-xs text-white/75 mb-1">Balance</div>
                <div className="text-2xl font-extrabold">SAR 24,580<span className="text-sm text-white/60">.42</span></div>
              </div>
              <div className="flex items-center justify-between text-[10px] text-white/60">
                <span>5421 •••• •••• 8845</span>
                <span>12/27</span>
              </div>
            </div>
          </div>

          {/* Floating transactions */}
          <div className="absolute bottom-2 right-2 left-2 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-3">
            <div className="text-[9px] uppercase tracking-[0.2em] text-[#849396] font-bold mb-2">آخر المعاملات</div>
            <div className="space-y-1.5">
              {[
                { c: "Apple Pay", a: "+SAR 1,250", g: true },
                { c: "STC Pay", a: "-SAR 340", g: false },
                { c: "Mada", a: "+SAR 890", g: true },
              ].map((t) => (
                <div key={t.c} className="flex items-center justify-between text-[10px]">
                  <span className="font-bold" style={{ color: t.g ? "#52ec6f" : "#ffb4ab" }}>{t.a}</span>
                  <span className="text-[#bac9cc]">{t.c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#52ec6f]/30 bg-[#003910]/40 text-[10px] uppercase tracking-[0.25em] text-[#52ec6f] font-bold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#52ec6f] animate-pulse" />
            FinTech · Payment Gateway
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold leading-[1.1] text-white mb-4 tracking-tight">
            بوابة دفع <br />
            <span style={{ background: "linear-gradient(135deg, #52ec6f, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              تتفوق على البنوك
            </span>
          </h3>
          <p className="text-[#bac9cc] leading-loose mb-6">
            استقبل المدفوعات عبر مدى، Apple Pay، STC Pay، وفيزا — لوحة تحكم واحدة، تقارير لحظية، وتسوية يومية.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[{ v: "0.9%", l: "عمولة" }, { v: "T+1", l: "تسوية" }, { v: "PCI", l: "مرخّص" }].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-3 text-center">
                <div className="text-xl font-bold text-[#52ec6f]">{s.v}</div>
                <div className="text-[9px] text-[#849396] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
