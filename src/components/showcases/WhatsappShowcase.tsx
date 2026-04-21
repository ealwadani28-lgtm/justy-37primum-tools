export function WhatsappShowcase() {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-[#0a0a0b] p-8 md:p-12 min-h-[480px] shadow-[0_30px_120px_-30px_rgba(0,229,255,0.25)]">
      {/* Aura backgrounds */}
      <div
        className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #25D36644, transparent 70%)" }}
        aria-hidden
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-30 blur-3xl"
        style={{ background: "radial-gradient(circle, #00e5ff55, transparent 70%)" }}
        aria-hidden
      />

      {/* Noise overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
        aria-hidden
      />

      <div className="relative grid md:grid-cols-2 gap-10 items-center">
        {/* Left: copy */}
        <div className="text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 text-[10px] uppercase tracking-[0.25em] text-[#52ec6f] font-bold mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#52ec6f] animate-pulse" />
            Omnichannel · WhatsApp
          </div>
          <h3 className="text-3xl md:text-5xl font-extrabold leading-[1.1] text-white mb-4 tracking-tight">
            دعم عملاء <br />
            <span style={{ background: "linear-gradient(135deg, #25D366, #00e5ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              متعدد القنوات
            </span>
          </h3>
          <p className="text-[#bac9cc] leading-loose mb-6">
            ردّ على عملائك من واتساب، إنستجرام، وفيسبوك من شاشة واحدة. زر عائم ذكي يحوّل الزائر لمحادثة في ثانيتين.
          </p>

          <div className="grid grid-cols-3 gap-3">
            {[
              { v: "<٢ث", l: "زمن الرد" },
              { v: "+٣٨٪", l: "تحويلات" },
              { v: "٢٤/٧", l: "متاح دائماً" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-xl p-3 text-center">
                <div className="text-xl font-bold text-[#52ec6f]">{s.v}</div>
                <div className="text-[10px] text-[#849396] mt-0.5">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: phone mockup */}
        <div className="relative h-[440px]">
          {/* Phone frame */}
          <div className="absolute inset-x-8 inset-y-0 rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-[#1c1b1c] to-[#0e0e0f] p-3 shadow-[0_30px_80px_-20px_rgba(37,211,102,0.3)]">
            {/* Notch */}
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-10" />
            <div className="h-full w-full rounded-[2rem] bg-gradient-to-b from-[#075E54] via-[#128C7E] to-[#0e0e0f] overflow-hidden relative">
              {/* WhatsApp header */}
              <div className="bg-[#075E54]/90 backdrop-blur px-4 pt-10 pb-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#25D366] to-[#128C7E] flex items-center justify-center text-white font-bold text-sm">م</div>
                <div className="flex-1 text-right">
                  <div className="text-white text-sm font-bold">متجرنا</div>
                  <div className="text-[10px] text-[#b0ffb1] flex items-center gap-1 justify-end">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#52ec6f]" />
                    متصل الآن
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-4 space-y-3" dir="rtl">
                <div className="bg-white/95 text-[#0a0a0b] text-xs p-2.5 rounded-2xl rounded-tr-sm max-w-[80%] mr-auto shadow">
                  مرحباً 👋 كيف نخدمك؟
                </div>
                <div className="bg-[#DCF8C6] text-[#0a0a0b] text-xs p-2.5 rounded-2xl rounded-tl-sm max-w-[80%] ml-auto shadow">
                  أبغى أعرف عروض اليوم
                </div>
                <div className="bg-white/95 text-[#0a0a0b] text-xs p-2.5 rounded-2xl rounded-tr-sm max-w-[85%] mr-auto shadow">
                  أكيد! فيه خصم 30% على المنتجات الجديدة 🎁
                </div>
                <div className="flex items-center gap-1 mr-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0.15s" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/60 animate-bounce" style={{ animationDelay: "0.3s" }} />
                </div>
              </div>

              {/* Floating button preview */}
              <div className="absolute bottom-4 left-4 w-12 h-12 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_30px_#25D36688] animate-pulse">
                <span className="text-xl">💬</span>
              </div>
            </div>
          </div>

          {/* Floating channel chips */}
          <div className="absolute -top-2 -right-2 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl px-3 py-2 text-[10px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            📷 Instagram
          </div>
          <div className="absolute top-1/2 -left-2 rounded-2xl border border-white/10 bg-white/[0.06] backdrop-blur-xl px-3 py-2 text-[10px] text-white shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
            💼 Messenger
          </div>
          <div className="absolute bottom-2 -right-2 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 backdrop-blur-xl px-3 py-2 text-[10px] text-[#52ec6f] font-bold shadow-[0_10px_30px_rgba(37,211,102,0.3)]">
            ✓ WhatsApp
          </div>
        </div>
      </div>
    </div>
  );
}
