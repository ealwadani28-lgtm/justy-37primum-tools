import { useState } from "react";
import { ActionBar } from "@/components/ActionBar";

export function Whatsapp() {
  const [phone, setPhone] = useState("966500000000");
  const [msg, setMsg] = useState("مرحباً! أرغب بالاستفسار عن خدماتكم.");
  const [open, setOpen] = useState(false);
  const link = `https://wa.me/${phone.replace(/\D/g, "")}?text=${encodeURIComponent(msg)}`;
  const embed = `<a href="${link}" target="_blank" rel="noopener" style="position:fixed;bottom:20px;left:20px;background:#25D366;color:#fff;width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:28px;text-decoration:none;box-shadow:0 4px 12px rgba(0,0,0,.2)">💬</a>`;

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold mb-2 block">رقم واتساب</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-input border border-border rounded-xl p-3"
            dir="ltr"
          />
        </div>
        <div>
          <label className="text-sm font-semibold mb-2 block">الرسالة الافتراضية</label>
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="w-full bg-input border border-border rounded-xl p-3"
          />
        </div>
      </div>

      <div className="relative h-64 bg-secondary border border-border rounded-2xl overflow-hidden">
        <div className="p-4 text-sm text-muted-foreground">معاينة الزر العائم ↙</div>
        <div className="absolute bottom-4 left-4">
          {open && (
            <div className="bg-card border border-border rounded-2xl p-4 mb-2 w-64 shadow-glow">
              <div className="font-bold mb-1">تواصل معنا</div>
              <div className="text-xs text-muted-foreground mb-3">{msg}</div>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-[#25D366] text-white py-2 rounded-lg font-semibold text-sm"
              >
                ابدأ المحادثة
              </a>
            </div>
          )}
          <button
            onClick={() => setOpen(!open)}
            className="w-14 h-14 rounded-full bg-[#25D366] text-white text-2xl shadow-glow flex items-center justify-center"
          >
            💬
          </button>
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
          كود التضمين (HTML)
        </label>
        <pre
          dir="ltr"
          className="text-xs bg-background border border-border rounded-xl p-3 overflow-auto whitespace-pre-wrap font-mono"
        >
          {embed}
        </pre>
      </div>

      <ActionBar
        copyText={embed}
        copyLabel="نسخ كود HTML"
        downloadText={{ content: embed, filename: "whatsapp-button.html", mime: "text/html" }}
        downloadLabel="تحميل HTML"
        share={{ title: "تواصل عبر واتساب", text: msg, url: link }}
      />
    </div>
  );
}
