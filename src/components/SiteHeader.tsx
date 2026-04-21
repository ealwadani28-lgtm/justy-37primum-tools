import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-xl bg-mint-gradient flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
            <svg viewBox="0 0 24 24" className="w-5 h-5 text-primary-foreground" fill="currentColor">
              <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.3L18 8v8l-6 3.7L6 16V8l6-3.7z"/>
            </svg>
          </div>
          <span className="font-bold text-lg tracking-tight">PlumSpace<span className="text-primary">.</span></span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">الرئيسية</Link>
          <a href="#tools" className="hover:text-foreground transition-colors">الأدوات</a>
          <a href="#about" className="hover:text-foreground transition-colors">من نحن</a>
        </nav>

        <a
          href="#tools"
          className="text-sm font-semibold bg-mint-gradient text-primary-foreground px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          ابدأ مجاناً
        </a>
      </div>
    </header>
  );
}
