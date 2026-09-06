import { Link } from "@tanstack/react-router";
import { Twitter } from "lucide-react";
import { VisitCounter } from "@/components/VisitCounter";
import { arNumber } from "@/lib/utils";
import logoAsset from "@/assets/justlator-emblem.png.asset.json";
const logo = logoAsset.url;

type Product = {
  name: string;
  href: string;
  status: "available" | "soon";
  note?: string;
};

const products: Product[] = [
  { name: "Justlator Tools", href: "https://www.justlator.com", status: "available", note: "متاح" },
  { name: "JustSecure — حصين", href: "#", status: "soon", note: "قريباً" },
  { name: "JustSyncFlow", href: "#", status: "soon", note: "قريباً" },
];

const domains = [
  { label: "www.justlator.com", href: "https://www.justlator.com" },
  { label: "www.justlator.tech", href: "https://www.justlator.tech" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/50 mt-24 overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_center,rgba(80,160,255,0.10),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Corporate Lockup — Parent Brand */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative mb-5">
            <div aria-hidden className="absolute inset-0 bg-primary/25 blur-3xl rounded-full scale-150" />
            <img
              src={logo}
              alt="Justlator Technologies"
              className="relative h-24 md:h-28 w-auto object-contain drop-shadow-[0_0_30px_rgba(80,160,255,0.4)]"
              loading="lazy"
              decoding="async"
            />
          </div>
          <p
            className="text-4xl md:text-5xl text-foreground font-bold tracking-[0.2em]"
            dir="ltr"
          >
            JUSTLATOR
          </p>
          <p
            className="mt-2 text-[11px] md:text-xs text-primary font-semibold tracking-[0.55em]"
            dir="ltr"
          >
            TECHNOLOGIES
          </p>

          <div className="mt-6 flex items-center gap-3 text-[10px] tracking-[0.45em] text-muted-foreground/70" dir="ltr">
            <span className="h-px w-10 bg-border" />
            <span>SIGNATURE</span>
            <span className="h-px w-10 bg-border" />
          </div>

          <p className="mt-6 text-sm md:text-base text-foreground/90 font-medium max-w-2xl">
            منتجات رقمية تُبنى بمبادئ العدل والإنصاف
          </p>
          <p className="mt-2 text-xs text-muted-foreground tracking-wide" dir="ltr">
            Independently built by a solo founder — part of the{" "}
            <span className="text-primary font-semibold">Justlator</span> family
          </p>

        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          {/* Products */}
          <div>
            <div className="font-semibold mb-5 text-foreground tracking-wide">منتجاتنا</div>
            <ul className="space-y-3">
              {products.map((p) => (
                <li key={p.name} className="flex items-center gap-2 flex-row-reverse justify-end">
                  {p.status === "available" ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-primary transition-colors"
                      dir="ltr"
                    >
                      {p.name}
                    </a>
                  ) : (
                    <span className="text-muted-foreground/80" dir="ltr">{p.name}</span>
                  )}
                  <span className="text-muted-foreground/50">—</span>
                  <span
                    className={
                      p.status === "available"
                        ? "text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30"
                        : "text-[10px] px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30"
                    }
                  >
                    {p.note}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-1.5">
              {domains.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary/90 hover:text-primary transition-colors text-xs"
                  dir="ltr"
                >
                  {d.label}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <div className="font-semibold mb-5 text-foreground tracking-wide">روابط</div>
            <ul className="space-y-3 text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">جميع الأدوات</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link to="/about" hash="contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link></li>
            </ul>
          </div>

          {/* About */}
          <div>
            <div className="font-semibold mb-5 text-foreground tracking-wide">عن المنصة</div>
            <p className="text-muted-foreground leading-relaxed">
              مجموعة أدوات ويب عربية احترافية لتطوير موقعك بسرعة وأناقة.
            </p>
            <div className="mt-6">
              <VisitCounter />
            </div>
            <div className="mt-5">
              <div className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/70 mb-2">
                تواصل
              </div>
              <a
                href="https://x.com/justlator"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                dir="ltr"
              >
                <Twitter className="w-4 h-4" />
                <span>@justlator</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>صُنع بإتقان في المملكة العربية السعودية</p>
          <p>© {arNumber(new Date().getFullYear())} Justlator — جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
