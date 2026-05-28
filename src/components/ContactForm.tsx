import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Send, MessageSquare, AlertCircle, Loader2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(2, "الاسم قصير جداً").max(100, "الاسم طويل جداً"),
  email: z.string().trim().email("بريد إلكتروني غير صالح").max(255),
  kind: z.enum(["suggestion", "complaint", "other"]),
  message: z
    .string()
    .trim()
    .min(5, "الرسالة قصيرة جداً")
    .max(4000, "الرسالة طويلة جداً (الحد ٤٠٠٠ حرف)"),
});

const kindLabels = {
  suggestion: "اقتراح",
  complaint: "شكوى",
  other: "أخرى",
} as const;

export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    kind: "suggestion" as "suggestion" | "complaint" | "other",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        if (i.path[0]) fieldErrors[String(i.path[0])] = i.message;
      });
      setErrors(fieldErrors);
      toast.error("الرجاء مراجعة الحقول", {
        description: "بعض البيانات غير صالحة.",
      });
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: parsed.data.name,
        email: parsed.data.email,
        kind: parsed.data.kind,
        message: parsed.data.message,
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
      });

      if (error) throw error;

      setSent(true);
      setForm({ name: "", email: "", kind: "suggestion", message: "" });
      toast.success("تم استلام رسالتك بنجاح", {
        description: "سنتواصل معك في أقرب وقت ممكن.",
      });
    } catch (err) {
      console.error("[ContactForm] فشل الإرسال:", err);
      toast.error("فشل إرسال الرسالة", {
        description: "تعذّر إرسال الرسالة الآن. حاول مرة أخرى بعد قليل.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div
        id="contact"
        className="bg-card border border-border rounded-3xl p-8 md:p-10 text-center shadow-card-soft"
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
          <MessageSquare className="h-7 w-7" />
        </div>
        <h2 className="text-2xl font-bold mb-2">شكراً لك! 🌿</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          وصلتنا رسالتك بنجاح، وسنرد عليك على بريدك الإلكتروني قريباً بإذن الله.
        </p>
        <button
          onClick={() => setSent(false)}
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-5 py-2.5 text-sm font-semibold hover:bg-muted transition"
        >
          إرسال رسالة أخرى
        </button>
      </div>
    );
  }

  return (
    <section
      id="contact"
      className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card-soft scroll-mt-24"
    >
      <header className="mb-6">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <span className="text-primary">▍</span> تواصل معنا
        </h2>
        <p className="text-muted-foreground">
          عندك اقتراح يحسّن المنصة؟ أو شكوى من أداة معيّنة؟ اكتبها هنا وراح توصلنا
          مباشرة.
        </p>
      </header>

      <form onSubmit={onSubmit} className="grid gap-5" noValidate>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              الاسم
            </label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
              placeholder="اسمك الكريم"
              maxLength={100}
              required
              disabled={submitting}
            />
            {errors.name && (
              <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              البريد الإلكتروني
            </label>
            <input
              id="email"
              type="email"
              dir="ltr"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-border bg-background px-4 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition text-start"
              placeholder="you@example.com"
              maxLength={255}
              required
              disabled={submitting}
            />
            {errors.email && (
              <p className="mt-1.5 text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">نوع الرسالة</label>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(kindLabels) as Array<keyof typeof kindLabels>).map((k) => (
              <button
                key={k}
                type="button"
                onClick={() => setForm({ ...form, kind: k })}
                disabled={submitting}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                  form.kind === k
                    ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                    : "bg-background border-border hover:border-primary/50"
                }`}
              >
                {kindLabels[k]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            الرسالة
          </label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition resize-y min-h-[140px]"
            placeholder="اكتب رسالتك هنا..."
            maxLength={4000}
            required
            disabled={submitting}
          />
          <div className="mt-1.5 flex items-center justify-between">
            {errors.message ? (
              <p className="text-xs text-destructive flex items-center gap-1">
                <AlertCircle className="h-3 w-3" />
                {errors.message}
              </p>
            ) : (
              <span />
            )}
            <span className="text-xs text-muted-foreground">
              {form.message.length} / 4000
            </span>
          </div>
        </div>

        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-mint-gradient px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/20 transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                جارٍ الإرسال...
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                إرسال الرسالة
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
