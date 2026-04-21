import { useState } from "react";

const data = {
  مقبلات: [
    { name: "حمّص بالطحينة", price: 18, desc: "حمّص كريمي مع زيت زيتون بكر." },
    { name: "متبّل", price: 20, desc: "باذنجان مشوي بالطحينة." },
  ],
  "أطباق رئيسية": [
    { name: "شاورما لحم", price: 45, desc: "لحم متبّل مشوي مع صوص الثوم." },
    { name: "مشاوي مشكّلة", price: 75, desc: "تشكيلة من الكباب والشيش طاووق." },
  ],
  حلويات: [
    { name: "كنافة بالقشطة", price: 28, desc: "كنافة طازجة بالقشطة والقطر." },
    { name: "أم علي", price: 22, desc: "حلى ساخن بالمكسرات." },
  ],
};

export function Menu() {
  const cats = Object.keys(data);
  const [active, setActive] = useState(cats[0]);
  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {cats.map((c) => (
          <button key={c} onClick={() => setActive(c)} className={`px-4 py-2 rounded-full text-sm font-semibold transition ${active === c ? "bg-mint-gradient text-primary-foreground" : "bg-secondary border border-border hover:border-primary"}`}>
            {c}
          </button>
        ))}
      </div>
      <div className="space-y-3">
        {data[active as keyof typeof data].map((item) => (
          <div key={item.name} className="flex items-start justify-between gap-4 bg-secondary border border-border rounded-xl p-4">
            <div className="flex-1">
              <h4 className="font-bold">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
            <div className="text-primary font-black text-xl whitespace-nowrap">{item.price} ر.س</div>
          </div>
        ))}
      </div>
    </div>
  );
}
