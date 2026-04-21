import { useState } from "react";

const dict: Record<string, Record<string, string>> = {
  hello: { en: "Hello", ar: "مرحباً", fr: "Bonjour", es: "Hola", tr: "Merhaba" },
  welcome: { en: "Welcome", ar: "أهلاً وسهلاً", fr: "Bienvenue", es: "Bienvenido", tr: "Hoş geldiniz" },
  thanks: { en: "Thank you", ar: "شكراً لك", fr: "Merci", es: "Gracias", tr: "Teşekkürler" },
  love: { en: "I love this", ar: "أحب هذا", fr: "J'aime ça", es: "Me encanta", tr: "Bunu seviyorum" },
};

export function Translator() {
  const [text, setText] = useState("hello");
  const [lang, setLang] = useState("ar");
  const langs = [
    { code: "ar", label: "العربية" },
    { code: "en", label: "English" },
    { code: "fr", label: "Français" },
    { code: "es", label: "Español" },
    { code: "tr", label: "Türkçe" },
  ];
  const key = text.trim().toLowerCase();
  const result = dict[key]?.[lang] ?? `[لا توجد ترجمة محلية لـ "${text}"]`;

  return (
    <div className="space-y-6">
      <div className="text-xs text-muted-foreground bg-secondary border border-border rounded-xl p-3">
        💡 عرض توضيحي — يدعم: hello, welcome, thanks, love
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold mb-2 block">النص الأصلي</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} rows={5} className="w-full bg-input border border-border rounded-xl p-3" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-semibold">الترجمة</label>
            <select value={lang} onChange={(e) => setLang(e.target.value)} className="bg-input border border-border rounded-lg px-3 py-1 text-sm">
              {langs.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
            </select>
          </div>
          <div className="w-full bg-secondary border border-border rounded-xl p-3 min-h-[124px] text-lg">{result}</div>
        </div>
      </div>
    </div>
  );
}
