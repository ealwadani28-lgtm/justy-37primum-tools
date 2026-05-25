import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { arNumber } from "@/lib/utils";
import { Eye } from "lucide-react";

const STORAGE_KEY = "justlator-visit-logged";
const POLL_MS = 15000;

export function VisitCounter() {
  const [total, setTotal] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadTotal() {
      const { data } = await supabase
        .from("visit_counter")
        .select("total")
        .eq("id", 1)
        .maybeSingle();
      if (!cancelled && data) setTotal(Number(data.total));
    }

    async function bump() {
      // Count this browser once per 30 minutes
      try {
        const last = sessionStorage.getItem(STORAGE_KEY);
        const now = Date.now();
        if (last && now - Number(last) < 30 * 60 * 1000) {
          await loadTotal();
          return;
        }
        const { data } = await supabase.rpc("increment_visit_counter");
        if (!cancelled && typeof data === "number") setTotal(data);
        sessionStorage.setItem(STORAGE_KEY, String(now));
      } catch {
        await loadTotal();
      }
    }

    bump();
    const id = setInterval(loadTotal, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []);

  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 backdrop-blur px-4 py-1.5 text-xs text-muted-foreground shadow-[0_0_18px_-6px_rgba(80,160,255,0.4)]"
      aria-live="polite"
      aria-label="عدّاد زوار الموقع"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inset-0 rounded-full bg-primary/70 animate-ping" />
        <span className="relative rounded-full h-2 w-2 bg-primary" />
      </span>
      <Eye className="h-3.5 w-3.5 text-primary" />
      <span className="text-foreground/90">
        {total === null ? "…" : arNumber(total)}
      </span>
      <span>زائر</span>
    </div>
  );
}
