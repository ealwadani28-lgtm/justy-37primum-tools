// Bloom Space — light mint/teal aesthetic per Stitch reference
export function BloomShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-emerald-200/40 bg-gradient-to-br from-[#e8f7f1] via-[#dff3ea] to-[#cfeee1] p-8 md:p-12 min-h-[520px] shadow-[0_30px_80px_-20px_rgba(30,180,140,0.35)]">
      <div className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #a7f3d0aa, transparent 70%)" }} aria-hidden />
      <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #5eead4aa, transparent 70%)" }} aria-hidden />

      <div className="relative">
        <div className="text-right mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-400/40 bg-white/60 text-[10px] uppercase tracking-[0.25em] text-emerald-700 font-bold mb-3 backdrop-blur">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Bloom Space · Analytics
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold text-[#0d3b2e] tracking-tight">
            بلوم سبيس: <span className="text-emerald-600">التحليلات والرؤى</span>
          </h3>
          <p className="text-emerald-900/70 mt-2 max-w-xl">داشبورد أنيق لمعرفة أداء حملاتك ومصادر زوارك بنظرة واحدة.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {/* Main chart */}
          <div className="md:col-span-2 rounded-2xl bg-white/80 backdrop-blur border border-white shadow-[0_10px_30px_-10px_rgba(30,180,140,0.3)] p-5">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs text-emerald-700 font-bold">+١٨٪</span>
              <div className="text-right">
                <div className="text-[10px] text-emerald-900/60">إجمالي الإيرادات</div>
                <div className="text-2xl font-extrabold text-[#0d3b2e]">١٬٢٥٠٬٠٠٠ د.إ</div>
              </div>
            </div>
            {/* Line chart */}
            <svg viewBox="0 0 400 140" className="w-full h-32">
              <defs>
                <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M 0 100 L 50 90 L 100 95 L 150 70 L 200 75 L 250 50 L 300 60 L 350 30 L 400 20 L 400 140 L 0 140 Z" fill="url(#bg)" />
              <path d="M 0 100 L 50 90 L 100 95 L 150 70 L 200 75 L 250 50 L 300 60 L 350 30 L 400 20" stroke="#10b981" strokeWidth="2.5" fill="none" />
              {[[50,90],[100,95],[150,70],[200,75],[250,50],[300,60],[350,30],[400,20]].map(([x,y],i) => (
                <circle key={i} cx={x} cy={y} r="3.5" fill="white" stroke="#10b981" strokeWidth="2" />
              ))}
            </svg>
            <div className="flex justify-between text-[9px] text-emerald-900/60 mt-1">
              {["يناير","فبراير","مارس","أبريل","مايو","يونيو","يوليو","أغسطس"].map(m => <span key={m}>{m}</span>)}
            </div>
          </div>

          {/* Live KPI */}
          <div className="rounded-2xl border-2 border-emerald-400/60 bg-white/80 backdrop-blur p-5 shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <div className="flex items-center gap-2 mb-4 justify-end">
              <span className="text-sm font-bold text-[#0d3b2e]">إحصائيات في الوقت الفعلي</span>
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-700">📈</div>
            </div>
            <div className="space-y-4 text-right">
              <div>
                <div className="text-[10px] text-emerald-900/60">المستخدمين النشطين الآن</div>
                <div className="text-3xl font-extrabold text-[#0d3b2e]">٣٬٤٥٠</div>
              </div>
              <div>
                <div className="text-[10px] text-emerald-900/60">معدل التحويل</div>
                <div className="text-3xl font-extrabold text-emerald-600">٤٫٥٪</div>
              </div>
              <div className="pt-3 border-t border-emerald-200">
                <div className="text-[10px] text-emerald-900/60 mb-1">العملاء الجدد</div>
                <div className="text-2xl font-extrabold text-[#0d3b2e]">٦٠٠</div>
              </div>
            </div>
          </div>

          {/* Donut chart */}
          <div className="rounded-2xl bg-white/80 backdrop-blur border border-white p-5">
            <div className="text-xs text-emerald-900/70 font-bold mb-3 text-right">مصادر حركة المرور</div>
            <div className="flex items-center justify-center my-2">
              <svg viewBox="0 0 100 100" className="w-32 h-32 -rotate-90">
                <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="14" strokeDasharray="110 220" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#5eead4" strokeWidth="14" strokeDasharray="60 220" strokeDashoffset="-110" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#7d01b1" strokeWidth="14" strokeDasharray="40 220" strokeDashoffset="-170" />
                <circle cx="50" cy="50" r="35" fill="none" stroke="#0d3b2e" strokeWidth="14" strokeDasharray="20 220" strokeDashoffset="-210" />
              </svg>
            </div>
            <div className="space-y-1 text-[10px]">
              {[
                { l: "بحث جوجل", c: "#10b981", v: "٥٠٪" },
                { l: "سوشيال", c: "#5eead4", v: "٢٧٪" },
                { l: "مباشر", c: "#7d01b1", v: "١٤٪" },
                { l: "إحالة", c: "#0d3b2e", v: "٩٪" },
              ].map(s => (
                <div key={s.l} className="flex items-center justify-between">
                  <span className="font-bold text-[#0d3b2e]">{s.v}</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-emerald-900/70">{s.l}</span>
                    <span className="w-2 h-2 rounded-full" style={{ background: s.c }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bar chart */}
          <div className="md:col-span-2 rounded-2xl bg-white/80 backdrop-blur border border-white p-5">
            <div className="text-xs text-emerald-900/70 font-bold mb-3 text-right">أداء الحملات الإعلانية</div>
            <div className="flex items-end gap-2 h-24">
              {[60, 80, 45, 95, 70, 85, 55].map((h, i) => (
                <div key={i} className="flex-1 rounded-t-lg bg-gradient-to-t from-emerald-500 to-teal-300" style={{ height: `${h}%` }} />
              ))}
            </div>
            <div className="flex justify-between text-[9px] text-emerald-900/60 mt-2">
              {["السبت","الأحد","الاثنين","الثلاثاء","الأربعاء","الخميس","الجمعة"].map(d => <span key={d}>{d}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
