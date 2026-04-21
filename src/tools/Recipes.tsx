const recipes = [
  { name: "كبسة الدجاج", time: "60 دقيقة", img: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=600", tags: ["سعودي", "أرز"] },
  { name: "ملوخية", time: "45 دقيقة", img: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600", tags: ["مصري", "خضار"] },
  { name: "تبولة", time: "20 دقيقة", img: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?w=600", tags: ["شامي", "سلطة"] },
  { name: "كنافة", time: "40 دقيقة", img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600", tags: ["حلويات"] },
];

export function Recipes() {
  return (
    <div className="grid sm:grid-cols-2 gap-5">
      {recipes.map((r) => (
        <div key={r.name} className="bg-secondary border border-border rounded-2xl overflow-hidden group">
          <div className="aspect-video overflow-hidden">
            <img src={r.img} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          </div>
          <div className="p-5">
            <h3 className="font-bold text-lg mb-2">{r.name}</h3>
            <p className="text-sm text-muted-foreground mb-3">⏱️ {r.time}</p>
            <div className="flex gap-2 flex-wrap">
              {r.tags.map((t) => <span key={t} className="text-xs bg-card border border-border px-2 py-1 rounded-full">{t}</span>)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
