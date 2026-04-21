import { useEffect, useRef, useState } from "react";
import QRCode from "qrcode";

export function QrGenerator() {
  const [text, setText] = useState("https://plumspace.app");
  const [color, setColor] = useState("#5dd4c5");
  const [bg, setBg] = useState("#1a2424");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !text) return;
    QRCode.toCanvas(canvasRef.current, text, {
      width: 320,
      margin: 2,
      color: { dark: color, light: bg },
      errorCorrectionLevel: "H",
    }).catch(() => {});
  }, [text, color, bg]);

  const download = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = "qr-code.png";
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="grid md:grid-cols-2 gap-8 items-start">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-semibold mb-2 block">النص أو الرابط</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
            className="w-full bg-input border border-border rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="ضع الرابط أو النص هنا..."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">لون الرمز</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-12 bg-input border border-border rounded-xl cursor-pointer" />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">لون الخلفية</label>
            <input type="color" value={bg} onChange={(e) => setBg(e.target.value)} className="w-full h-12 bg-input border border-border rounded-xl cursor-pointer" />
          </div>
        </div>
        <button onClick={download} className="w-full bg-mint-gradient text-primary-foreground font-semibold py-3 rounded-xl hover:opacity-90">
          تحميل PNG
        </button>
      </div>
      <div className="flex items-center justify-center bg-secondary rounded-2xl p-8">
        <canvas ref={canvasRef} className="rounded-lg shadow-card-soft" />
      </div>
    </div>
  );
}
