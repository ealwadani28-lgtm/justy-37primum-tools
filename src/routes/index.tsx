import { createFileRoute, Link } from "@tanstack/react-router";
import { tools, SITE } from "@/data/tools";
import { ToolPreview } from "@/components/ToolPreview";
import {
  Megaphone, Palette, PenTool, Film, MousePointerClick,
  MessageSquare, ShieldCheck, BarChart3, Briefcase, Sparkles,
  LayoutGrid, SlidersHorizontal, ArrowLeft,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PdfShowcase } from "@/components/showcases/PdfShowcase";
import { VideoShowcase } from "@/components/showcases/VideoShowcase";
import { SecurityShowcase } from "@/components/showcases/SecurityShowcase";
import { SentimentShowcase } from "@/components/showcases/SentimentShowcase";
import { HeatmapShowcase } from "@/components/showcases/HeatmapShowcase";
import { WhatsappShowcase } from "@/components/showcases/WhatsappShowcase";
import { MarketingShowcase } from "@/components/showcases/MarketingShowcase";
import { LogisticsShowcase } from "@/components/showcases/LogisticsShowcase";
import { ProjectsShowcase } from "@/components/showcases/ProjectsShowcase";
import { PaymentsShowcase } from "@/components/showcases/PaymentsShowcase";
import { TalentShowcase } from "@/components/showcases/TalentShowcase";
import { CrmShowcase } from "@/components/showcases/CrmShowcase";
import { BloomShowcase } from "@/components/showcases/BloomShowcase";

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

type CatMeta = { Icon: LucideIcon; blurb: string; hue: string };

// Per-category color (oklch hue) — luminous PlumSpace palette
const CATEGORY_META: Record<string, CatMeta> = {
  "تسويق":  { Icon: Megaphone,          blurb: "حلول تسويقية ذكية لزيادة الوصول، تحسين الحملات، وتحليل أداء السوق بدقة متناهية.",       hue: "190" },
  "محتوى":  { Icon: PenTool,            blurb: "أتمتة كتابة المحتوى، التدقيق اللغوي، وتحسين محركات البحث باستخدام الذكاء الاصطناعي.",   hue: "155" },
  "عرض":    { Icon: Palette,            blurb: "أدوات إبداعية لتصميم الواجهات، الجرافيكس، وصناعة الهوية البصرية بلمسة مستقبلية.",        hue: "295" },
  "وسائط":  { Icon: Film,               blurb: "تعديل الفيديو، معالجة الصور، وتحرير الصوتيات بأدوات احترافية وسهلة الاستخدام.",         hue: "70"  },
  "تفاعل":  { Icon: MousePointerClick,  blurb: "عناصر تفاعلية لموقعك بأزرار متحركة وأدوات تواصل تزيد من تفاعل زوّارك.",                   hue: "10"  },
  "تواصل":  { Icon: MessageSquare,      blurb: "إدارة المحادثات، أتمتة الرسائل وربط فرق العمل بمنصات تواصل موحّدة وكفؤة.",              hue: "220" },
  "أمان":   { Icon: ShieldCheck,        blurb: "حماية موقعك من الاختراق، تأمين بيانات الزوّار، وفحص الثغرات الأمنية تلقائياً.",         hue: "15"  },
  "بيانات": { Icon: BarChart3,          blurb: "تحليلات ذكية ولوحات بيانات تفاعلية تساعدك على اتخاذ قرارات مبنية على أرقام دقيقة.",      hue: "175" },
  "أدوات":  { Icon: Sparkles,           blurb: "أدوات يومية سريعة ومتنوعة تختصر عليك الوقت في المهام المتكررة.",                          hue: "260" },
  "أعمال":  { Icon: Briefcase,          blurb: "إدارة عمليات الأعمال، الفرق والمشاريع بكفاءة عالية ولوحات تحكم شاملة.",                  hue: "85"  },
};

function catSlug(c: string) {
  return `cat-${encodeURIComponent(c)}`;
}

function Index() {
  const categories = Array.from(new Set(tools.map((t) => t.category)));
  const toolsByCategory = categories.map((c) => ({
    name: c,
    tools: tools.filter((t) => t.category === c),
  }));
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
              href="#categories"
              className="relative group bg-mint-gold-gradient text-[oklch(0.18_0.02_200)] font-bold px-7 py-3.5 rounded-2xl shadow-gold-glow hover:scale-[1.03] transition-all overflow-hidden shimmer-gold"
            >
              <span className="relative z-10">تصفّح حسب القائمة ←</span>
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
          <Link
            to="/tools/$slug"
            params={{ slug: "security-audit" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <SecurityShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "sentiment-ai" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <SentimentShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "heatmap" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <HeatmapShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "whatsapp" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <WhatsappShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "marketing-automation" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <MarketingShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "logistics" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <LogisticsShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "projects-kanban" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <ProjectsShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "payments-dashboard" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <PaymentsShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "talent-management" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <TalentShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "crm-pipeline" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <CrmShowcase />
          </Link>
          <Link
            to="/tools/$slug"
            params={{ slug: "bloom-analytics" }}
            className="block group transition-transform duration-500 hover:-translate-y-1"
          >
            <BloomShowcase />
          </Link>
        </div>
      </section>


      {/* CATEGORIES PORTAL — بوابة التصنيفات الفاخرة */}
      <section id="categories" className="relative max-w-7xl mx-auto px-6 py-20">
        {/* Header row */}
        <div className="flex items-start justify-between gap-6 mb-12 flex-wrap">
          {/* Filter chips (top-start in RTL) */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="ترتيب"
              className="w-11 h-11 rounded-2xl bg-card/70 backdrop-blur-md border border-[oklch(0.82_0.13_85_/_0.25)] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[oklch(0.82_0.13_85_/_0.6)] transition"
            >
              <SlidersHorizontal className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="تصفية"
              className="w-11 h-11 rounded-2xl bg-card/70 backdrop-blur-md border border-[oklch(0.82_0.13_85_/_0.25)] flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-[oklch(0.82_0.13_85_/_0.6)] transition"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <div className="text-right max-w-xl ms-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-mint-gold-gradient">
              جميع الأدوات
            </h2>
            <p className="text-muted-foreground mt-3 leading-relaxed text-sm md:text-base">
              بوابتك الذكية لاستكشاف الأدوات التقنية المتطورة. اختر الفئة المناسبة لمشروعك وابدأ رحلة الإبداع.
            </p>
          </div>
        </div>

        {/* Portal cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolsByCategory.map(({ name, tools: items }) => {
            const meta = CATEGORY_META[name] ?? { Icon: Sparkles, blurb: "", hue: "200" };
            const Icon = meta.Icon;
            const color = `oklch(0.78 0.16 ${meta.hue})`;
            const colorSoft = `oklch(0.78 0.16 ${meta.hue} / 0.18)`;
            const colorBorder = `oklch(0.78 0.16 ${meta.hue} / 0.35)`;
            const colorGlow = `oklch(0.78 0.16 ${meta.hue} / 0.55)`;
            return (
              <a
                key={name}
                href={`#${catSlug(name)}`}
                className="group relative rounded-3xl p-7 min-h-[220px] overflow-hidden bg-card/40 backdrop-blur-xl border transition-all duration-500 hover:-translate-y-1"
                style={{
                  borderColor: colorBorder,
                  boxShadow: `inset 0 1px 0 oklch(1 0 0 / 0.04), 0 0 0 1px ${colorBorder}`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `inset 0 1px 0 oklch(1 0 0 / 0.06), 0 0 0 1px ${color}, 0 24px 60px -20px ${colorGlow}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `inset 0 1px 0 oklch(1 0 0 / 0.04), 0 0 0 1px ${colorBorder}`;
                }}
              >
                {/* Ambient corner glow */}
                <div
                  className="absolute -top-16 -start-16 w-56 h-56 rounded-full opacity-40 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-70"
                  style={{ background: `radial-gradient(circle, ${color}, transparent 65%)` }}
                  aria-hidden
                />

                {/* Glowing icon chip — top-end (visually top-left in RTL) */}
                <div className="absolute top-5 end-5">
                  <div
                    className="relative w-12 h-12 rounded-2xl flex items-center justify-center backdrop-blur-md border transition-transform duration-500 group-hover:scale-110"
                    style={{
                      background: colorSoft,
                      borderColor: colorBorder,
                      boxShadow: `0 0 24px -4px ${colorGlow}`,
                    }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} strokeWidth={2.25} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative mt-16">
                  <h3 className="text-2xl font-extrabold tracking-tight mb-2 text-foreground">
                    أدوات {name}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-5">
                    {meta.blurb}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 text-sm font-bold transition-all group-hover:gap-3"
                    style={{ color }}
                  >
                    استكشف الفئة
                    <ArrowLeft className="w-4 h-4" />
                    <span className="ms-2 text-[10px] font-medium opacity-70">
                      {items.length} أداة
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </section>


      {/* TOOLS GROUPED BY CATEGORY */}
      <section id="tools" className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">جميع الأدوات</h2>
          <p className="text-muted-foreground mt-2">مرتّبة حسب القوائم لسهولة العثور على ما تحتاج.</p>
        </div>

        {/* Sticky category nav */}
        <div className="sticky top-20 z-30 -mx-6 px-6 py-3 mb-10 bg-background/85 backdrop-blur-xl border-y border-border/40">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((c) => (
              <a
                key={c}
                href={`#${catSlug(c)}`}
                className="text-xs px-3 py-1.5 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground hover:border-[oklch(0.82_0.13_85_/_0.6)] hover:bg-card/80 transition"
              >
                {CATEGORY_META[c]?.icon} {c}
              </a>
            ))}
          </div>
        </div>

        <div className="space-y-16">
          {toolsByCategory.map(({ name, tools: items }) => {
            const meta = CATEGORY_META[name] ?? { icon: "📦", blurb: "" };
            return (
              <div key={name} id={catSlug(name)} className="scroll-mt-32">
                <div className="flex items-end justify-between mb-6 flex-wrap gap-3 border-b border-border/40 pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{meta.icon}</span>
                    <div>
                      <h3 className="text-2xl font-bold tracking-tight">{name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{meta.blurb}</p>
                    </div>
                  </div>
                  <span className="text-[11px] text-emerald-600 bg-emerald-500/10 border border-emerald-400/30 px-3 py-1 rounded-full font-bold">
                    {items.length} أدوات
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {items.map((tool) => (
                    <Link
                      key={tool.slug}
                      to="/tools/$slug"
                      params={{ slug: tool.slug }}
                      className="group relative rounded-3xl overflow-hidden border border-emerald-200/40 bg-gradient-to-br from-[#e8f7f1] via-[#dff3ea] to-[#cfeee1] hover:-translate-y-1 hover:shadow-[0_30px_60px_-20px_rgba(30,180,140,0.45)] transition-all duration-300"
                    >
                      <div className="relative h-44 overflow-hidden">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.9),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(167,243,208,0.6),transparent_55%)]" />
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 text-[10px] font-extrabold tracking-wide text-emerald-700/90 z-10">
                          Justlator<span className="text-emerald-500">·</span>
                        </div>
                        <div className="absolute inset-0 pt-8">
                          <ToolPreview slug={tool.slug} />
                        </div>
                      </div>

                      <div className="bg-card/95 backdrop-blur-sm border-t border-emerald-200/30 p-4">
                        <div className="flex items-start justify-between gap-3 mb-1">
                          <h4 className="text-base font-bold text-foreground group-hover:text-primary transition-colors">
                            {tool.name}
                          </h4>
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
              </div>
            );
          })}
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
