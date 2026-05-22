import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-mint-gradient">404</h1>
        <h2 className="mt-4 text-xl font-semibold">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-mint-gradient px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Justlator Tools — مجموعة أدوات الويب العربية" },
      { name: "description", content: "لكل مهتم بالتقنية والبناء اونلاين - هنا كنز معرفي يحتوي على + 30 أداة ويب عربية احترافية جاهزة للاستخدام: ذكاء صناعي ، تسويق ، تصميم، تحليلات، نماذج ، وأكثر" },
      { property: "og:title", content: "Justlator Tools — مجموعة أدوات الويب العربية" },
      { property: "og:description", content: "لكل مهتم بالتقنية والبناء اونلاين - هنا كنز معرفي يحتوي على + 30 أداة ويب عربية احترافية جاهزة للاستخدام: ذكاء صناعي ، تسويق ، تصميم، تحليلات، نماذج ، وأكثر" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/justlator-logo.png" },
      { name: "twitter:image", content: "/justlator-logo.png" },
      { name: "twitter:title", content: "Justlator Tools — مجموعة أدوات الويب العربية" },
      { name: "twitter:description", content: "لكل مهتم بالتقنية والبناء اونلاين - هنا كنز معرفي يحتوي على + 30 أداة ويب عربية احترافية جاهزة للاستخدام: ذكاء صناعي ، تسويق ، تصميم، تحليلات، نماذج ، وأكثر" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/justlator-logo.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

const themeInitScript = `(function(){try{var t=localStorage.getItem('justlator-theme');if(t!=='light'&&t!=='dark')t='dark';document.documentElement.classList.add(t);document.documentElement.style.colorScheme=t;}catch(e){document.documentElement.classList.add('dark');}})();`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
