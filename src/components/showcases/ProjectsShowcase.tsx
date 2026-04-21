export function ProjectsShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0b] p-8 md:p-12 min-h-[500px] shadow-[0_30px_120px_-30px_rgba(0,229,255,0.25)]">
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #00e5ff44, transparent 70%)" }} aria-hidden />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #e9b3ff55, transparent 70%)" }} aria-hidden />

      <div className="relative grid md:grid-cols-5 gap-8 items-center">
        {/* Copy */}
        <div className="md:col-span-2 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00e5ff]/30 bg-[#00626e]/20 text-[10px] uppercase tracking-[0.25em] text-[#c3f5ff] font-bold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
            Project Management · Kanban
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold leading-[1.1] text-white mb-4 tracking-tight">
            إدارة مشاريع <br />
            <span style={{ background: "linear-gradient(135deg, #00e5ff, #e9b3ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              بسلاسة كانبان
            </span>
          </h3>
          <p className="text-[#bac9cc] leading-loose mb-6">
            نظّم مهام فريقك على لوحات سحب وإفلات. من فكرة، إلى تنفيذ، إلى تسليم — كل شيء مرئي ومتزامن.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[{ v: "12", l: "مشروع نشط" }, { v: "84%", l: "إنجاز الفريق" }, { v: "5", l: "أعضاء" }].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-3 text-center">
                <div className="text-xl font-bold text-[#00e5ff]">{s.v}</div>
                <div className="text-[9px] text-[#849396] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Kanban mock */}
        <div className="md:col-span-3 grid grid-cols-3 gap-3 h-[420px]">
          {[
            { title: "للتنفيذ", color: "#00e5ff", cards: [
              { t: "تصميم صفحة الهبوط", p: "عاجل", a: "س.ع" },
              { t: "مراجعة API", p: "عادي", a: "م.ك" },
            ]},
            { title: "قيد العمل", color: "#e9b3ff", cards: [
              { t: "بناء لوحة التحكم", p: "مهم", a: "أ.ر" },
              { t: "اختبار المدفوعات", p: "عاجل", a: "ن.م" },
              { t: "كتابة الوثائق", p: "عادي", a: "ر.ف" },
            ]},
            { title: "مكتمل", color: "#52ec6f", cards: [
              { t: "تجهيز قاعدة البيانات", p: "—", a: "خ.س" },
              { t: "إعداد CI/CD", p: "—", a: "س.ع" },
            ]},
          ].map((col) => (
            <div key={col.title} className="rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-xl p-3 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] px-2 py-0.5 rounded-full" style={{ background: `${col.color}22`, color: col.color, border: `1px solid ${col.color}55` }}>
                  {col.cards.length}
                </span>
                <div className="text-[11px] font-bold text-white">{col.title}</div>
              </div>
              <div className="space-y-2 flex-1">
                {col.cards.map((c, i) => (
                  <div key={i} className="rounded-xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-transparent p-2.5 backdrop-blur">
                    <div className="text-[11px] text-white font-bold leading-snug text-right mb-2">{c.t}</div>
                    <div className="flex items-center justify-between">
                      <div className="w-5 h-5 rounded-full text-[8px] flex items-center justify-center font-bold" style={{ background: col.color, color: "#0a0a0b" }}>{c.a}</div>
                      <span className="text-[8px] px-1.5 py-0.5 rounded text-[#bac9cc] border border-white/10">{c.p}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
