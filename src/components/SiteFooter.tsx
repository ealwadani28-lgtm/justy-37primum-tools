import { Link } from "@tanstack/react-router";
import monogramAsset from "@/assets/justlator-monogram-gold.png.asset.json";
import { VisitCounter } from "@/components/VisitCounter";
import { arNumber } from "@/lib/utils";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-border/50 mt-24 overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(ellipse_at_center,rgba(80,160,255,0.14),transparent_70%)]"
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

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* Corporate Lockup: J-Monogram + Wordmark + Bilingual byline */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="relative">
            <div
              aria-hidden
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.45),transparent_70%)] blur-3xl rounded-full scale-150"
            />
            <img
              src={monogramAsset.url}
              alt="Justlator Technologies"
              className="relative h-28 md:h-32 w-auto object-contain drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]"
              loading="eager"
              decoding="sync"
            />
          </div>

          <div className="mt-6 space-y-1.5">
            <p
              className="text-2xl md:text-3xl text-foreground font-bold tracking-[0.15em]"
              dir="ltr"
            >
              JUSTLATOR
            </p>
            <p
              className="text-[10px] md:text-xs text-primary font-semibold tracking-[0.45em]"
              dir="ltr"
            >
              TECHNOLOGIES
            </p>
          </div>

          <div className="mt-7 flex items-center gap-3 w-full max-w-md">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-[10px] text-muted-foreground/60 tracking-[0.3em] uppercase">
              Signature
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
          </div>

          <div className="mt-5 space-y-1">
            <p className="text-sm md:text-base text-foreground/90 font-medium">
              شركة مبدأ العدالة للتقنية — نبني منتجات رقمية بمبادئ العدل والإنصاف
            </p>
            <p
              className="text-xs text-muted-foreground tracking-wider"
              dir="ltr"
            >
              A <span className="text-primary font-semibold">Justlator Technologies</span> product family
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
            <div className="font-semibold mb-4 text-foreground">منتجاتنا</div>
            <ul className="space-y-2.5 text-muted-foreground">
              <li>
                <Link to="/" className="hover:text-primary transition-colors">
                  Justlator Tools <span className="text-xs text-primary/80">— متاح</span>
                </Link>
              </li>
              <li className="flex items-center gap-2">
                <span>JustSecure — حصين</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">قريباً</span>
              </li>
            </ul>
            <a
              href="https://www.justlator.com"
              className="inline-block mt-5 text-primary hover:underline text-sm"
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
