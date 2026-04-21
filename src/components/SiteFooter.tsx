import logo from "@/assets/justlator-logo.png";

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
            مجموعة أدوات صغيرة وقوية لتطوير موقعك بسرعة وأناقة.
          </p>
        </div>
        <div>
          <div className="font-semibold mb-3 text-foreground">روابط</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#tools" className="hover:text-primary">جميع الأدوات</a></li>
            <li><a href="#about" className="hover:text-primary">من نحن</a></li>
            <li><a href="#contact" className="hover:text-primary">تواصل معنا</a></li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-3 text-foreground">Justlator Technologies</div>
          <p className="text-muted-foreground">
            <a href="https://www.justlator.com" className="hover:text-primary">www.justlator.com</a>
          </p>
          <p className="text-muted-foreground mt-3">© {new Date().getFullYear()} Justlator Tools. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
