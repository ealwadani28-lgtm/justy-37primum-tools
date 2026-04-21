import { createFileRoute, notFound } from "@tanstack/react-router";
import { tools } from "@/data/tools";
import { ToolLayout } from "@/components/ToolLayout";
import { toolRegistry } from "@/tools/registry";

export const Route = createFileRoute("/tools/$slug")({
  component: ToolPage,
  notFoundComponent: () => (
    <div className="max-w-2xl mx-auto p-12 text-center">
      <h1 className="text-3xl font-bold">الأداة غير موجودة</h1>
    </div>
  ),
  head: ({ params }) => {
    const t = tools.find((x) => x.slug === params.slug);
    return {
      meta: [
        { title: t ? `${t.name} — PlumSpace` : "PlumSpace" },
        { name: "description", content: t?.description ?? "" },
        { property: "og:title", content: t ? `${t.name} — PlumSpace` : "PlumSpace" },
        { property: "og:description", content: t?.description ?? "" },
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
      {Component ? <Component /> : <div className="text-muted-foreground">قريباً...</div>}
    </ToolLayout>
  );
}
