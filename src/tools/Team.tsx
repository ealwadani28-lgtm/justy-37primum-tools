const team = [
  { name: "سارة الحربي", role: "المؤسِّسة والمديرة التنفيذية", img: "https://i.pravatar.cc/300?img=47" },
  { name: "أحمد المنصور", role: "رئيس قسم التطوير", img: "https://i.pravatar.cc/300?img=12" },
  { name: "ليلى عبدالله", role: "مديرة التصميم", img: "https://i.pravatar.cc/300?img=44" },
  { name: "خالد السعيد", role: "مهندس برمجيات", img: "https://i.pravatar.cc/300?img=15" },
];

export function Team() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
      {team.map((m) => (
        <div key={m.name} className="text-center group">
          <div className="aspect-square rounded-2xl overflow-hidden mb-3 bg-secondary">
            <img src={m.img} alt={m.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
          </div>
          <h4 className="font-bold">{m.name}</h4>
          <p className="text-sm text-muted-foreground">{m.role}</p>
        </div>
      ))}
    </div>
  );
}
