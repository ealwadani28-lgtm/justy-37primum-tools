import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Facebook, Send, Youtube } from "lucide-react";
import logo from "@/assets/justlator-logo.png";
import { VisitCounter } from "@/components/VisitCounter";
import { arNumber } from "@/lib/utils";

const socials = [
  { icon: Instagram, href: "https://instagram.com/justlator", label: "Instagram" },
  { icon: Twitter, href: "https://x.com/justlator", label: "X" },
  { icon: Facebook, href: "https://facebook.com/justlator", label: "Facebook" },
  { icon: Send, href: "https://t.me/justlator", label: "Telegram" },
  { icon: Youtube, href: "https://youtube.com/@justlator", label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/50 mt-24 overflow-hidden">
      {/* Ambient glow + grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_center,rgba(80,160,255,0.12),transparent_70%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        {/* Corporate Lockup */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 bg-primary/25 blur-3xl rounded-full scale-150"
            />
            <img
              src={logo}
              alt="Justlator Technologies"
              className="relative h-32 md:h-40 w-auto object-contain drop-shadow-[0_0_30px_rgba(80,160,255,0.4)]"
              loading="eager"
              decoding="sync"
            />
          </div>

          <div className="mt-5 space-y-1.5">
            <p
              className="text-3xl md:text-4xl text-foreground font-bold tracking-[0.18em]"
              dir="ltr"
            >
              JUSTLATOR
            </p>
            <p
              className="text-[11px] md:text-xs text-primary font-semibold tracking-[0.5em]"
              dir="ltr"
            >
              TECHNOLOGIES
            </p>
          </div>

          <div className="mt-7 space-y-1">
            <p className="text-sm md:text-base text-foreground/90 font-medium">
              أحد منتجات شركة مبدأ العدالة للتقنية
            </p>
            <p
              className="text-xs text-muted-foreground tracking-wider"
              dir="ltr"
            >
              A <span className="text-primary font-semibold">Justlator Technologies</span> Product
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-12" />

        {/* Columns + Socials */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-sm">
          <div>
            <div className="font-semibold mb-4 text-foreground tracking-wide">شركة Justlator</div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link to="/" className="hover:text-primary transition-colors">الأدوات والخدمات</Link></li>
              <li><Link to="/about" hash="media" className="hover:text-primary transition-colors">الملف الإعلامي</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-4 text-foreground tracking-wide">قانوني</div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li><Link to="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/privacy" hash="cookies" className="hover:text-primary transition-colors">سياسة الكوكيز</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-4 text-foreground tracking-wide">دعم</div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li><Link to="/about" hash="contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
              <li><Link to="/about" hash="help" className="hover:text-primary transition-colors">مركز المساعدة</Link></li>
              <li><Link to="/about" hash="faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</Link></li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1 md:justify-self-end">
            <div className="font-semibold mb-4 text-foreground tracking-wide">تابعنا</div>
            <div className="flex items-center gap-2.5">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group relative h-10 w-10 rounded-xl border border-border/60 bg-card/40 backdrop-blur flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/10 transition-all"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
            <div className="mt-6">
              <VisitCounter />
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {arNumber(new Date().getFullYear())} Justlator Technologies — جميع الحقوق محفوظة.</p>
          <p className="tracking-wider opacity-70">صُنع بإتقان في المملكة العربية السعودية</p>
        </div>
      </div>
    </footer>
  );
}
