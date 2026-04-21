import { useState } from "react";

export function Whatsapp() {
  const [phone, setPhone] = useState("966500000000");
  const [msg, setMsg] = useState("مرحباً! أرغب بالاستفسار عن خدماتكم.");
  const [open, setOpen] = useState(false);
  const link = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold mb-2 block">رقم واتساب</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-input border border-border rounded-xl p-3" dir="ltr" />
        </div>
        <div>
          <label className="text-sm font-semibold mb-2 block">الرسالة الافتراضية</label>
          <input value={msg} onChange={(e) => setMsg(e.target.value)} className="w-full bg-input border border-border rounded-xl p-3" />
        </div>
      </div>

      <div className="relative h-64 bg-secondary border border-border rounded-2xl overflow-hidden">
        <div className="p-4 text-sm text-muted-foreground">معاينة الزر العائم ↙</div>
        <div className="absolute bottom-4 left-4">
          {open && (
            <div className="bg-card border border-border rounded-2xl p-4 mb-2 w-64 shadow-glow">
              <div className="font-bold mb-1">تواصل معنا</div>
              <div className="text-xs text-muted-foreground mb-3">{msg}</div>
              <a href={link} target="_blank" rel="noopener noreferrer" className="block text-center bg-[#25D366] text-white py-2 rounded-lg font-semibold text-sm">
                ابدأ المحادثة
              </a>
            </div>
          )}
          <button onClick={() => setOpen(!open)} className="w-14 h-14 rounded-full bg-[#25D366] text-white text-2xl shadow-glow flex items-center justify-center">
            💬
          </button>
        </div>
      </div>
    </div>
  );
}
