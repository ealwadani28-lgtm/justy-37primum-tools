export function SentimentShowcase() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(135deg,#1e1b4b_0%,#3b1d5c_30%,#7c2d5c_60%,#a85a4a_100%)] p-6 md:p-12" dir="rtl">
      {/* Glass card */}
      <div className="relative rounded-2xl bg-white/5 backdrop-blur-2xl border border-white/15 p-8 md:p-12 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.5)]">
        {/* Top nav mock */}
        <div className="flex items-center justify-between mb-12 text-sm">
          <div className="flex items-center gap-2 text-white">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-indigo-400 to-purple-500" />
            <span className="font-bold">SaaS Arab</span>
          </div>
          <div className="hidden md:flex items-center gap-5 text-white/70 text-xs">
            <span>عن الشركة</span><span>التسعير</span><span>التحليلات</span><span>المنتجات</span>
            <span className="text-white border-b border-white pb-1">الرئيسية</span>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-rose-500 border border-white/30" />
          </div>
        </div>

        <h2 className="text-3xl md:text-5xl font-black text-white text-center mb-12">
          تحليل المشاعر بالذكاء الاصطناعي
        </h2>

        {/* Three emoji orbs */}
        <div className="flex items-center justify-center gap-8 md:gap-16 mb-10">
          <EmojiOrb emoji="😊" glow="from-amber-300 to-orange-400" />
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/30 flex items-center justify-center text-6xl bg-white/5 backdrop-blur shadow-[0_0_60px_rgba(192,132,252,0.5)]">
              😐
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-purple-300/50 animate-pulse" />
          </div>
          <EmojiOrb emoji="😞" glow="from-rose-400 to-red-500" />
        </div>

        {/* Result text */}
        <div className="text-center text-white mb-10">
          <p className="text-sm text-white/70 mb-1">نص المدخلات: "المنتج رائع جداً، تجربة ممتازة."</p>
          <p className="text-base">
            - نتيجة: <span className="text-emerald-300 font-bold">إيجابي جداً</span>،
            ثقة: <span className="text-amber-300 font-bold">98%</span>
          </p>
        </div>

        {/* Floating cards */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 -rotate-2">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 via-rose-400 to-purple-500" />
              <span className="text-white text-sm font-bold">مؤشر مزاج العملاء</span>
            </div>
            <div className="text-white/70 text-xs mb-2">Customer Mood</div>
            <svg viewBox="0 0 200 60" className="w-full h-12">
              <path d="M0,40 Q40,20 80,30 T160,15 T200,25" fill="none" stroke="#c084fc" strokeWidth="2" />
              <path d="M0,40 Q40,20 80,30 T160,15 T200,25 L200,60 L0,60 Z" fill="rgba(192,132,252,0.3)" />
            </svg>
            <div className="flex justify-between mt-2 text-[10px]">
              <span className="text-emerald-300">سعيد 65%</span>
              <span className="text-sky-300">محايد 25%</span>
              <span className="text-rose-300">غاضب 10%</span>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-4 rotate-2">
            <div className="text-xs text-white/60 mb-2">💡 Insight</div>
            <p className="text-white text-sm leading-relaxed">
              رؤى تحليلية: تحسن ملحوظ في رضا العملاء
            </p>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex flex-wrap justify-center gap-3">
          <button className="bg-white/15 backdrop-blur border border-white/20 text-white text-sm px-5 py-2.5 rounded-full">✓ طلب تجربة مجانية</button>
          <button className="bg-white/15 backdrop-blur border border-white/20 text-white text-sm px-5 py-2.5 rounded-full">↗ عرض المزيد من التفاصيل</button>
          <button className="bg-white/15 backdrop-blur border border-white/20 text-white text-sm px-5 py-2.5 rounded-full">💬 تواصل معنا</button>
        </div>
      </div>
    </div>
  );
}

function EmojiOrb({ emoji, glow }: { emoji: string; glow: string }) {
  return (
    <div className="relative">
      <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${glow} blur-2xl opacity-60 scale-110`} />
      <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-white/10 backdrop-blur border border-white/30 flex items-center justify-center text-4xl shadow-[0_10px_30px_rgba(0,0,0,0.3)]">
        {emoji}
      </div>
    </div>
  );
}
