import { useEffect, useMemo, useRef, useState } from "react";
import QRCode from "qrcode";
import { ActionBar } from "@/components/ActionBar";

type Domain = "justlator.com" | "justlator.online";

const PRESETS: { label: string; path: string }[] = [
  { label: "الرئيسية", path: "/" },
  { label: "الأدوات", path: "/#tools" },
  { label: "من نحن", path: "/#about" },
  { label: "تواصل", path: "/#contact" },
];

export function QrGenerator() {
  const [domain, setDomain] = useState<Domain>("justlator.com");
  const [path, setPath] = useState<string>("/");
  const [useCustom, setUseCustom] = useState(false);
  const [customText, setCustomText] = useState("");
  const [color, setColor] = useState("#5dd4c5");
  const [bg, setBg] = useState("#1a2424");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>("");

  const text = useMemo(() => {
    if (useCustom) return customText.trim();
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    return `https://${domain}${cleanPath === "/" ? "" : cleanPath}`;
  }, [useCustom, customText, domain, path]);

  useEffect(() => {
    if (!canvasRef.current || !text) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: 320,
      margin: 2,
      color: { dark: color, light: bg },
      errorCorrectionLevel: "H",
    })
      .then(() => {
        if (canvasRef.current) setDataUrl(canvasRef.current.toDataURL("image/png"));
      })
      .catch(() => {});
  }, [text, color, bg]);

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        {/* Domain selector */}
        <div>
          <label className="text-sm font-semibold mb-2 block">النطاق (الدومين)</label>
          <div className="grid grid-cols-2 gap-2">
            {(["justlator.com", "justlator.online"] as Domain[]).map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setDomain(d);
                  setUseCustom(false);
                }}
                className={`px-3 py-2.5 rounded-xl border text-sm font-semibold transition ${
                  !useCustom && domain === d
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-input border-border hover:border-primary/60"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Quick presets */}
        <div>
          <label className="text-sm font-semibold mb-2 block">صفحة مختصرة</label>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.path}
                type="button"
                onClick={() => {
                  setPath(p.path);
                  setUseCustom(false);
                }}
                className={`text-xs px-3 py-1.5 rounded-full border transition ${
                  !useCustom && path === p.path
                    ? "bg-primary/10 border-primary text-primary"
                    : "bg-secondary border-border hover:border-primary/60"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Path or custom override */}
        <div>
          <label className="text-sm font-semibold mb-2 block">
            المسار داخل الموقع <span className="text-muted-foreground font-normal">(مثل /pricing)</span>
          </label>
          <input
            type="text"
            value={path}
            onChange={(e) => {
              setPath(e.target.value);
              setUseCustom(false);
            }}
            disabled={useCustom}
            placeholder="/"
            className="w-full bg-input border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>

        <div className="border-t border-border pt-4">
          <label className="flex items-center gap-2 text-sm font-semibold mb-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useCustom}
              onChange={(e) => setUseCustom(e.target.checked)}
              className="accent-primary"
            />
            استخدام نص/رابط مخصّص بدلاً من Justlator
          </label>
          <textarea
            value={customText}
            onChange={(e) => {
              setCustomText(e.target.value);
              setUseCustom(true);
            }}
            rows={3}
            disabled={!useCustom}
            placeholder="ضع أي رابط أو نص هنا..."
            className="w-full bg-input border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary disabled:opacity-50"
          />
        </div>

        {/* Live URL preview */}
        <div className="bg-secondary border border-border rounded-xl px-3 py-2.5 text-xs text-muted-foreground break-all">
          <span className="text-foreground font-semibold">المحتوى الحالي:</span>{" "}
          <span dir="ltr">{text || "—"}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">لون الرمز</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-full h-12 bg-input border border-border rounded-xl cursor-pointer"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">لون الخلفية</label>
            <input
              type="color"
              value={bg}
              onChange={(e) => setBg(e.target.value)}
              className="w-full h-12 bg-input border border-border rounded-xl cursor-pointer"
            />
          </div>
        </div>
        <ActionBar
          copyText={text}
          copyLabel="نسخ الرابط"
          downloadCanvas={{
            canvas: () => canvasRef.current,
            filename: `qr-${(text.replace(/[^a-z0-9\u0600-\u06FF]+/gi, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "code")}.png`,
            mime: "image/png",
          }}
          downloadLabel="تحميل PNG"
          share={{
            title: "رمز QR — Justlator Tools",
            text: `رمز QR لـ: ${text}`,
            url: dataUrl || undefined,
          }}
        />
      </div>
      <div className="flex items-center justify-center bg-secondary rounded-2xl p-8">
        <canvas ref={canvasRef} className="rounded-lg shadow-card-soft" />
      </div>
    </div>
  );
}
