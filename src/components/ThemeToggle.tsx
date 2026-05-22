import { useTheme } from "@/hooks/use-theme";

/**
 * Creative day/night toggle — animated sun rays morph into moon + stars.
 * Pure CSS transitions, no extra deps.
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "تفعيل الوضع النهاري" : "تفعيل الوضع الليلي"}
      aria-pressed={isDark}
      className="relative h-9 w-[72px] rounded-full border border-border/60 overflow-hidden group focus:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-all"
      style={{
        background: isDark
          ? "linear-gradient(135deg, oklch(0.22 0.04 250) 0%, oklch(0.14 0.03 260) 100%)"
          : "linear-gradient(135deg, oklch(0.85 0.08 85) 0%, oklch(0.78 0.12 70) 100%)",
        boxShadow: isDark
          ? "inset 0 2px 8px oklch(0 0 0 / 0.5), 0 0 18px oklch(0.5 0.2 270 / 0.25)"
          : "inset 0 2px 8px oklch(0.4 0.1 70 / 0.25), 0 0 18px oklch(0.82 0.13 85 / 0.4)",
      }}
    >
      {/* Stars — only visible in dark */}
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: isDark ? 1 : 0 }}
        aria-hidden
      >
        <span className="absolute top-1.5 left-3 h-[2px] w-[2px] rounded-full bg-white/90 animate-pulse" />
        <span
          className="absolute top-3 left-7 h-[3px] w-[3px] rounded-full bg-white/80 animate-pulse"
          style={{ animationDelay: "0.4s" }}
        />
        <span
          className="absolute bottom-1.5 left-5 h-[2px] w-[2px] rounded-full bg-white/70 animate-pulse"
          style={{ animationDelay: "0.8s" }}
        />
        <span
          className="absolute top-2 left-12 h-[2px] w-[2px] rounded-full bg-white/60 animate-pulse"
          style={{ animationDelay: "1.2s" }}
        />
      </span>

      {/* Clouds — only visible in light */}
      <span
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{ opacity: isDark ? 0 : 1 }}
        aria-hidden
      >
        <span className="absolute top-2 right-3 h-1.5 w-4 rounded-full bg-white/70 blur-[1px]" />
        <span className="absolute bottom-2 right-8 h-1 w-3 rounded-full bg-white/60 blur-[1px]" />
        <span className="absolute top-3.5 right-12 h-1 w-2.5 rounded-full bg-white/50 blur-[1px]" />
      </span>

      {/* The orb (sun ↔ moon) */}
      <span
        className="absolute top-1/2 h-7 w-7 rounded-full transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] will-change-transform"
        style={{
          transform: `translateY(-50%) translateX(${isDark ? "-36px" : "-4px"})`,
          right: 4,
          background: isDark
            ? "radial-gradient(circle at 35% 35%, oklch(0.95 0.02 90) 0%, oklch(0.82 0.04 90) 70%, oklch(0.7 0.05 90) 100%)"
            : "radial-gradient(circle at 35% 35%, oklch(0.98 0.08 90) 0%, oklch(0.88 0.16 80) 60%, oklch(0.75 0.18 65) 100%)",
          boxShadow: isDark
            ? "inset -6px -3px 0 0 oklch(0.22 0.04 250), 0 0 12px oklch(0.85 0.05 90 / 0.4)"
            : "0 0 18px oklch(0.88 0.18 75 / 0.7), 0 0 32px oklch(0.88 0.18 75 / 0.3)",
        }}
        aria-hidden
      >
        {/* Sun rays — fade out in dark */}
        <span
          className="absolute inset-0 transition-opacity duration-300"
          style={{ opacity: isDark ? 0 : 1 }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <span
              key={deg}
              className="absolute top-1/2 left-1/2 h-[2px] w-1.5 rounded-full bg-amber-200"
              style={{
                transform: `translate(-50%, -50%) rotate(${deg}deg) translateX(14px)`,
                boxShadow: "0 0 6px oklch(0.85 0.16 80)",
              }}
            />
          ))}
        </span>
      </span>
    </button>
  );
}
