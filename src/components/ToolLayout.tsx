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

      <div className="bg-card border border-border rounded-3xl p-6 md:p-10 shadow-card-soft mb-10">
        {children}
      </div>

      {(tool?.definition || tool?.importance || tool?.useCases || tool?.targetAudience) && (
        <div className="grid gap-6 md:grid-cols-2">
          {tool?.definition && (
            <section className="md:col-span-2 bg-card/60 border border-border rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-primary">▍</span> عن الأداة
              </h2>
              <p className="text-muted-foreground leading-relaxed text-base">{tool.definition}</p>
            </section>
          )}

          {tool?.importance && tool.importance.length > 0 && (
            <section className="bg-card/60 border border-border rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">▍</span> لماذا هي مهمة؟
              </h2>
              <ul className="space-y-3">
                {tool.importance.map((point, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1 shrink-0">◆</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tool?.useCases && tool.useCases.length > 0 && (
            <section className="bg-card/60 border border-border rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">▍</span> أمثلة استخدام
              </h2>
              <ul className="space-y-2">
                {tool.useCases.map((uc, i) => (
                  <li key={i} className="flex gap-3 text-muted-foreground leading-relaxed">
                    <span className="text-primary mt-1 shrink-0">›</span>
                    <span>{uc}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tool?.targetAudience && tool.targetAudience.length > 0 && (
            <section className="md:col-span-2 bg-card/60 border border-border rounded-3xl p-6 md:p-8 backdrop-blur-sm">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-primary">▍</span> لمن هذه الأداة؟
              </h2>
              <div className="flex flex-wrap gap-2">
                {tool.targetAudience.map((a, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm text-foreground"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      )}

      {tool && (tool.definition || (tool.importance && tool.importance.length) || (tool.useCases && tool.useCases.length)) && (
        <section className="mt-10 bg-card border border-border rounded-3xl p-6 md:p-10 shadow-card-soft">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <span className="text-primary">▍</span> أسئلة شائعة عن {tool.name}
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg mb-2">ما هي أداة {tool.name}؟</h3>
              <p className="text-muted-foreground leading-relaxed">{tool.definition || tool.description}</p>
            </div>
            {tool.importance && tool.importance.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">لماذا أستخدم {tool.name}؟</h3>
                <p className="text-muted-foreground leading-relaxed">{tool.importance.join(" ")}</p>
              </div>
            )}
            {tool.useCases && tool.useCases.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">أمثلة على استخدام {tool.name}؟</h3>
                <p className="text-muted-foreground leading-relaxed">{tool.useCases.join(" — ")}</p>
              </div>
            )}
            <div>
              <h3 className="font-semibold text-lg mb-2">هل {tool.name} مجانية؟</h3>
              <p className="text-muted-foreground leading-relaxed">
                نعم، {tool.name} مجانية بالكامل ضمن منصّة Justlator Tools — تعمل من المتصفح بدون تسجيل أو تثبيت.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">هل تحتاج إلى حساب لاستخدام {tool.name}؟</h3>
              <p className="text-muted-foreground leading-relaxed">
                لا — افتح الأداة من المتصفح واستخدمها فوراً، لا حساب ولا بطاقة دفع.
              </p>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
