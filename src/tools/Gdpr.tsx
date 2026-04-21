import { useState } from "react";

export function Gdpr() {
  const [show, setShow] = useState(true);
  if (!show) return (
    <div className="text-center py-8">
      <p className="text-muted-foreground mb-4">تم إخفاء الإشعار. أعد التحميل لعرضه مجدداً.</p>
      <button onClick={() => setShow(true)} className="bg-mint-gradient text-primary-foreground px-5 py-2 rounded-xl">إعادة عرض</button>
    </div>
  );
  return (
    <div className="bg-secondary border border-border rounded-2xl p-6">
      <div className="flex items-start gap-4 flex-wrap">
        <div className="text-3xl">🍪</div>
        <div className="flex-1 min-w-[200px]">
          <h3 className="font-bold mb-1">نحن نستخدم ملفات تعريف الارتباط</h3>
          <p className="text-sm text-muted-foreground">نستخدم الكوكيز لتحسين تجربتك وتحليل استخدام الموقع. يمكنك قبول الكل أو تخصيص اختياراتك.</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button onClick={() => setShow(false)} className="flex-1 sm:flex-initial border border-border bg-card px-4 py-2 rounded-xl text-sm">رفض</button>
          <button onClick={() => setShow(false)} className="flex-1 sm:flex-initial border border-border bg-card px-4 py-2 rounded-xl text-sm">تخصيص</button>
          <button onClick={() => setShow(false)} className="flex-1 sm:flex-initial bg-mint-gradient text-primary-foreground px-4 py-2 rounded-xl text-sm font-semibold">قبول الكل</button>
        </div>
      </div>
    </div>
  );
}
