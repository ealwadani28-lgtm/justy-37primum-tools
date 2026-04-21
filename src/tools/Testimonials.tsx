import { useEffect, useState } from "react";

const items = [
  { name: "نورة العتيبي", role: "مديرة منتج", text: "أدوات رائعة وفّرت علي أسابيع من العمل. تصميم نظيف وسهل الاستخدام جداً.", avatar: "https://i.pravatar.cc/100?img=49" },
  { name: "محمد القحطاني", role: "مطوّر مستقل", text: "كل أداة هنا مدروسة بعناية. شيء استثنائي في عالم الأدوات العربية.", avatar: "https://i.pravatar.cc/100?img=33" },
  { name: "ريم الزهراني", role: "مصممة UI/UX", text: "أخيراً أدوات عربية تحترم RTL والخطوط العربية. شكراً جزيلاً!", avatar: "https://i.pravatar.cc/100?img=45" },
];

export function Testimonials() {
  const [i, setI] = useState(0);
  useEffect(() => { const id = setInterval(() => setI((x) => (x + 1) % items.length), 5000); return () => clearInterval(id); }, []);
  const t = items[i];
  return (
    <div>
      <div className="bg-secondary border border-border rounded-2xl p-8 text-center min-h-[260px]">
        <div className="text-5xl text-primary mb-4">"</div>
        <p className="text-lg leading-relaxed mb-6">{t.text}</p>
        <div className="flex items-center justify-center gap-3">
          <img src={t.avatar} className="w-12 h-12 rounded-full" alt={t.name} />
          <div className="text-right">
            <div className="font-bold">{t.name}</div>
            <div className="text-xs text-muted-foreground">{t.role}</div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-4">
        {items.map((_, idx) => (
          <button key={idx} onClick={() => setI(idx)} className={`h-2 rounded-full transition-all ${idx === i ? "w-8 bg-primary" : "w-2 bg-muted"}`} />
        ))}
      </div>
    </div>
  );
}
