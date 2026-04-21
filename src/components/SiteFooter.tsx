export function SiteFooter() {
  return (
    <footer className="border-t border-border/50 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-8 text-sm">
        <div>
          <div className="font-bold text-lg mb-3">PlumSpace<span className="text-primary">.</span></div>
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
          <div className="font-semibold mb-3 text-foreground">تابعنا</div>
          <p className="text-muted-foreground">© {new Date().getFullYear()} PlumSpace. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}
