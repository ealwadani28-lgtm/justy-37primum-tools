import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { checkRateLimit, rateLimitMessage } from "./rate-limit.server";

const LANG_NAMES: Record<string, string> = {
  ar: "Arabic",
  en: "English",
  fr: "French",
  es: "Spanish",
  tr: "Turkish",
};

const InputSchema = z.object({
  text: z.string().min(1).max(5000),
  target: z.enum(["ar", "en", "fr", "es", "tr"]),
});

export const translateText = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => InputSchema.parse(d))
  .handler(async ({ data }) => {
    const rl = checkRateLimit({
      scope: "translate",
      perIpMax: 30,
      perIpWindowMs: 60_000,
      globalMax: 2000,
      globalWindowMs: 24 * 60 * 60_000,
    });
    if (!rl.ok) return { translation: "", error: rateLimitMessage(rl) };

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { translation: "", error: "AI key not configured" };
    }
    const targetName = LANG_NAMES[data.target];
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the user's text into ${targetName}. Return ONLY the translated text, with no quotes, no explanations, no prefix.`,
          },
          { role: "user", content: data.text },
        ],
      }),
    });
    if (!res.ok) {
      return { translation: "", error: `Gateway error: ${res.status}` };
    }
    const json = (await res.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const translation = json.choices?.[0]?.message?.content?.trim() ?? "";
    return { translation, error: null as string | null };
  });
