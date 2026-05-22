import { createFileRoute, Link } from "@tanstack/react-router";
import { tools, SITE } from "@/data/tools";
import { arNumber } from "@/lib/utils";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => {
    const url = `${SITE.url}/about`;
    const title = `من نحن | ${SITE.name} — منصة الأدوات العربية بالذكاء الاصطناعي`;
    const description = `${SITE.name} منصة عربية مجانية تضم ${arNumber(tools.length)} أداة ويب وذكاء اصطناعي (مولّد محتوى، مولّد صور، تحليل مشاعر، ومترجم) — تعمل من المتصفح بدون تسجيل أو تثبيت.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:locale", content: "ar_SA" },
        { property: "og:site_name", content: SITE.name },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: title,
            description,
            url,
            inLanguage: "ar",
            isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
            about: { "@type": "Organization", name: SITE.name, url: SITE.url },
          }),
        },
      ],
    };
  },
});

function AboutPage() {
  const categories = Array.from(new Set(tools.map((t) => t.category)));
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2 mb-8">
        <span>→</span> العودة للصفحة الرئيسية
      </Link>

      <header className="mb-12">
        <p className="text-primary text-sm font-medium mb-3">عن المنصة</p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-5 leading-tight">
          {SITE.name} — أدوات عربية بالذكاء الاصطناعي، مجانية بالكامل
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          منصّة عربية تجمع <span className="text-foreground font-semibold">{arNumber(tools.length)} أداة</span> ويب وذكاء اصطناعي في مكان واحد —
          تعمل مباشرة من المتصفح، بدون تسجيل، بدون تثبيت، وبدون أي تكلفة على المستخدم.
        </p>
      </header>

      <section className="bg-card border border-border rounded-3xl p-8 md:p-10 mb-8 shadow-card-soft">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">▍</span> ما الذي نقدّمه؟
        </h2>
        <p className="text-muted-foreground leading-relaxed mb-6">
          {SITE.name} ليست أداة واحدة، بل صندوق متكامل لمن يبني حضوره الرقمي بالعربية: من مولّدات الذكاء الاصطناعي للنصوص والصور،
          إلى أدوات تسويق، تحليلات، إدارة مشاريع، أمان، ودفع. كل أداة مصمَّمة لتُنجز مهمة محددة بسرعة وبدون احتكاك.
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <span key={c} className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm">
              {c}
            </span>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="bg-card/60 border border-border rounded-3xl p-7 backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-3">عربية أوّلاً</h3>
          <p className="text-muted-foreground leading-relaxed">
            كل واجهة ومحتوى وذكاء اصطناعي مُهيّأ للغة العربية بدقة — من اتجاه RTL إلى تنسيق الأرقام إلى استجابات النماذج اللغوية.
          </p>
        </div>
        <div className="bg-card/60 border border-border rounded-3xl p-7 backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-3">مجانية فعلاً</h3>
          <p className="text-muted-foreground leading-relaxed">
            لا اشتراك، لا حد استخدام مخفي، لا بطاقة دفع. الأدوات متاحة لأي رائد أعمال، مسوّق، طالب، أو مبدع عربي.
          </p>
        </div>
        <div className="bg-card/60 border border-border rounded-3xl p-7 backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-3">بدون تثبيت</h3>
          <p className="text-muted-foreground leading-relaxed">
            تعمل من المتصفح على أي جهاز — جوال، تابلت، لابتوب. افتح الرابط واستخدم الأداة فوراً.
          </p>
        </div>
        <div className="bg-card/60 border border-border rounded-3xl p-7 backdrop-blur-sm">
          <h3 className="text-lg font-bold mb-3">خصوصية أوّلاً</h3>
          <p className="text-muted-foreground leading-relaxed">
            معظم الأدوات تعمل محلياً في المتصفح. لا نخزّن مدخلاتك ولا نطلب حساباً للاستخدام.
          </p>
        </div>
      </section>

      <section className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-card-soft">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <span className="text-primary">▍</span> لمن صُمِّمت {SITE.name}؟
        </h2>
        <ul className="space-y-3 text-muted-foreground leading-relaxed">
          <li className="flex gap-3"><span className="text-primary mt-1">◆</span><span>رواد الأعمال والمتاجر الإلكترونية الذين يحتاجون أدوات سريعة بدون فريق تقني.</span></li>
          <li className="flex gap-3"><span className="text-primary mt-1">◆</span><span>المسوّقون وصنّاع المحتوى العربي الباحثون عن مولّدات ذكاء اصطناعي تفهم لغتهم.</span></li>
          <li className="flex gap-3"><span className="text-primary mt-1">◆</span><span>المصمّمون والمستقلّون الذين يريدون أدوات يومية في مكان واحد.</span></li>
          <li className="flex gap-3"><span className="text-primary mt-1">◆</span><span>الفرق الصغيرة التي تبحث عن بدائل عربية مجانية لأدوات SaaS مدفوعة.</span></li>
        </ul>
      </section>
    </div>
  );
}
