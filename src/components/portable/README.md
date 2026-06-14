# 🪔 MagicLampToggle — التوقيع البصري الموحّد لعائلة Justlator

مكوّن **portable** بالكامل (component + styles + variants في ملف واحد) لاستخدامه في كل منتجاتنا الرقمية كتوقيع بصري موحّد.

## ✨ الفلسفة

نفس حركة السحب السحرية في كل منتج → **ذاكرة بصرية موحّدة** + **هوية لون مستقلة لكل منتج**.

## 📦 التركيب في مشروع جديد

```bash
bun add gsap
```

ثم انسخ `MagicLampToggle.tsx` إلى `src/components/portable/`.

## 🎨 الاستخدام

```tsx
import { MagicLampToggle } from "@/components/portable/MagicLampToggle";
import { useTheme } from "@/hooks/use-theme";

export function App() {
  const { theme, toggleTheme } = useTheme();
  return (
    <MagicLampToggle
      theme={theme}
      onToggle={toggleTheme}
      variant="cyan"   // gold | cyan | emerald | violet
    />
  );
}
```

## 🌈 الـ Variants المعتمدة

| Variant | المنتج | اللون |
|---|---|---|
| `gold` | Justlator Tools | ذهبي/كهرماني ☀️ |
| `cyan` | JustSecure / حصين | سماوي نيون 🛡️ |
| `emerald` | JustSyncFlow | زمردي 🔄 |
| `violet` | منتجات قادمة | بنفسجي 🔮 |

## 📱 الموبايل

يُخفى تلقائياً تحت `640px` (يمكن تعطيله بـ `hideOnMobile={false}`).

## ⚙️ Props

| Prop | النوع | الافتراضي |
|---|---|---|
| `theme` | `"dark" \| "light"` | — (required) |
| `onToggle` | `() => void` | — (required) |
| `variant` | `MagicLampVariant` | `"gold"` |
| `position` | `"top-right" \| "top-left"` | `"top-right"` |
| `hideOnMobile` | `boolean` | `true` |
| `hint` | `string` | `"اسحبني"` |

---
© Justlator Technologies — توقيع بصري لا يُنسى 🪔
