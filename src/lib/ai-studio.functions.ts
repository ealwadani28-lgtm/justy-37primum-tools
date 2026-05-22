import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ContentSchema = z.object({
  idea: z.string().min(2).max(1000),
  format: z.enum(["ad", "social", "product", "email"]),
  tone: z.enum(["professional", "friendly", "luxury", "playful"]),
});

const FORMAT_LABEL: Record<string, string> = {
  ad: "إعلان تسويقي قصير (3-4 أسطر) جذّاب مع Call To Action",
  social: "منشور قصير لتويتر/انستقرام مع 3 هاشتاقات عربية في الأخير",
  product: "وصف منتج لمتجر إلكتروني (فقرة قوية + 3 نقاط مزايا بـ • )",
  email: "بريد تسويقي قصير: عنوان جذّاب + فقرة + CTA",
};
const TONE_LABEL: Record<string, string> = {
  professional: "احترافية وموثوقة",
  friendly: "ودودة وبسيطة",
  luxury: "فاخرة وراقية",
  playful: "مرحة وخفيفة الظل",
};

export const generateAiContent = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ContentSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) return { text: "", error: "AI key not configured" };
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `أنت كاتب محتوى تسويقي عربي محترف. اكتب باللغة العربية الفصحى المعاصرة الجذّابة، بلهجة ${TONE_LABEL[data.tone]}. الصيغة المطلوبة: ${FORMAT_LABEL[data.format]}. أعد النص فقط بلا مقدمات ولا شرح.`,
          },
          { role: "user", content: data.idea },
        ],
      }),
    });
    if (res.status === 429) return { text: "", error: "تجاوزت حد الطلبات، حاول بعد قليل." };
    if (res.status === 402) return { text: "", error: "نفدت الأرصدة، أضف رصيداً للاستمرار." };
    if (!res.ok) return { text: "", error: `Gateway error: ${res.status}` };
    const json = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    return { text: json.choices?.[0]?.message?.content?.trim() ?? "", error: null as string | null };
  });

const ImageSchema = z.object({
  prompt: z.string().min(2).max(800),
  style: z.enum(["product", "lifestyle", "minimal", "luxury"]),
});

const STYLE_HINT: Record<string, string> = {
  product: "professional product photography, clean studio lighting, soft shadow, centered composition, ultra-detailed, 4k commercial shot",
  lifestyle: "lifestyle photography, natural light, real-world context, shallow depth of field, warm cinematic tones",
  minimal: "minimalist composition, pastel background, single subject, lots of negative space, editorial magazine look",
  luxury: "luxury advertising photography, dramatic moody lighting, premium materials, gold/marble accents, ultra-high-end brand aesthetic",
};

export const generateAiImage = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => ImageSchema.parse(d))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) return { imageUrl: "", error: "AI key not configured" };
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image",
        messages: [
          {
            role: "user",
            content: `${data.prompt}. Style: ${STYLE_HINT[data.style]}. Hyper realistic, irresistible commercial appeal, sharp focus.`,
          },
        ],
        modalities: ["image", "text"],
      }),
    });
    if (res.status === 429) return { imageUrl: "", error: "تجاوزت حد الطلبات، حاول بعد قليل." };
    if (res.status === 402) return { imageUrl: "", error: "نفدت الأرصدة، أضف رصيداً للاستمرار." };
    if (!res.ok) return { imageUrl: "", error: `Gateway error: ${res.status}` };
    const json = (await res.json()) as {
      choices?: Array<{ message?: { images?: Array<{ image_url?: { url?: string } }> } }>;
    };
    const url = json.choices?.[0]?.message?.images?.[0]?.image_url?.url ?? "";
    return { imageUrl: url, error: url ? (null as string | null) : "لم يتم توليد الصورة، حاول بصياغة أوضح." };
  });
