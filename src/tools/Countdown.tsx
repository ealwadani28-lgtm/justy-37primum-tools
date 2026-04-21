import { useEffect, useState } from "react";
import { ActionBar } from "@/components/ActionBar";

export function Countdown() {
  const [target, setTarget] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 7);
    return d.toISOString().slice(0, 16);
  });
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, new Date(target).getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  const Box = ({ value, label }: { value: number; label: string }) => (
    <div className="flex-1 bg-secondary border border-border rounded-2xl p-4 md:p-6 text-center">
      <div className="text-4xl md:text-6xl font-black text-mint-gradient tabular-nums">
        {String(value).padStart(2, "0")}
      </div>
      <div className="text-xs md:text-sm text-muted-foreground mt-2">{label}</div>
    </div>
  );

  const embed = `<div data-countdown="${target}" dir="rtl">العدّ التنازلي حتى ${new Date(target).toLocaleString("ar")}</div>`;
  const summary = `${days}ي ${hours}س ${mins}د ${secs}ث متبقية حتى ${new Date(target).toLocaleString("ar")}`;

  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-semibold mb-2 block">التاريخ المستهدف</label>
        <input
          type="datetime-local"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
          className="bg-input border border-border rounded-xl px-4 py-2 text-sm"
        />
      </div>
      <div className="flex gap-3 md:gap-4" dir="ltr">
        <Box value={days} label="أيام" />
        <Box value={hours} label="ساعات" />
        <Box value={mins} label="دقائق" />
        <Box value={secs} label="ثوانٍ" />
      </div>
      {diff === 0 && <div className="text-center text-xl font-bold text-primary">⏰ انتهى الوقت!</div>}

      <ActionBar
        copyText={embed}
        copyLabel="نسخ كود التضمين"
        downloadText={{ content: embed, filename: "countdown.html", mime: "text/html" }}
        downloadLabel="تحميل HTML"
        share={{ title: "عدّ تنازلي", text: summary }}
      />
    </div>
  );
}
