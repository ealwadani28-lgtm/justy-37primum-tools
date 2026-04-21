import { useState } from "react";

const FAKE_ISSUES = [
  { sev: "حرجة", color: "text-rose-400", title: "حقن SQL", status: "تم الحل", time: "12:45" },
  { sev: "عالية", color: "text-amber-400", title: "تجاوز المصادقة", status: "قيد المعالجة", time: "12:43" },
  { sev: "متوسطة", color: "text-yellow-300", title: "تسريب المعلومات", status: "مفتوح", time: "13:51" },
  { sev: "منخفضة", color: "text-emerald-400", title: "تكوين خاطئ", status: "تم الحل", time: "12:46" },
];

export function SecurityAudit() {
  const [url, setUrl] = useState("");
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);

  const scan = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    setScanning(true);
    setDone(false);
    setTimeout(() => { setScanning(false); setDone(true); }, 1800);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={scan} className="flex gap-2">
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com"
          className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm"
          dir="ltr"
        />
        <button
          disabled={scanning}
          className="bg-mint-gradient text-primary-foreground font-semibold px-6 rounded-xl disabled:opacity-50"
        >
          {scanning ? "يفحص..." : "ابدأ الفحص"}
        </button>
      </form>

      {(scanning || done) && (
        <div className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold">تقرير الثغرات الأمنية</h3>
            <span className={`text-xs px-3 py-1 rounded-full ${done ? "bg-emerald-500/15 text-emerald-400" : "bg-amber-500/15 text-amber-400"}`}>
              {done ? "✓ تم التحقق" : "جاري الفحص..."}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 rounded-xl bg-secondary">
              <div className="text-2xl font-bold text-emerald-400">98%</div>
              <div className="text-xs text-muted-foreground">درجة الأمان</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary">
              <div className="text-2xl font-bold text-amber-400">1,265</div>
              <div className="text-xs text-muted-foreground">تهديدات محظورة</div>
            </div>
            <div className="p-3 rounded-xl bg-secondary">
              <div className="text-2xl font-bold text-mint">99.9%</div>
              <div className="text-xs text-muted-foreground">وقت التشغيل</div>
            </div>
          </div>

          <div className="space-y-2">
            {FAKE_ISSUES.map((i, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-secondary/60 text-sm">
                <span className="text-xs text-muted-foreground">🕐 {i.time} مدخل</span>
                <div className="flex items-center gap-3">
                  <span className={`font-bold ${i.color}`}>{i.sev}</span>
                  <span className="text-muted-foreground">- {i.title} -</span>
                  <span className="text-foreground">{i.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
