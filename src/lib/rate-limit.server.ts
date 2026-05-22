// In-memory rate limiter — best-effort protection for AI server functions.
// NOTE: state lives per worker isolate, so limits are per-isolate not strictly
// global. Combined with a hard daily cap this still meaningfully protects the
// LOVABLE_API_KEY quota against abuse from a single source.
import { getRequestIP, getRequestHeader } from "@tanstack/react-start/server";

interface Bucket {
  count: number;
  resetAt: number;
}

interface Limiter {
  perIp: Map<string, Bucket>;
  global: Bucket;
}

const limiters = new Map<string, Limiter>();

function getClientIp(): string {
  try {
    const ip = getRequestIP({ xForwardedFor: true });
    if (ip) return ip;
  } catch {
    // ignore
  }
  // fallbacks for Cloudflare / proxies
  const cf = (() => {
    try { return getRequestHeader("cf-connecting-ip"); } catch { return null; }
  })();
  if (cf) return cf;
  const xff = (() => {
    try { return getRequestHeader("x-forwarded-for"); } catch { return null; }
  })();
  if (xff) return xff.split(",")[0]!.trim();
  return "unknown";
}

export interface RateLimitConfig {
  /** Logical scope name, e.g. "ai-image" */
  scope: string;
  /** Max requests per IP within `perIpWindowMs` */
  perIpMax: number;
  perIpWindowMs: number;
  /** Hard ceiling across ALL callers (per isolate) within `globalWindowMs` */
  globalMax: number;
  globalWindowMs: number;
}

export interface RateLimitResult {
  ok: boolean;
  reason?: "ip" | "global";
  retryAfterSec: number;
}

export function checkRateLimit(cfg: RateLimitConfig): RateLimitResult {
  const now = Date.now();
  let limiter = limiters.get(cfg.scope);
  if (!limiter) {
    limiter = {
      perIp: new Map(),
      global: { count: 0, resetAt: now + cfg.globalWindowMs },
    };
    limiters.set(cfg.scope, limiter);
  }

  // global ceiling
  if (now > limiter.global.resetAt) {
    limiter.global = { count: 0, resetAt: now + cfg.globalWindowMs };
  }
  if (limiter.global.count >= cfg.globalMax) {
    return {
      ok: false,
      reason: "global",
      retryAfterSec: Math.max(1, Math.ceil((limiter.global.resetAt - now) / 1000)),
    };
  }

  const ip = getClientIp();
  let bucket = limiter.perIp.get(ip);
  if (!bucket || now > bucket.resetAt) {
    bucket = { count: 0, resetAt: now + cfg.perIpWindowMs };
    limiter.perIp.set(ip, bucket);
  }
  if (bucket.count >= cfg.perIpMax) {
    return {
      ok: false,
      reason: "ip",
      retryAfterSec: Math.max(1, Math.ceil((bucket.resetAt - now) / 1000)),
    };
  }

  bucket.count += 1;
  limiter.global.count += 1;

  // light cleanup — prevent map from growing without bound
  if (limiter.perIp.size > 5000) {
    for (const [k, v] of limiter.perIp) {
      if (now > v.resetAt) limiter.perIp.delete(k);
    }
  }

  return { ok: true, retryAfterSec: 0 };
}

export function rateLimitMessage(r: RateLimitResult): string {
  if (r.reason === "global") {
    return `وصلنا السقف اليومي للأداة لحماية الخدمة. حاول بعد ${Math.ceil(r.retryAfterSec / 60)} دقيقة.`;
  }
  return `تجاوزت حد الطلبات المسموح. حاول بعد ${r.retryAfterSec} ثانية.`;
}
