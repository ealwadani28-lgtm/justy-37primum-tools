import { Link } from "@tanstack/react-router";
import logo from "@/assets/justlator-logo.png";
import { VisitCounter } from "@/components/VisitCounter";
import { arNumber } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/50 mt-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_at_center,rgba(80,160,255,0.12),transparent_70%)]"
      />

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* Corporate emblem + bilingual byline */}
        <div className="flex flex-col items-center text-center mb-12">
          <img
            src={logo}
            alt="Justlator Technologies"
            className="h-28 md:h-32 w-auto object-contain drop-shadow-[0_0_40px_rgba(80,160,255,0.35)]"
            loading="lazy"
            decoding="async"
          />
          <div className="mt-5 space-y-2">
            <p className="text-xl md:text-2xl text-foreground font-bold tracking-wide" dir="ltr">
              Justlator <span className="text-primary">Technologies</span>
            </p>
            <p className="text-sm text-muted-foreground tracking-wide">
              شركة مبدأ العدالة للتقنية — نبني منتجات رقمية بمبادئ العدل والإنصاف.
            </p>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-10" />

        {/* Columns */}
        <div className="grid md:grid-cols-3 gap-8 text-sm">
          <div>
            <div className="font-semibold mb-4 text-foreground">عن المنصة</div>
            <p className="text-muted-foreground leading-relaxed">
              مجموعة أدوات ويب عربية احترافية لتطوير موقعك بسرعة وأناقة.
            </p>
            <div className="mt-5">
              <VisitCounter />
            </div>
          </div>

          <div>
            <div className="font-semibold mb-4 text-foreground">روابط</div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">جميع الأدوات</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">من نحن</Link></li>
              <li><Link to="/about" hash="contact" className="hover:text-primary transition-colors">تواصل معنا</Link></li>
              <li><Link to="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</Link></li>
              <li><Link to="/terms" className="hover:text-primary transition-colors">الشروط والأحكام</Link></li>
            </ul>
          </div>

          <div>
            <div className="font-semibold mb-4 text-foreground">الشركة الأم</div>
            <p className="text-muted-foreground leading-relaxed mb-2">
              شركة مبدأ العدالة للتقنية — نبني منتجات رقمية بمبادئ العدل والإنصاف.
            </p>
            <a
              href="https://www.justlator.com"
              className="inline-block mt-2 text-primary hover:underline"
              dir="ltr"
            >
              www.justlator.com
            </a>
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
