import { useState } from "react";

export function Popup() {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-center py-12">
      <button onClick={() => setOpen(true)} className="bg-mint-gradient text-primary-foreground font-semibold px-6 py-3 rounded-xl shadow-glow">
        افتح النافذة المنبثقة
      </button>
      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in" onClick={() => setOpen(false)}>
          <div className="bg-card border border-border rounded-3xl p-8 max-w-md w-full shadow-glow relative" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setOpen(false)} className="absolute top-4 left-4 w-8 h-8 rounded-full bg-secondary hover:bg-muted">✕</button>
            <div className="text-5xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold mb-2">عرض حصري لك!</h3>
            <p className="text-muted-foreground mb-6">احصل على خصم 25% على أول طلب لك. سارع قبل انتهاء العرض.</p>
            <input type="email" placeholder="بريدك الإلكتروني" className="w-full bg-input border border-border rounded-xl p-3 mb-3" />
            <button className="w-full bg-mint-gradient text-primary-foreground font-semibold py-3 rounded-xl">احصل على الخصم</button>
          </div>
        </div>
      )}
    </div>
  );
}
