import { createFileRoute, Link } from "@tanstack/react-router";
import { tools, SITE } from "@/data/tools";
import { ToolPreview } from "@/components/ToolPreview";
import { PdfShowcase } from "@/components/showcases/PdfShowcase";
import { VideoShowcase } from "@/components/showcases/VideoShowcase";

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
  const featuredSlugs = ["whatsapp", "qr-generator", "pricing", "testimonials"];
  const featured = featuredSlugs
    .map((s) => tools.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <div>
      {/* HERO — Luxe mint with gold accents */}
      <section className="relative overflow-hidden">
        {/* Layered ambient backgrounds */}
        <div className="absolute inset-0 bg-luxe" aria-hidden />
        <div
          className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-30 blur-3xl animate-float-slow"
          style={{ background: "radial-gradient(circle, oklch(0.82 0.13 85 / 0.5), transparent 70%)" }}
          aria-hidden
        />
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-20 blur-3xl animate-float-slow"
          style={{ background: "radial-gradient(circle, oklch(0.78 0.14 175 / 0.7), transparent 70%)", animationDelay: "3s" }}
          aria-hidden
        />

        {/* Floating gold particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
          {[
            { top: "15%", left: "10%", size: 6, delay: "0s" },
            { top: "30%", left: "85%", size: 4, delay: "1s" },
            { top: "65%", left: "12%", size: 5, delay: "2s" },
            { top: "20%", left: "70%", size: 3, delay: "1.5s" },
            { top: "75%", left: "80%", size: 6, delay: "0.5s" },
            { top: "50%", left: "5%", size: 3, delay: "2.5s" },
          ].map((p, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-float-slow"
              style={{
                top: p.top,
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size}px`,
                background: "var(--gradient-gold)",
                boxShadow: "0 0 12px oklch(0.82 0.13 85 / 0.6)",
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-20 md:pt-32 md:pb-28 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[oklch(0.82_0.13_85_/_0.4)] bg-card/50 backdrop-blur-sm text-xs text-muted-foreground mb-6 shadow-[0_0_30px_-5px_oklch(0.82_0.13_85_/_0.3)]">
            <span className="w-2 h-2 rounded-full bg-gold-gradient animate-pulse" />
            ٢٤ أداة مصمّمة باحتراف · جاهزة للاستخدام
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
            أدوات صغيرة <br />
            <span className="text-mint-gold-gradient">بنتائج كبيرة</span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            مجموعة من ٢٤ أداة ويب عربية، مصمّمة بأناقة، تساعدك على بناء موقع يليق بعملك في دقائق.
          </p>

          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#tools"
              className="relative group bg-mint-gold-gradient text-[oklch(0.18_0.02_200)] font-bold px-7 py-3.5 rounded-2xl shadow-gold-glow hover:scale-[1.03] transition-all overflow-hidden shimmer-gold"
            >
              <span className="relative z-10">تصفّح الأدوات ←</span>
            </a>
            <a
              href="#featured"
              className="border border-[oklch(0.82_0.13_85_/_0.35)] bg-card/40 backdrop-blur-sm px-7 py-3.5 rounded-2xl hover:bg-card/70 hover:border-[oklch(0.82_0.13_85_/_0.6)] transition"
            >
              الأدوات المختارة ✨
            </a>
          </div>

          {/* Hero showcase card — luxe glass with mint+gold */}
          <div className="mt-20 max-w-3xl mx-auto">
            <div className="relative rounded-[2rem] p-1 bg-mint-gold-gradient shadow-gold-glow">
              <div className="rounded-[1.85rem] bg-card/95 backdrop-blur-xl p-8 md:p-10 relative overflow-hidden shimmer-gold">
                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.82_0.13_85_/_0.6)] to-transparent" />
                <div className="grid grid-cols-3 gap-6 relative">
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-extrabold text-mint-gold-gradient">24</div>
                    <div className="text-xs text-muted-foreground mt-1">أداة احترافية</div>
                  </div>
                  <div className="text-center border-x border-[oklch(0.82_0.13_85_/_0.2)]">
                    <div className="text-4xl md:text-5xl font-extrabold text-mint-gold-gradient">100%</div>
                    <div className="text-xs text-muted-foreground mt-1">عربي · RTL</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl md:text-5xl font-extrabold text-mint-gold-gradient">∞</div>
                    <div className="text-xs text-muted-foreground mt-1">استخدام مجاني</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom gold hairline */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.82_0.13_85_/_0.5)] to-transparent" />
      </section>

      {/* SHOWCASES — معرض هوكات بصرية بتصاميم ستيتش */}
      <section id="featured" className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="text-center mb-12">
          <div className="inline-block text-[11px] uppercase tracking-[0.3em] text-gold-gradient font-bold mb-3">
            ★ المعرض الفاخر
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            تصاميم تبيع <span className="text-mint-gold-gradient">قبل ما تتكلم</span>
          </h2>
          <p className="text-muted-foreground mt-3">اضغط على أي تصميم لتجربة الأداة الفعلية مع التفاصيل التقنية.</p>
        </div>

        <div className="space-y-8">
          <Link
            to="/tools/$slug"
            params={{ slug: "pdf-viewer" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <PdfShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "video-banner" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <VideoShowcase />
          </Link>
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
