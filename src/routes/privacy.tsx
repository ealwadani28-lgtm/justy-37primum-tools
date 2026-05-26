import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/data/tools";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => {
    const url = `${SITE.url}/privacy`;
    const title = `سياسة الخصوصية | ${SITE.name}`;
    const description = `سياسة الخصوصية لمنصة ${SITE.name} — كيف نتعامل مع بياناتك، الكوكيز، وإعلانات Google AdSense.`;
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

function PrivacyPage() {
  const lastUpdated = "26 مايو 2026";
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 prose-content">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2 mb-8">
        <span>→</span> العودة للصفحة الرئيسية
      </Link>

      <header className="mb-10">
        <p className="text-primary text-sm font-medium mb-3">سياسة الخصوصية</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">سياسة الخصوصية</h1>
        <p className="text-sm text-muted-foreground">آخر تحديث: {lastUpdated}</p>
      </header>

      <div className="space-y-8 text-base leading-relaxed text-foreground/90">
        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">مقدّمة</h2>
          <p>
            خصوصيتك مهمة لنا في <strong>{SITE.name}</strong>. هذه الوثيقة توضّح ما البيانات التي نجمعها،
            كيف نستخدمها، ومع من نشاركها عند استخدامك لموقعنا <a href={SITE.url} className="text-primary hover:underline">{SITE.url}</a> وأدواته.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">البيانات التي نجمعها</h2>
          <ul className="list-disc pr-5 space-y-2">
            <li><strong>بيانات الاستخدام:</strong> صفحات تزورها، الأداة التي تستخدمها، الوقت المستغرَق — لتحسين تجربتك.</li>
            <li><strong>بيانات تقنية:</strong> نوع المتصفح، نظام التشغيل، عنوان IP المختصر، الموقع الجغرافي التقريبي (دولة فقط).</li>
            <li><strong>الكوكيز (Cookies):</strong> ملفات صغيرة لحفظ تفضيلاتك (مثل الوضع الليلي) وتشغيل الإعلانات.</li>
            <li><strong>المدخلات داخل الأدوات:</strong> النصوص أو البيانات التي تُدخلها داخل الأدوات تُعالَج في متصفحك ولا تُرسَل لخوادمنا إلا إذا تطلّبت الأداة ذلك صراحةً.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">كيف نستخدم البيانات</h2>
          <ul className="list-disc pr-5 space-y-2">
            <li>تشغيل الموقع وأدواته وتحسين الأداء.</li>
            <li>تحليل سلوك الزوار لتطوير محتوى أفضل.</li>
            <li>عرض إعلانات مناسبة عبر شركاء معتمدين.</li>
            <li>الاستجابة لاستفساراتك عند تواصلك معنا.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">Google AdSense والإعلانات</h2>
          <p className="mb-3">
            نستخدم <strong>Google AdSense</strong> لعرض الإعلانات على الموقع. Google ومزوّدو الإعلانات الخارجيون يستخدمون كوكيز لعرض إعلانات بناءً على زياراتك السابقة لموقعنا أو لمواقع أخرى.
          </p>
          <ul className="list-disc pr-5 space-y-2">
            <li>تستخدم Google كوكي <em>DART</em> لعرض إعلانات لمستخدمي موقعنا بناءً على زياراتهم.</li>
            <li>يمكنك تعطيل الإعلانات المخصّصة من خلال زيارة <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">إعدادات إعلانات Google</a>.</li>
            <li>للمزيد عن سياسات Google: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">policies.google.com/technologies/ads</a>.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">التحليلات</h2>
          <p>
            قد نستخدم خدمات تحليلية (مثل Google Analytics) لفهم كيفية استخدام الزوار للموقع. هذه الخدمات قد تجمع بيانات مجهولة الهوية حول جلستك.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">حقوقك</h2>
          <ul className="list-disc pr-5 space-y-2">
            <li>الوصول إلى بياناتك أو طلب حذفها.</li>
            <li>إيقاف الكوكيز من إعدادات متصفحك في أي وقت.</li>
            <li>عدم قبول الإعلانات المخصّصة عبر روابط Google أعلاه.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">حماية الأطفال</h2>
          <p>
            خدماتنا غير موجَّهة لمن هم دون الـ 13 سنة. لا نجمع عن قصد بيانات شخصية من الأطفال.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">التعديلات على هذه السياسة</h2>
          <p>
            قد نُحدّث هذه السياسة من وقت لآخر. التغييرات تنشر على هذه الصفحة مع تحديث تاريخ "آخر تحديث" أعلاه.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-3 text-foreground">التواصل معنا</h2>
          <p>
            لأي استفسار يخص الخصوصية، تواصل معنا عبر صفحة <Link to="/about" hash="contact" className="text-primary hover:underline">من نحن</Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
