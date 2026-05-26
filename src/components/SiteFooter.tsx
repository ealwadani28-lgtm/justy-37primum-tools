import { Link } from "@tanstack/react-router";
import logo from "@/assets/justlator-logo.png";
import { VisitCounter } from "@/components/VisitCounter";

export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <img
            src={logo}
            alt="Justlator Technologies"
            className="h-20 w-auto object-contain mb-4 drop-shadow-[0_0_24px_rgba(80,160,255,0.3)]"
            loading="lazy"
            decoding="async"
          />
          <p className="text-muted-foreground leading-relaxed">
            مجموعة أدوات ويب عربية احترافية لتطوير موقعك بسرعة وأناقة.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3 text-foreground">روابط</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/" className="hover:text-primary">جميع الأدوات</Link></li>
            <li><Link to="/about" className="hover:text-primary">من نحن</Link></li>
            <li><Link to="/about" hash="contact" className="hover:text-primary">تواصل معنا</Link></li>
            <li><Link to="/privacy" className="hover:text-primary">سياسة الخصوصية</Link></li>
            <li><Link to="/terms" className="hover:text-primary">الشروط والأحكام</Link></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3 text-foreground">Justlator Technologies</div>
          <p className="text-muted-foreground">
            <a href="https://www.justlator.com" className="hover:text-primary">www.justlator.com</a>
          </p>
          <p className="text-muted-foreground mt-3">© {new Date().getFullYear()} Justlator Tools. جميع الحقوق محفوظة.</p>
          <div className="mt-4">
            <VisitCounter />
          </div>
        </div>
      </div>
    </footer>
  );
}
