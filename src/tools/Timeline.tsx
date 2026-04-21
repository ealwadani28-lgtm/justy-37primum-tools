const events = [
  { year: "2020", title: "البداية", desc: "تأسيس الشركة بفكرة بسيطة." },
  { year: "2021", title: "أول منتج", desc: "إطلاق أول أداة وحصول على 1000 مستخدم." },
  { year: "2022", title: "التوسّع", desc: "توسيع الفريق وإطلاق 5 منتجات جديدة." },
  { year: "2023", title: "إنجاز كبير", desc: "تجاوز 100,000 مستخدم نشط." },
  { year: "2024", title: "الانطلاق عالمياً", desc: "دعم 10 لغات وفروع في 5 دول." },
];

export function Timeline() {
  return (
    <div className="relative">
      <div className="absolute right-6 top-0 bottom-0 w-0.5 bg-border" />
      <div className="space-y-8">
        {events.map((e, i) => (
          <div key={i} className="relative pr-16">
            <div className="absolute right-3 top-2 w-7 h-7 rounded-full bg-mint-gradient shadow-glow flex items-center justify-center text-xs font-black text-primary-foreground">
              {i + 1}
            </div>
            <div className="bg-secondary border border-border rounded-2xl p-5">
              <div className="text-xs text-primary font-bold mb-1">{e.year}</div>
              <h4 className="font-bold text-lg">{e.title}</h4>
              <p className="text-sm text-muted-foreground mt-1">{e.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
