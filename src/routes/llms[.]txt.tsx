import { createFileRoute } from "@tanstack/react-router";
import { tools, SITE } from "@/data/tools";

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: async () => {
        const byCat = tools.reduce<Record<string, typeof tools>>((acc, t) => {
          (acc[t.category] ||= [] as any).push(t);
          return acc;
        }, {});

        const sections = Object.entries(byCat)
          .map(([cat, list]) => {
            const lines = list
              .map(
                (t) =>
                  `- [${t.name}](${SITE.url}/tools/${t.slug}): ${t.description}`
              )
              .join("\n");
            return `## ${cat}\n\n${lines}`;
          })
          .join("\n\n");

        const body = `# ${SITE.name}

> ${SITE.tagline} — مجموعة من ${tools.length} أداة ويب عربية مجانية وجاهزة للاستخدام، تدعم RTL بالكامل بدون تسجيل وبدون كود.

Justlator Tools منصّة عربية تقدّم أدوات ويب جاهزة للأفراد وأصحاب الأعمال والمسوّقين والمطوّرين: من توليد المحتوى والصور بالذكاء الاصطناعي، إلى أدوات التسويق، التصميم، التحليلات، الأمان، وإدارة الأعمال. كل أداة مجانية بالكامل، تعمل في المتصفح، وتدعم اللغة العربية واتجاه الكتابة من اليمين لليسار.

## الموقع

- [الصفحة الرئيسية](${SITE.url}/): فهرس كامل لجميع الأدوات مصنّف حسب القسم.
- [خريطة الموقع](${SITE.url}/sitemap.xml): قائمة XML بكل الصفحات للزحف الآلي.

${sections}

## Optional

- المشروع مفتوح للجمهور العربي عالمياً ولا يتطلب حساباً.
- جميع الأدوات تعمل من المتصفح مباشرة — لا تحميل ولا تثبيت.
- أدوات الذكاء الاصطناعي (مولّد المحتوى، مولّد الصور، تحليل المشاعر) مدعومة بنماذج Google Gemini و OpenAI عبر بوّابة موحّدة.
`;

        return new Response(body, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
} as any);
