export type Tool = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
};

export const tools: Tool[] = [
  { slug: "qr-generator", name: "مولّد رمز QR", description: "أنشئ رموز QR لأي رابط أو نص في ثوانٍ.", icon: "📱", category: "أدوات" },
  { slug: "countdown", name: "العدّ التنازلي", description: "مؤقّت تنازلي أنيق للعروض والإطلاقات.", icon: "⏱️", category: "تسويق" },
  { slug: "counter", name: "عدّاد الأرقام", description: "أرقام متحركة لإبراز إنجازاتك.", icon: "🔢", category: "عرض" },
  { slug: "faq", name: "الأسئلة الشائعة", description: "قسم أسئلة قابل للطيّ بتصميم عصري.", icon: "❓", category: "محتوى" },
  { slug: "polls", name: "استطلاعات الرأي", description: "استطلاعات تفاعلية مع نتائج فورية.", icon: "📊", category: "تفاعل" },
  { slug: "before-after", name: "قبل وبعد", description: "شريحة مقارنة للصور بسحب الفأرة.", icon: "🔄", category: "وسائط" },
  { slug: "translator", name: "مترجم النصوص", description: "ترجم نصوصك إلى العربية والإنجليزية وأكثر.", icon: "🌐", category: "أدوات" },
  { slug: "recipes", name: "وصفات الطعام", description: "اعرض وصفاتك بتنسيق احترافي.", icon: "🍽️", category: "محتوى" },
  { slug: "popup", name: "النوافذ المنبثقة", description: "نوافذ ذكية لجذب الانتباه والتحويلات.", icon: "💬", category: "تسويق" },
  { slug: "menu", name: "قائمة المطعم", description: "قوائم طعام رقمية مع صور وأسعار.", icon: "📋", category: "أعمال" },
  { slug: "team", name: "فريق العمل", description: "اعرض أعضاء فريقك بأسلوب جذّاب.", icon: "👥", category: "عرض" },
  { slug: "charts", name: "الرسوم البيانية", description: "مخططات وبيانات تفاعلية جميلة.", icon: "📈", category: "بيانات" },
  { slug: "protection", name: "حماية المحتوى", description: "امنع نسخ النصوص والصور من موقعك.", icon: "🛡️", category: "أمان" },
  { slug: "pricing", name: "جدول الأسعار", description: "خطط أسعار واضحة وقابلة للمقارنة.", icon: "💳", category: "أعمال" },
  { slug: "audio", name: "مشغّل الصوت", description: "مشغّل صوتي مخصّص بتحكم كامل.", icon: "🎵", category: "وسائط" },
  { slug: "timeline", name: "الخط الزمني", description: "اروِ قصتك على خط زمني تفاعلي.", icon: "📅", category: "محتوى" },
  { slug: "video-banner", name: "بانر الفيديو", description: "بانرات فيديو وسلايدر بدقة عالية.", icon: "🎬", category: "وسائط" },
  { slug: "testimonials", name: "آراء العملاء", description: "سلايدر شهادات بتصاميم متعددة.", icon: "⭐", category: "تسويق" },
  { slug: "open-hours", name: "ساعات العمل", description: "اعرض أوقات عمل متجرك بوضوح.", icon: "🕐", category: "أعمال" },
  { slug: "trust-badges", name: "شارات الثقة", description: "شارات أمان ودفع لزيادة الثقة.", icon: "✅", category: "تسويق" },
  { slug: "pdf-viewer", name: "عارض PDF", description: "اعرض ملفات PDF مباشرة في موقعك.", icon: "📄", category: "أدوات" },
  { slug: "gdpr", name: "موافقة الكوكيز", description: "إشعار خصوصية متوافق مع GDPR.", icon: "🍪", category: "أمان" },
  { slug: "whatsapp", name: "واتساب تشات", description: "زرّ دردشة واتساب عائم على موقعك.", icon: "💚", category: "تواصل" },
  { slug: "form-builder", name: "منشئ النماذج", description: "اصنع نماذج تواصل مرنة ومتقدمة.", icon: "📝", category: "أدوات" },
];
