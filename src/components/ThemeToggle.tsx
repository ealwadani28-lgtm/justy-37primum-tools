import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useTheme } from "@/hooks/use-theme";

if (typeof window !== "undefined") {
  gsap.registerPlugin(Draggable);
}

/**
 * Pull-cord light bulb theme toggle.
 * Faithful port of Jhey Tompkins's "lights off" CodePen (raMGwYW),
 * with MorphSVGPlugin (paid) replaced by a flipbook swing across the
 * 5 original cord frames + View Transitions API for the theme reveal.
 */
export function ThemeToggle() {
  const { toggleTheme, theme } = useTheme();
  const formRef = useRef<HTMLFormElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const dummyLineRef = useRef<SVGLineElement>(null);
  const cordsRef = useRef<(SVGPathElement | null)[]>([]);
  const dummyGroupRef = useRef<SVGGElement>(null);
  const toggleFnRef = useRef(toggleTheme);

  useEffect(() => {
    toggleFnRef.current = toggleTheme;
  }, [toggleTheme]);

  useEffect(() => {
    if (!formRef.current || !handleRef.current || !dummyLineRef.current) return;

    const line = dummyLineRef.current;
    const cords = cordsRef.current.filter(Boolean) as SVGPathElement[];
    const dummyGroup = dummyGroupRef.current!;
    const ENDX = parseFloat(line.getAttribute("x2") || "98");
    const ENDY = parseFloat(line.getAttribute("y2") || "380");

    // hidden proxy that Draggable tracks
    const proxy = document.createElement("div");
    gsap.set(proxy, { x: ENDX, y: ENDY });

    let startX = 0;
    let startY = 0;

    // synth click
    const playClick = () => {
      try {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        const ctx = new AC();
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = "square";
        o.frequency.value = 1800;
        g.gain.value = 0.05;
        o.connect(g).connect(ctx.destination);
        o.start();
        o.frequency.exponentialRampToValueAtTime(380, ctx.currentTime + 0.05);
        g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
        o.stop(ctx.currentTime + 0.08);
      } catch {}
    };

    // Build a flipbook swing across cord frames 1..4 (replaces MorphSVG)
    // Sequence: 1 → 2 → 3 → 4 → 3 → 2 → 1 then snap back to dummy line.
    const swingSeq = [1, 2, 3, 4, 3, 2, 1];
    const FRAME_DUR = 0.07;

    const buildSwingTL = () => {
      const tl = gsap.timeline({
        paused: true,
        onStart: () => {
          // hide dummy + handle, show cord frames
          gsap.set(dummyGroup, { display: "none" });
          gsap.set(handleRef.current, { display: "none" });
          cords.forEach((c) => gsap.set(c, { display: "none" }));
          playClick();
          toggleFnRef.current();
        },
        onComplete: () => {
          cords.forEach((c) => gsap.set(c, { display: "none" }));
          gsap.set(dummyGroup, { display: "block" });
          gsap.set(handleRef.current, { display: "block" });
          gsap.set(line, { attr: { x2: ENDX, y2: ENDY } });
          gsap.set(proxy, { x: ENDX, y: ENDY });
        },
      });
      swingSeq.forEach((idx, i) => {
        const cord = cords[idx];
        if (!cord) return;
        const prev = swingSeq[i - 1];
        tl.call(() => {
          if (prev !== undefined && cords[prev]) gsap.set(cords[prev], { display: "none" });
          gsap.set(cord, { display: "block" });
        }, undefined, i * FRAME_DUR);
      });
      tl.to({}, { duration: swingSeq.length * FRAME_DUR });
      return tl;
    };

    const drag = Draggable.create(proxy, {
      trigger: handleRef.current,
      type: "x,y",
      allowEventDefault: true,
      onPress(e) {
        startX = e.x;
        startY = e.y;
      },
      onDragStart() {
        document.documentElement.style.setProperty("cursor", "grabbing");
      },
      onDrag(this: { startX: number; startY: number; x: number; y: number }) {
        const sceneEl = formRef.current?.querySelector(".toggle-scene") as SVGSVGElement | null;
        if (!sceneEl) return;
        // SVG viewBox is 134 wide; map screen px -> viewBox units
        const ratio = 134 / sceneEl.getBoundingClientRect().width;
        line.setAttribute("x2", String(this.startX + (this.x - this.startX) * ratio));
        line.setAttribute("y2", String(this.startY + (this.y - this.startY) * ratio));
      },
      onRelease(e) {
        const dx = e.x - startX;
        const dy = e.y - startY;
        const travelled = Math.sqrt(dx * dx + dy * dy);
        document.documentElement.style.setProperty("cursor", "unset");

        gsap.to(line, {
          attr: { x2: ENDX, y2: ENDY },
          duration: 0.18,
          ease: "elastic.out(1, 0.55)",
          onComplete: () => {
            if (travelled > 40) {
              const tl = buildSwingTL();
              tl.play();
            } else {
              gsap.set(proxy, { x: ENDX, y: ENDY });
            }
          },
        });
      },
    });

    return () => {
      drag.forEach((d) => d.kill());
    };
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toggleTheme();
  };

  const isLight = theme === "light";

  return (
    <form
      ref={formRef}
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
          aria-hidden="true"
          className="toggle-scene"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="32 32 134 134"
        >
          <defs>
            {(["a", "b", "c", "d", "e"] as const).map((id) => (
              <marker key={id} id={`lt-${id}`} orient="auto" overflow="visible" refX="0" refY="0">
                <path
                  className="toggle-scene__cord-end"
                  fillRule="evenodd"
                  strokeWidth=".2666"
                  d="M.98 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
              </marker>
            ))}
          </defs>

          <g className="toggle-scene__cords">
            {/* CORDS[0]: straight reference */}
            <path
              ref={(el) => { cordsRef.current[0] = el; }}
              className="toggle-scene__cord"
              markerEnd="url(#lt-a)"
              fill="none"
              strokeLinecap="square"
              strokeWidth="6"
              d="M123.228-28.56v150.493"
              transform="translate(-24.503 256.106)"
            />
            {/* CORDS[1..4]: progressively swung frames */}
            <path
              ref={(el) => { cordsRef.current[1] = el; }}
              className="toggle-scene__cord"
              markerEnd="url(#lt-a)"
              fill="none"
              strokeLinecap="square"
              strokeWidth="6"
              d="M123.228-28.59s28 8.131 28 19.506-18.667 13.005-28 19.507c-9.333 6.502-28 8.131-28 19.506s28 19.507 28 19.507"
              transform="translate(-24.503 256.106)"
            />
            <path
              ref={(el) => { cordsRef.current[2] = el; }}
              className="toggle-scene__cord"
              markerEnd="url(#lt-a)"
              fill="none"
              strokeLinecap="square"
              strokeWidth="6"
              d="M123.228-28.575s-20 16.871-20 28.468c0 11.597 13.333 18.978 20 28.468 6.667 9.489 20 16.87 20 28.467 0 11.597-20 28.468-20 28.468"
              transform="translate(-24.503 256.106)"
            />
            <path
              ref={(el) => { cordsRef.current[3] = el; }}
              className="toggle-scene__cord"
              markerEnd="url(#lt-a)"
              fill="none"
              strokeLinecap="square"
              strokeWidth="6"
              d="M123.228-28.569s16 20.623 16 32.782c0 12.16-10.667 21.855-16 32.782-5.333 10.928-16 20.623-16 32.782 0 12.16 16 32.782 16 32.782"
              transform="translate(-24.503 256.106)"
            />
            <path
              ref={(el) => { cordsRef.current[4] = el; }}
              className="toggle-scene__cord"
              markerEnd="url(#lt-a)"
              fill="none"
              strokeLinecap="square"
              strokeWidth="6"
              d="M123.228-28.563s-10 24.647-10 37.623c0 12.977 6.667 25.082 10 37.623 3.333 12.541 10 24.647 10 37.623 0 12.977-10 37.623-10 37.623"
              transform="translate(-24.503 256.106)"
            />

            {/* Draggable visible cord */}
            <g ref={dummyGroupRef} className="line toggle-scene__dummy-cord">
              <line ref={dummyLineRef} markerEnd="url(#lt-a)" x1="98" x2="98" y1="240" y2="380" />
            </g>
          </g>

          {/* Bulb */}
          <g className="toggle-scene__bulb bulb" transform="translate(844.069 -645.213)">
            <path
              className="bulb__cap"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4.677"
              d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
            />
            <path
              className="bulb__cap"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v0s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z"
            />
            <path
              className="bulb__cap-outline"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4.677"
              d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
            />
            <g className="bulb__filament" fill="none" strokeLinecap="round" strokeWidth="5">
              <path d="M-752.914 823.875l-8.858-33.06" />
              <path d="M-737.772 823.875l8.858-33.06" />
            </g>
            <path
              className="bulb__bulb"
              strokeLinecap="round"
              strokeWidth="5"
              d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"
            />
            <path
              className="bulb__shine"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="12"
              d="M-789.19 757.501a45.897 45.897 0 013.915-36.189 45.897 45.897 0 0129.031-21.957"
            />
          </g>
        </svg>

        {/* Invisible bigger touch target */}
        <div ref={handleRef} className="lights-toggle__handle" aria-hidden="true" />
      </button>
    </form>
  );
}
