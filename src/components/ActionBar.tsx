import { useState } from "react";

type ActionBarProps = {
  /** نص جاهز للنسخ (HTML embed code, link, translated text...) */
  copyText?: string;
  /** اسم زر النسخ — اختياري */
  copyLabel?: string;
  /** تحميل: محتوى نصي */
  downloadText?: { content: string; filename: string; mime?: string };
  /** تحميل: من canvas (للـ QR والصور) — يقبل canvas مباشرة أو دالة تُرجع canvas حيّ وقت الضغط */
  downloadCanvas?: {
    canvas: HTMLCanvasElement | null | (() => HTMLCanvasElement | null);
    filename: string;
    mime?: string;
  };
  /** تحميل: blob جاهز */
  downloadBlob?: { blob: Blob | null; filename: string };
  /** اسم زر التحميل — اختياري */
  downloadLabel?: string;
  /** بيانات المشاركة */
  share?: { title?: string; text?: string; url?: string };
  className?: string;
};

export function ActionBar({
  copyText,
  copyLabel = "نسخ",
  downloadText,
  downloadCanvas,
  downloadBlob,
  downloadLabel = "تحميل",
  share,
  className = "",
}: ActionBarProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState<string | null>(null);

  const handleCopy = async () => {
    if (!copyText) return;
    try {
      await navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = copyText;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      } catch {}
      document.body.removeChild(ta);
    }
  };

  const handleDownload = () => {
    let url: string | null = null;
    let filename = "download";
    let cleanup: (() => void) | null = null;

    if (downloadCanvas) {
      const liveCanvas =
        typeof downloadCanvas.canvas === "function"
          ? downloadCanvas.canvas()
          : downloadCanvas.canvas;
      if (liveCanvas) {
        url = liveCanvas.toDataURL(downloadCanvas.mime ?? "image/png");
        filename = downloadCanvas.filename;
      }
    }
    if (!url && downloadBlob?.blob) {
      url = URL.createObjectURL(downloadBlob.blob);
      filename = downloadBlob.filename;
      cleanup = () => URL.revokeObjectURL(url!);
    } else if (!url && downloadText) {
      const blob = new Blob([downloadText.content], {
        type: downloadText.mime ?? "text/plain;charset=utf-8",
      });
      url = URL.createObjectURL(blob);
      filename = downloadText.filename;
      cleanup = () => URL.revokeObjectURL(url!);
    }

    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    if (cleanup) setTimeout(cleanup, 1000);
  };

  const handleShare = async () => {
    if (!share) return;
    const data: ShareData = {
      title: share.title,
      text: share.text,
      url: share.url ?? (typeof window !== "undefined" ? window.location.href : undefined),
    };
    try {
      if (typeof navigator !== "undefined" && (navigator as any).share) {
        await (navigator as any).share(data);
        setShared("تمت المشاركة");
      } else {
        const fallback = data.url ?? data.text ?? "";
        await navigator.clipboard.writeText(fallback);
        setShared("نُسخ الرابط");
      }
    } catch {
      setShared(null);
      return;
    }
    setTimeout(() => setShared(null), 1800);
  };

  const hasDownload = !!(downloadText || downloadCanvas || downloadBlob);
  const hasCopy = !!copyText;
  const hasShare = !!share;
  if (!hasCopy && !hasDownload && !hasShare) return null;

  const btn =
    "inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl border transition active:scale-[0.98]";

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {hasCopy && (
        <button
          onClick={handleCopy}
          className={`${btn} ${
            copied
              ? "bg-primary/10 border-primary text-primary"
              : "bg-secondary border-border hover:border-primary hover:text-primary"
          }`}
          aria-label={copyLabel}
        >
          <span aria-hidden>{copied ? "✓" : "📋"}</span>
          {copied ? "تم النسخ" : copyLabel}
        </button>
      )}
      {hasDownload && (
        <button
          onClick={handleDownload}
          className={`${btn} bg-mint-gradient border-transparent text-primary-foreground hover:opacity-90`}
          aria-label={downloadLabel}
        >
          <span aria-hidden>⬇</span>
          {downloadLabel}
        </button>
      )}
      {hasShare && (
        <button
          onClick={handleShare}
          className={`${btn} ${
            shared
              ? "bg-primary/10 border-primary text-primary"
              : "bg-secondary border-border hover:border-primary hover:text-primary"
          }`}
          aria-label="مشاركة"
        >
          <span aria-hidden>🔗</span>
          {shared ?? "مشاركة"}
        </button>
      )}
    </div>
  );
}
