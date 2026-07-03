import { createFileRoute, notFound } from "@tanstack/react-router";
import { tools, SITE } from "@/data/tools";
import { ToolLayout } from "@/components/ToolLayout";
import { toolRegistry } from "@/tools/registry";
import { ToolErrorBoundary } from "@/components/ToolErrorBoundary";

export const Route = createFileRoute("/tools/$slug")({
  component: ToolPage,
  // نلقي notFound() في اللودر حتى ترجع الاستجابة 404 حقيقي بدل 200-مع-noindex.
  // Google كان يبلّغ عن هذه الصفحات كـ "Excluded by 'noindex' tag"؛ الآن سيراها كـ 404 عادي.
  loader: ({ params }) => {
    const t = tools.find((x) => x.slug === params.slug);
    if (!t) throw notFound();
    return { tool: t };
  },
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto p-12 text-center">
      <h1 className="text-3xl font-bold">الأداة غير موجودة</h1>
    </div>
  ),
  head: ({ params, loaderData }) => {
    const t = loaderData?.tool ?? tools.find((x) => x.slug === params.slug);
    if (!t) {
      return {
        meta: [
          { title: "الأداة غير موجودة | Justlator Tools" },
          { name: "robots", content: "noindex, follow" },
        ],
      };
    }

    const url = `${SITE.url}/tools/${t.slug}`;
    return {
      meta: [
        { title: t.seoTitle },
        { name: "description", content: t.seoDescription },
        { name: "keywords", content: t.keywords.join(", ") },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:title", content: t.seoTitle },
        { property: "og:description", content: t.seoDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { property: "og:locale", content: "ar_SA" },
        { property: "og:site_name", content: SITE.name },
        { property: "article:section", content: t.category },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: t.seoTitle },
        { name: "twitter:description", content: t.seoDescription },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: t.name,
            description: t.seoDescription,
            url,
            applicationCategory: "WebApplication",
            operatingSystem: "Any",
            inLanguage: "ar",
            isAccessibleForFree: true,
            offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
            keywords: t.keywords.join(", "),
            featureList: t.useCases?.join(" • "),
            audience: t.targetAudience
              ? { "@type": "Audience", audienceType: t.targetAudience.join(", ") }
              : undefined,
            publisher: { "@type": "Organization", name: SITE.name, url: SITE.url },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "الرئيسية", item: SITE.url },
              { "@type": "ListItem", position: 2, name: t.category, item: SITE.url },
              { "@type": "ListItem", position: 3, name: t.name, item: url },
            ],
          }),
        },
        ...(t.importance && t.importance.length
          ? [
              {
                type: "application/ld+json" as const,
                children: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: [
                    {
                      "@type": "Question",
                      name: `ما هي أداة ${t.name}؟`,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: t.definition || t.seoDescription,
                      },
                    },
                    {
                      "@type": "Question",
                      name: `لماذا أستخدم ${t.name}؟`,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: t.importance.join(" "),
                      },
                    },
                    ...(t.useCases && t.useCases.length
                      ? [
                          {
                            "@type": "Question",
                            name: `أمثلة على استخدام ${t.name}؟`,
                            acceptedAnswer: {
                              "@type": "Answer",
                              text: t.useCases.join(" — "),
                            },
                          },
                        ]
                      : []),
                    {
                      "@type": "Question",
                      name: `هل ${t.name} مجانية؟`,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: `نعم، ${t.name} مجانية بالكامل ضمن منصّة ${SITE.name} — تعمل من المتصفح بدون تسجيل أو تثبيت.`,
                      },
                    },
                  ],
                }),
              },
            ]
          : []),
      ],
    };
  },
});

function ToolPage() {
  const { slug } = Route.useParams();
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) throw notFound();
  const Component = toolRegistry[slug];

  return (
    <ToolLayout slug={slug} title={tool.name} description={tool.description}>
      {Component ? (
        <ToolErrorBoundary toolName={tool.name}>
          <Component />
        </ToolErrorBoundary>
      ) : (
        <div className="text-muted-foreground">قريباً...</div>
      )}
    </ToolLayout>
  );
}
