import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Props {
  defaultUrl?: string;
}

export function SheildyWaitlist({ defaultUrl }: Props) {
  const [email, setEmail] = useState("");
  const [url, setUrl] = useState(defaultUrl ?? "");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    setMessage("");
    const { error } = await supabase.from("sheildy_waitlist").insert({
      email: email.trim(),
      url: url.trim() || null,
      source: "security-audit",
    });
    if (error) {
      if (error.code === "23505") {
        setStatus("success");
        setMessage("إيميلك مسجّل عندنا بالفعل ✅ بنبلّغك أول ما حصين يُطلق.");
      } else {
        setStatus("error");
        setMessage("صار خلل بسيط، جرّب مرة ثانية بعد لحظة.");
      }
      return;
    }
    setStatus("success");
    setMessage("تم تسجيل اهتمامك! 🛡️ بنرسلك دعوة الإطلاق على إيميلك.");
    setEmail("");
  };

  return (
    <div
      dir="rtl"
      className="relative overflow-hidden rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 via-card to-card p-6 shadow-card-soft"
    >
      <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
      <div className="relative space-y-4">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-2xl">🛡️</span>
          <h3 className="text-lg font-extrabold">
            تنبيهات أمان تلقائية لموقعك — قريباً مع <span className="text-primary">حصين</span>
          </h3>
          <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-primary/20 text-primary border border-primary/40">
            قريباً
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          فحص أسبوعي تلقائي لموقعك + إيميل فوري عند ظهور أي خلل أمني جديد.
          سجّل إيميلك واحجز مقعدك ضمن أوائل المستخدمين، وراح توصلك دعوة خاصة بسعر الإطلاق.
        </p>

        {status === "success" ? (
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-300">
            {message}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid sm:grid-cols-2 gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="إيميلك"
                dir="ltr"
                className="bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="رابط موقعك (اختياري)"
                dir="ltr"
                className="bg-input border border-border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                type="submit"
                disabled={status === "loading"}
                className="bg-mint-gradient text-primary-foreground font-bold px-6 py-3 rounded-xl disabled:opacity-50"
              >
                {status === "loading" ? "جارٍ التسجيل..." : "سجّل اهتمامي"}
              </button>
              <span className="text-xs text-muted-foreground">
                بدون التزام • نرسل إيميل واحد فقط عند الإطلاق
              </span>
            </div>
            {status === "error" && (
              <div className="text-sm text-rose-400">{message}</div>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
