const badges = [
  { icon: "🔒", title: "دفع آمن", desc: "تشفير SSL 256-bit" },
  { icon: "🚚", title: "شحن مجاني", desc: "للطلبات فوق 200 ر.س" },
  { icon: "↩️", title: "إرجاع 30 يوم", desc: "بدون أسئلة" },
  { icon: "🎧", title: "دعم 24/7", desc: "متاح طوال الأسبوع" },
  { icon: "✅", title: "ضمان الجودة", desc: "منتجات أصلية 100%" },
  { icon: "💳", title: "دفع متعدد", desc: "Mada, Visa, Apple Pay" },
];

export function TrustBadges() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {badges.map((b) => (
        <div key={b.title} className="bg-secondary border border-border rounded-2xl p-5 text-center hover:border-primary transition">
          <div className="text-4xl mb-2">{b.icon}</div>
          <div className="font-bold">{b.title}</div>
          <div className="text-xs text-muted-foreground mt-1">{b.desc}</div>
        </div>
      ))}
    </div>
  );
}
