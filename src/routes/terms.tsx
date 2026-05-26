import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/data/tools";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => {
    const url = `${SITE.url}/terms`;
    const title = `الشروط والأحكام | ${SITE.name}`;
    const description = `شروط استخدام منصة ${SITE.name} وأدواتها — حقوق المستخدم، حدود المسؤولية، والملكية الفكرية.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ar_SA" },
        { property: "og:site_name", content: SITE.name },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
});

function TermsPage() {
  const lastUpdated = "26 مايو 2026";
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2 mb-8">
        <span>→</span> العودة للصفحة الرئيسية
      </Link>

      <header className="mb-10">
        <p className="text-primary text-sm font-medium mb-3">الشروط والأحكام</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">شروط الاستخدام</h1>
        <p className="text-sm text-muted-foreground">آخر تحديث: {lastUpdated}</p>
      </header>

      <div className="space-y-8 text-base leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">١. قبول الشروط</h2>
          <p>
            باستخدامك لموقع <strong>{SITE.name}</strong> ({SITE.url}) فأنت توافق على هذه الشروط. إذا لم توافق عليها، يرجى عدم استخدام الموقع.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">٢. وصف الخدمة</h2>
          <p>
            يوفّر {SITE.name} مجموعة أدوات ويب عربية مجانية يستطيع المستخدم تشغيلها مباشرةً من المتصفح بدون تسجيل في أغلب الحالات.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">٣. الاستخدام المسموح</h2>
          <ul className="list-disc pr-5 space-y-2">
            <li>الاستخدام الشخصي والتجاري لمخرجات الأدوات مسموح.</li>
            <li>يُمنع استخدام الموقع لأي نشاط غير قانوني أو ضار.</li>
            <li>يُمنع محاولة اختراق الموقع أو إعاقة عمله أو الوصول غير المصرّح به.</li>
            <li>يُمنع إساءة الاستخدام كإرسال طلبات آلية ضخمة (سكرابينج).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">٤. الملكية الفكرية</h2>
          <p>
            جميع حقوق الموقع وتصميمه ومحتواه محفوظة لـ {SITE.name}. تستطيع استخدام مخرجات الأدوات (كرموز QR التي تنشئها، أو النصوص التي تحوّلها) بحرية. لا يحقّ نسخ كود الموقع أو تصميمه أو إعادة نشره.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">٥. حدود المسؤولية</h2>
          <p>
            الأدوات تُقدَّم "كما هي" بدون أي ضمانات صريحة أو ضمنية. لا نتحمّل المسؤولية عن:
          </p>
          <ul className="list-disc pr-5 space-y-2 mt-2">
            <li>أي خسارة بيانات أو ضرر ناتج عن استخدام الأدوات.</li>
            <li>انقطاع الخدمة المؤقّت لأي سبب تقني.</li>
            <li>دقة أو ملاءمة مخرجات أدوات الذكاء الاصطناعي لقرارات حسّاسة (طبية، قانونية، مالية).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">٦. خدمات الطرف الثالث</h2>
          <p>
            قد يحتوي الموقع على إعلانات Google AdSense وروابط لمواقع خارجية. نحن غير مسؤولين عن محتوى أو سياسات أي طرف ثالث. راجع <Link to="/privacy" className="text-primary hover:underline">سياسة الخصوصية</Link> لتفاصيل أكثر.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">٧. تعديل الخدمة</h2>
          <p>
            نحتفظ بحقّ تعديل أو إيقاف أي أداة أو ميزة في أي وقت بدون إشعار مسبق.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">٨. تعديل الشروط</h2>
          <p>
            قد تُحدَّث هذه الشروط من وقت لآخر. استمرارك في استخدام الموقع بعد التحديث يعني موافقتك على النسخة الجديدة.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">٩. التواصل</h2>
          <p>
            للاستفسار، تواصل عبر صفحة <Link to="/about" hash="contact" className="text-primary hover:underline">من نحن</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
