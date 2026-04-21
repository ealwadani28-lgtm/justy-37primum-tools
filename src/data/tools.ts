export type Tool = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  available: boolean;
};

export const tools: Tool[] = [
  { slug: "qr-generator", name: "مولّد رمز QR", description: "أنشئ رموز QR لأي رابط أو نص في ثوانٍ.", icon: "📱", category: "أدوات", available: true },
  { slug: "countdown", name: "العدّ التنازلي", description: "مؤقّت تنازلي أنيق للعروض والإطلاقات.", icon: "⏱️", category: "تسويق", available: true },
  { slug: "counter", name: "عدّاد الأرقام", description: "أرقام متحركة لإبراز إنجازاتك.", icon: "🔢", category: "عرض", available: true },
  { slug: "faq", name: "الأسئلة الشائعة", description: "قسم أسئلة قابل للطيّ بتصميم عصري.", icon: "❓", category: "محتوى", available: true },
  { slug: "polls", name: "استطلاعات الرأي", description: "استطلاعات تفاعلية مع نتائج فورية.", icon: "📊", category: "تفاعل", available: true },
  { slug: "before-after", name: "قبل وبعد", description: "شريحة مقارنة للصور بسحب الفأرة.", icon: "🔄", category: "وسائط", available: true },
  { slug: "translator", name: "مترجم المواقع", description: "ترجم موقعك إلى عشرات اللغات تلقائياً.", icon: "🌐", category: "أدوات", available: false },
  { slug: "recipes", name: "وصفات الطعام", description: "اعرض وصفاتك بتنسيق احترافي.", icon: "🍽️", category: "محتوى", available: false },
  { slug: "popup", name: "النوافذ المنبثقة", description: "نوافذ ذكية لجذب الانتباه والتحويلات.", icon: "💬", category: "تسويق", available: false },
  { slug: "menu", name: "قائمة المطعم", description: "قوائم طعام رقمية مع صور وأسعار.", icon: "📋", category: "أعمال", available: false },
  { slug: "team", name: "فريق العمل", description: "اعرض أعضاء فريقك بأسلوب جذّاب.", icon: "👥", category: "عرض", available: false },
  { slug: "charts", name: "الرسوم البيانية", description: "مخططات وبيانات تفاعلية جميلة.", icon: "📈", category: "بيانات", available: false },
  { slug: "protection", name: "حماية المحتوى", description: "امنع نسخ النصوص والصور من موقعك.", icon: "🛡️", category: "أمان", available: false },
  { slug: "pricing", name: "جدول الأسعار", description: "خطط أسعار واضحة وقابلة للمقارنة.", icon: "💳", category: "أعمال", available: false },
  { slug: "audio", name: "مشغّل الصوت", description: "مشغّل صوتي مخصّص بتحكم كامل.", icon: "🎵", category: "وسائط", available: false },
  { slug: "timeline", name: "الخط الزمني", description: "اروِ قصتك على خط زمني تفاعلي.", icon: "📅", category: "محتوى", available: false },
  { slug: "video-banner", name: "بانر الفيديو", description: "بانرات فيديو وسلايدر بدقة عالية.", icon: "🎬", category: "وسائط", available: false },
  { slug: "testimonials", name: "آراء العملاء", description: "سلايدر شهادات بتصاميم متعددة.", icon: "⭐", category: "تسويق", available: false },
  { slug: "open-hours", name: "ساعات العمل", description: "اعرض أوقات عمل متجرك بوضوح.", icon: "🕐", category: "أعمال", available: false },
  { slug: "trust-badges", name: "شارات الثقة", description: "شارات أمان ودفع لزيادة الثقة.", icon: "✅", category: "تسويق", available: false },
  { slug: "pdf-viewer", name: "عارض PDF", description: "اعرض ملفات PDF مباشرة في موقعك.", icon: "📄", category: "أدوات", available: false },
  { slug: "gdpr", name: "موافقة الكوكيز", description: "إشعار خصوصية متوافق مع GDPR.", icon: "🍪", category: "أمان", available: false },
  { slug: "whatsapp", name: "واتساب تشات", description: "زرّ دردشة واتساب عائم على موقعك.", icon: "💚", category: "تواصل", available: false },
  { slug: "form-builder", name: "منشئ النماذج", description: "اصنع نماذج تواصل مرنة ومتقدمة.", icon: "📝", category: "أدوات", available: false },
];
