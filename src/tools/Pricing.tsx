import { useState } from "react";

const plans = [
  { name: "مبتدئ", monthly: 0, yearly: 0, features: ["أداة واحدة", "دعم أساسي", "علامة مائية"], cta: "ابدأ الآن", featured: false },
  { name: "احترافي", monthly: 49, yearly: 490, features: ["جميع الأدوات", "دعم مميّز", "بدون علامة مائية", "تخصيص كامل"], cta: "اشترك الآن", featured: true },
  { name: "شركات", monthly: 149, yearly: 1490, features: ["كل ميزات الاحترافي", "حسابات متعددة", "API مخصص", "مدير حساب"], cta: "تواصل معنا", featured: false },
];

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-center gap-3 mb-8">
        <span className={!yearly ? "font-bold" : "text-muted-foreground"}>شهري</span>
        <button onClick={() => setYearly(!yearly)} className={`relative w-14 h-8 rounded-full transition ${yearly ? "bg-primary" : "bg-muted"}`}>
          <span className={`absolute top-1 w-6 h-6 rounded-full bg-white transition-all ${yearly ? "right-1" : "right-7"}`} />
        </button>
        <span className={yearly ? "font-bold" : "text-muted-foreground"}>سنوي <span className="text-xs text-primary">(خصم 17%)</span></span>
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {plans.map((p) => (
          <div key={p.name} className={`rounded-3xl p-6 border ${p.featured ? "border-primary bg-card-glow shadow-glow" : "border-border bg-secondary"}`}>
            {p.featured && <div className="text-xs bg-mint-gradient text-primary-foreground inline-block px-3 py-1 rounded-full font-bold mb-3">الأكثر شيوعاً</div>}
            <h3 className="text-xl font-bold mb-2">{p.name}</h3>
            <div className="mb-4">
              <span className="text-4xl font-black">{yearly ? p.yearly : p.monthly}</span>
              <span className="text-muted-foreground"> ر.س / {yearly ? "سنة" : "شهر"}</span>
            </div>
            <ul className="space-y-2 mb-6 text-sm">
              {p.features.map((f) => <li key={f} className="flex items-center gap-2"><span className="text-primary">✓</span> {f}</li>)}
            </ul>
            <button className={`w-full py-3 rounded-xl font-semibold ${p.featured ? "bg-mint-gradient text-primary-foreground" : "bg-card border border-border hover:border-primary"}`}>
              {p.cta}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
