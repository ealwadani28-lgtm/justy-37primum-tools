import { Link } from "@tanstack/react-router";
import logo from "@/assets/justlator-logo.png";


export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Justlator Tools — الرئيسية">
          <img
            src={logo}
            alt="Justlator Technologies"
            className="h-14 w-auto object-contain group-hover:scale-105 transition-transform drop-shadow-[0_0_18px_rgba(80,160,255,0.35)]"
            loading="eager"
            decoding="async"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
          <a href="#tools" className="hover:text-foreground transition-colors">الأدوات</a>
          <a href="#about" className="hover:text-foreground transition-colors">من نحن</a>
        </nav>

        <div className="flex items-center gap-3">
          {/* ThemeToggle renders here via __root.tsx */}
        </div>
      </div>
    </header>
  );
}
