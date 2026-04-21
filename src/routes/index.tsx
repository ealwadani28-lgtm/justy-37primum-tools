import { createFileRoute, Link } from "@tanstack/react-router";
import { tools, SITE } from "@/data/tools";
import { ToolPreview } from "@/components/ToolPreview";

const HOME_TITLE = "Justlator Tools | 24 أداة ويب عربية مجانية وجاهزة للاستخدام";
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
          name: "أدوات Justlator Tools",
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.slug}
              to="/tools/$slug"
              params={{ slug: tool.slug }}
              className="group relative rounded-3xl overflow-hidden border border-emerald-200/40 bg-gradient-to-br from-[#e8f7f1] via-[#dff3ea] to-[#cfeee1] hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(30,180,140,0.45)] transition-all duration-300"
            >
              {/* Preview area (mockup) */}
              <div className="relative h-44 overflow-hidden">
                {/* Soft mesh background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(167,243,208,0.6),transparent_55%)]" />
                {/* Brand chip top-center */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold tracking-wide text-emerald-700/90 z-10">
                  Justlator<span className="text-emerald-500">·</span>
                </div>
                <div className="absolute inset-0 pt-8">
                  <ToolPreview slug={tool.slug} />
                </div>
              </div>

              {/* Card meta — dark band */}
              <div className="bg-card/95 backdrop-blur-sm border-t border-emerald-200/30 p-4">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <h3 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </h3>
                  <span className="shrink-0 text-[10px] text-emerald-300 bg-emerald-500/10 border border-emerald-400/30 px-2 py-0.5 rounded-full">
                    {tool.category}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                  {tool.description}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-primary opacity-70 group-hover:opacity-100 transition">
                    جرّب الآن ←
                  </span>
                  <span className="text-[10px] text-muted-foreground/60">مجاني</span>
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
