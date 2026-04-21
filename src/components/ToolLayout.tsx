import { Link } from "@tanstack/react-router";
import { tools, SITE } from "@/data/tools";

export function ToolLayout({
  slug,
  title,
  description,
  children,
}: {
  slug: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const idx = tools.findIndex((t) => t.slug === slug);
  const tool = tools[idx];
  const toolUrl = `${SITE.url}/tools/${slug}`;
  const today = new Date().toISOString().slice(0, 10);
  const robotsSnippet = `User-agent: *\nAllow: /tools/${slug}\n\nSitemap: ${SITE.url}/sitemap.xml`;
  const sitemapSnippet = `<url>\n  <loc>${toolUrl}</loc>\n  <lastmod>${today}</lastmod>\n  <changefreq>monthly</changefreq>\n  <priority>0.8</priority>\n</url>`;

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <Link to="/" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2 mb-8">
        <span>→</span> العودة لجميع الأدوات
      </Link>
      <div className="mb-10">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-card-glow border border-border flex items-center justify-center text-3xl">
            {tool?.icon}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h1>
            <p className="text-muted-foreground mt-1">{description}</p>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-card-soft">{children}</div>

      <section
        className="mt-10 bg-card/50 border border-border rounded-3xl p-6 md:p-8"
        aria-labelledby="seo-preview-heading"
      >
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          <h2 id="seo-preview-heading" className="text-lg font-semibold">
            معاينة فهرسة محركات البحث لهذه الأداة
          </h2>
          <div className="flex gap-2 text-xs">
            <a
              href={`${SITE.url}/robots.txt`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              عرض robots.txt الكامل ↗
            </a>
            <a
              href={`${SITE.url}/sitemap.xml`}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
            >
              عرض sitemap.xml الكامل ↗
            </a>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          هذه هي البيانات التي تراها محركات البحث (مثل Google) عن صفحة{" "}
          <span className="text-foreground font-medium">{title}</span>، وتساعد على فهرستها بشكل صحيح باللغة العربية.
        </p>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">robots.txt</div>
            <pre
              dir="ltr"
              className="text-xs bg-background border border-border rounded-xl p-4 overflow-auto whitespace-pre font-mono leading-relaxed"
            >
              {robotsSnippet}
            </pre>
          </div>
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
              إدخال sitemap.xml لهذه الأداة
            </div>
            <pre
              dir="ltr"
              className="text-xs bg-background border border-border rounded-xl p-4 overflow-auto whitespace-pre font-mono leading-relaxed"
            >
              {sitemapSnippet}
            </pre>
          </div>
        </div>
        <div className="mt-4 text-xs text-muted-foreground">
          الرابط القانوني (canonical):{" "}
          <a
            href={toolUrl}
            target="_blank"
            rel="noreferrer"
            className="text-primary hover:underline"
            dir="ltr"
          >
            {toolUrl}
          </a>
        </div>
      </section>
    </div>
  );
}
