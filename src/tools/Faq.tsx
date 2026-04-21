import { useState } from "react";
import { ActionBar } from "@/components/ActionBar";

const items = [
  { q: "كيف أبدأ باستخدام الأدوات؟", a: "اختر الأداة من الصفحة الرئيسية ثم استخدمها مباشرة. كل الأدوات جاهزة بدون تثبيت." },
  { q: "هل الأدوات مجانية؟", a: "نعم، جميع الأدوات هنا متاحة للاستخدام بدون قيود." },
  { q: "هل تدعم اللغة العربية بالكامل؟", a: "بالتأكيد — كل الأدوات مصممة من الأساس بالعربية ودعم RTL كامل." },
  { q: "هل يمكنني تخصيص الألوان والخطوط؟", a: "نعم، نظام التصميم بُني حول متغيّرات يمكن تعديلها من ملف واحد." },
  { q: "كيف أتواصل معكم؟", a: "عبر صفحة (تواصل معنا) في تذييل الموقع." },
];

const html = `<section dir="rtl" class="faq">\n${items
  .map((i) => `  <details>\n    <summary>${i.q}</summary>\n    <p>${i.a}</p>\n  </details>`)
  .join("\n")}\n</section>`;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {items.map((it, i) => (
          <div key={i} className="bg-secondary border border-border rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-right hover:bg-card transition"
            >
              <span className="font-semibold">{it.q}</span>
              <span className={`text-primary text-2xl transition-transform ${open === i ? "rotate-45" : ""}`}>+</span>
            </button>
            <div
              className={`grid transition-all duration-300 ${
                open === i ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-5 pt-0 text-muted-foreground leading-relaxed">{it.a}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ActionBar
        copyText={html}
        copyLabel="نسخ كود HTML"
        downloadText={{ content: html, filename: "faq.html", mime: "text/html" }}
        downloadLabel="تحميل HTML"
        share={{ title: "الأسئلة الشائعة" }}
      />
    </div>
  );
}
