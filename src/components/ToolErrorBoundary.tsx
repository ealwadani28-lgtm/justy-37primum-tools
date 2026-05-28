import { Component, ReactNode, useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { toast } from "sonner";

interface Props {
  toolName: string;
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * Per-tool error boundary: يلتقط أخطاء التصيير داخل الأداة
 * ويعرض رسالة عربية واضحة بدل صفحة بيضاء أو عنصر صامت.
 */
export class ToolErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: { componentStack?: string | null }) {
    // سجّل في الكونسول حتى تظهر في تقارير المتصفح
    console.error(`[Tool: ${this.props.toolName}] فشل التصيير:`, error, info);
    // أبلغ المستخدم
    toast.error(`حدث خطأ في أداة ${this.props.toolName}`, {
      description: error.message || "تعذّر تحميل الأداة. حاول مرة أخرى.",
    });
  }

  reset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="mx-auto max-w-2xl rounded-2xl border border-destructive/30 bg-destructive/5 p-8 text-center backdrop-blur-sm"
        >
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-destructive/15 text-destructive">
            <AlertTriangle className="h-7 w-7" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            تعذّر تشغيل أداة {this.props.toolName}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {import.meta.env.DEV && this.state.error?.message
              ? `السبب: ${this.state.error.message}`
              : "حدث خطأ غير متوقع أثناء تحميل الأداة."}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            جرّب التحديث أو العودة لاحقاً. تم تسجيل المشكلة.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={this.reset}
              className="inline-flex items-center gap-2 rounded-lg bg-mint-gradient px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
            >
              <RefreshCw className="h-4 w-4" />
              إعادة المحاولة
            </button>
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-semibold text-foreground transition hover:bg-muted"
            >
              تحديث الصفحة
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * مستمع عام يلتقط أخطاء وقت التشغيل غير الملتقطة
 * (مثل فشل fetch أو Promise rejection) ويعرضها للمستخدم.
 */
export function GlobalErrorListener() {
  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      // تجاهل أخطاء سكربتات خارجية بدون رسالة مفيدة
      if (!e.message || e.message === "Script error.") return;
      console.error("[GlobalError]", e.error || e.message);
      toast.error("حدث خطأ غير متوقع", {
        description: e.message,
      });
    };
    const onRejection = (e: PromiseRejectionEvent) => {
      const reason = e.reason;
      const msg =
        reason instanceof Error
          ? reason.message
          : typeof reason === "string"
            ? reason
            : "فشل تنفيذ عملية في الخلفية";
      console.error("[UnhandledRejection]", reason);
      toast.error("فشلت عملية في الخلفية", { description: msg });
    };
    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);
  return null;
}
