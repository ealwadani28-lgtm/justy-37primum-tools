import { useRef, useState } from "react";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(0, Math.min(100, x)));
  };

  return (
    <div
      ref={ref}
      dir="ltr"
      className="relative w-full aspect-video rounded-2xl overflow-hidden select-none cursor-ew-resize bg-secondary"
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchStart={(e) => update(e.touches[0].clientX)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
    >
      <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200" alt="بعد" className="absolute inset-0 w-full h-full object-cover" draggable={false} />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img src="https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=1200" alt="قبل" className="absolute inset-0 w-full h-full object-cover" style={{ width: `${100 / (pos / 100)}%`, maxWidth: "none" }} draggable={false} />
      </div>
      <div className="absolute top-0 bottom-0 w-1 bg-white shadow-lg" style={{ left: `${pos}%` }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-glow flex items-center justify-center text-primary-foreground font-bold">
          ⇆
        </div>
      </div>
      <div className="absolute top-3 left-3 bg-black/60 text-white text-xs px-2 py-1 rounded">قبل</div>
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded">بعد</div>
    </div>
  );
}
