const days = [
  { day: "السبت", hours: "9:00 ص - 10:00 م" },
  { day: "الأحد", hours: "9:00 ص - 10:00 م" },
  { day: "الإثنين", hours: "9:00 ص - 10:00 م" },
  { day: "الثلاثاء", hours: "9:00 ص - 10:00 م" },
  { day: "الأربعاء", hours: "9:00 ص - 10:00 م" },
  { day: "الخميس", hours: "9:00 ص - 12:00 ص" },
  { day: "الجمعة", hours: "مغلق", closed: true },
];

export function OpenHours() {
  const today = new Date().toLocaleDateString("ar-SA", { weekday: "long" });
  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-primary/15 text-primary px-4 py-2 rounded-full text-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          مفتوح الآن
        </div>
      </div>
      <div className="bg-secondary border border-border rounded-2xl divide-y divide-border">
        {days.map((d) => {
          const isToday = d.day.includes(today.replace("ال", "").trim()) || today.includes(d.day.replace("ال", ""));
          return (
            <div key={d.day} className={`flex items-center justify-between p-4 ${isToday ? "bg-card-glow" : ""}`}>
              <span className={`font-semibold ${isToday ? "text-primary" : ""}`}>{d.day}{isToday && " (اليوم)"}</span>
              <span className={d.closed ? "text-destructive" : "text-muted-foreground"}>{d.hours}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
