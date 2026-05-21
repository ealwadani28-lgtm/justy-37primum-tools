import { Link } from "@tanstack/react-router";
import { tools } from "@/data/tools";

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
    </div>
  );
}
