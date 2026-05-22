import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useTheme } from "@/hooks/use-theme";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

/**
 * Pull-cord light bulb theme toggle.
 * Inspired by Jhey Tompkins's "lights off" CodePen (raMGwYW).
 * Drag the cord down and release — bulb flickers, theme transitions
 * via the View Transitions API.
 */
export function ThemeToggle() {
  const { toggleTheme, theme } = useTheme();
  const containerRef = useRef<HTMLFormElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const cordRef = useRef<SVGLineElement>(null);
  const swingGroupRef = useRef<SVGGElement>(null);
  const proxyRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef(toggleTheme);

  // Keep latest toggle in ref (Draggable closes over it once)
  useEffect(() => {
    toggleRef.current = toggleTheme;
  }, [toggleTheme]);

  useEffect(() => {
    if (!containerRef.current || !handleRef.current || !cordRef.current) return;

    const cord = cordRef.current;
    const ENDX = parseFloat(cord.getAttribute("x2") || "40");
    const ENDY = parseFloat(cord.getAttribute("y2") || "150");
    const proxy = document.createElement("div");
    proxyRef.current = proxy;

    gsap.set(proxy, { x: ENDX, y: ENDY });

    let startX = 0;
    let startY = 0;

    // Faux "click" sound — short synthesized blip via WebAudio (no asset)
    const playClick = () => {
      try {
        const AC = (window.AudioContext || (window as any).webkitAudioContext);
        if (!AC) return;
        const ctx = new AC();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "square";
        o.frequency.value = 1800;
        g.gain.value = 0.04;
        o.connect(g).connect(ctx.destination);
        o.start();
        o.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06);
        o.stop(ctx.currentTime + 0.07);
      } catch {}
    };

    // Swing the cord+bulb after a successful pull (replaces MorphSVG)
    const swing = () => {
      if (!swingGroupRef.current) return;
      gsap.fromTo(
        swingGroupRef.current,
        { rotate: 0, transformOrigin: "50% 0%" },
        {
          keyframes: { rotate: [0, 8, -6, 4, -2, 0] },
          duration: 0.9,
          ease: "sine.out",
        }
      );
    };

    const fire = () => {
      playClick();
      toggleRef.current();
      swing();
    };

    const drag = Draggable.create(proxy, {
      trigger: handleRef.current,
      type: "x,y",
      onPress(e) {
        startX = e.x;
        startY = e.y;
      },
      onDragStart() {
        document.documentElement.style.setProperty("cursor", "grabbing");
      },
      onDrag(this: any) {
        // map screen px → SVG coords
        const sceneEl = containerRef.current?.querySelector(".toggle-scene") as SVGSVGElement | null;
        const ratio = sceneEl
          ? 200 / sceneEl.getBoundingClientRect().height
          : 1;
        cord.setAttribute("x2", String(this.startX + (this.x - this.startX) * ratio));
        cord.setAttribute("y2", String(this.startY + (this.y - this.startY) * ratio));
      },
      onRelease(e) {
        const dx = e.x - startX;
        const dy = e.y - startY;
        const travelled = Math.sqrt(dx * dx + dy * dy);
        document.documentElement.style.setProperty("cursor", "unset");

        gsap.to(cord, {
          attr: { x2: ENDX, y2: ENDY },
          duration: 0.18,
          ease: "back.out(2.4)",
          onComplete: () => {
            if (travelled > 40) fire();
            gsap.set(proxy, { x: ENDX, y: ENDY });
          },
        });
      },
    });

    return () => {
      drag.forEach((d) => d.kill());
    };
  }, []);

  // Plain click on the bulb also toggles (a11y fallback)
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toggleTheme();
  };

  const isLight = theme === "light";

  return (
    <form
      ref={containerRef}
      onSubmit={onSubmit}
      className="lights-toggle"
      aria-label="مفتاح الإضاءة — تبديل المظهر"
    >
      <button
        type="submit"
        aria-pressed={isLight}
        aria-label={isLight ? "إطفاء الإضاءة (الوضع الليلي)" : "تشغيل الإضاءة (الوضع النهاري)"}
        className="lights-toggle__btn"
      >
        <span className="sr-only">تبديل المظهر</span>

        <svg
          className="toggle-scene"
          viewBox="0 0 80 200"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <g ref={swingGroupRef}>
            {/* Cap */}
            <g className="bulb">
              <path
                className="bulb__cap"
                d="M30 6 h20 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h-20 a4 4 0 0 1 -4 -4 v-8 a4 4 0 0 1 4 -4 z"
              />
              <rect className="bulb__cap-shine" x="30" y="9" width="3" height="10" rx="1" />
              <path
                className="bulb__cap-outline"
                d="M30 6 h20 a4 4 0 0 1 4 4 v8 a4 4 0 0 1 -4 4 h-20 a4 4 0 0 1 -4 -4 v-8 a4 4 0 0 1 4 -4 z"
                fill="none"
              />
              {/* Glass */}
              <path
                className="bulb__bulb"
                d="M28 22
                   C 18 30, 14 46, 22 60
                   C 28 70, 30 78, 30 86
                   L 50 86
                   C 50 78, 52 70, 58 60
                   C 66 46, 62 30, 52 22 Z"
              />
              {/* Inner shine */}
              <path
                className="bulb__shine"
                d="M32 28 C 26 36, 24 46, 28 56"
                fill="none"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Filament */}
              <path
                className="bulb__filament"
                d="M34 70 q 3 -10 6 0 q 3 10 6 0"
                fill="none"
                strokeLinecap="round"
              />
            </g>

            {/* Cord (draggable) */}
            <line
              ref={cordRef}
              className="toggle-scene__dummy-cord"
              x1="40"
              y1="86"
              x2="40"
              y2="150"
              strokeLinecap="round"
            />
            {/* Cord end ball */}
            <circle className="toggle-scene__cord-end" cx="40" cy="150" r="4" />
          </g>
        </svg>

        {/* Invisible grab handle (bigger touch target) */}
        <div ref={handleRef} className="lights-toggle__handle" aria-hidden="true" />
      </button>
    </form>
  );
}
