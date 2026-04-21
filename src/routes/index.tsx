import { createFileRoute, Link } from "@tanstack/react-router";
import { tools, SITE } from "@/data/tools";

const HOME_TITLE = "PlumSpace | 24 أداة ويب عربية مجانية وجاهزة للاستخدام";
const HOME_DESC = "مجموعة من 24 أداة ويب عربية مجانية: مولّد QR، عدّ تنازلي، استطلاعات رأي، نماذج تواصل، رسوم بيانية، قوائم مطاعم، وأكثر. بدون تسجيل، بدون كود، تدعم RTL بالكامل.";
const HOME_KEYWORDS = "أدوات ويب عربية, مولد QR, عد تنازلي, نماذج تواصل, استطلاعات رأي, أدوات مجانية, أدوات موقع عربي, web tools Arabic, RTL widgets";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: HOME_TITLE },
      { name: "description", content: HOME_DESC },
      { name: "keywords", content: HOME_KEYWORDS },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:title", content: HOME_TITLE },
      { property: "og:description", content: HOME_DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE.url },
      { property: "og:locale", content: "ar_SA" },
      { property: "og:site_name", content: SITE.name },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: HOME_TITLE },
      { name: "twitter:description", content: HOME_DESC },
    ],
    links: [{ rel: "canonical", href: SITE.url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: SITE.name,
          url: SITE.url,
          inLanguage: "ar",
          description: HOME_DESC,
          potentialAction: {
            "@type": "SearchAction",
            target: `${SITE.url}/?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "أدوات PlumSpace",
          numberOfItems: tools.length,
          itemListElement: tools.map((t, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `${SITE.url}/tools/${t.slug}`,
            name: t.name,
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const categories = Array.from(new Set(tools.map((t) => t.category)));

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-16 md:pt-32 md:pb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-card/50 text-xs text-muted-foreground mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            ٢٤ أداة جاهزة وقابلة للتخصيص
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            أدوات صغيرة <br />
            <span className="text-mint-gradient">بنتائج كبيرة</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            مجموعة من ٢٤ أداة ويب عربية، خفيفة وأنيقة، تساعدك على بناء موقع أفضل في دقائق.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
            <a href="#tools" className="bg-mint-gradient text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-glow hover:opacity-90 transition">
              تصفّح الأدوات
            </a>
            <a href="#about" className="border border-border bg-card/50 px-6 py-3 rounded-xl hover:bg-card transition">
              تعرّف علينا
            </a>
          </div>
          <div className="mt-16 flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div><b className="text-foreground text-2xl">24</b><div>أداة</div></div>
            <div className="w-px h-10 bg-border"></div>
            <div><b className="text-foreground text-2xl">100%</b><div>عربي</div></div>
            <div className="w-px h-10 bg-border"></div>
            <div><b className="text-foreground text-2xl">∞</b><div>استخدام</div></div>
          </div>
        </div>
      </section>

      {/* TOOLS GRID */}
      <section id="tools" className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">جميع الأدوات</h2>
            <p className="text-muted-foreground mt-2">اختر الأداة التي تحتاجها واستخدمها فوراً.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <span key={c} className="text-xs px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              to="/tools/$slug"
              params={{ slug: tool.slug }}
              className="group relative bg-card border border-border rounded-2xl p-6 hover:border-primary/60 hover:shadow-glow transition-all overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-card-glow transition-opacity"></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                    {tool.icon}
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground border border-border px-2 py-1 rounded-full">
                    {tool.category}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                  {tool.name}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
                <div className="mt-4 text-xs text-primary font-semibold inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  جرّب الآن ←
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">من نحن</h2>
        <p className="text-muted-foreground text-lg leading-loose">
          نحن فريق صغير شغوف ببناء أدوات ويب صغيرة وذكية. نؤمن أن الأدوات البسيطة
          المُصمَّمة جيداً يمكن أن تُحدث فرقاً كبيراً في تجربة المستخدم وفي نتائج عملك.
        </p>
      </section>
    </div>
  );
}
