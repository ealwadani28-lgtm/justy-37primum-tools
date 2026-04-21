import { useState } from "react";

export function PdfViewer() {
  const [url, setUrl] = useState("https://www.africau.edu/images/default/sample.pdf");
  const [input, setInput] = useState(url);
  return (
    <div className="space-y-4">
      <form onSubmit={(e) => { e.preventDefault(); setUrl(input); }} className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="رابط ملف PDF" className="flex-1 bg-input border border-border rounded-xl px-3 py-2 text-sm" dir="ltr" />
        <button className="bg-mint-gradient text-primary-foreground font-semibold px-4 rounded-xl">عرض</button>
      </form>
      <div className="aspect-[4/5] md:aspect-video w-full rounded-2xl overflow-hidden border border-border bg-secondary">
        <iframe src={url} className="w-full h-full" title="PDF Viewer" />
      </div>
    </div>
  );
}
