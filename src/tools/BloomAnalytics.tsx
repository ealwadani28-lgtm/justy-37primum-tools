import { BloomShowcase } from "@/components/showcases/BloomShowcase";

export function BloomAnalytics() {
  return (
    <div className="space-y-4">
      <BloomShowcase />
      <p className="text-xs text-muted-foreground text-center">
        * عرض مفهومي لداشبورد بلوم سبيس. اطلب التخصيص الكامل لربط بياناتك من Google Analytics، Mixpanel، أو أي مصدر آخر.
      </p>
    </div>
  );
}
