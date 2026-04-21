import { PaymentsShowcase } from "@/components/showcases/PaymentsShowcase";

export function PaymentsDashboard() {
  return (
    <div className="space-y-4">
      <PaymentsShowcase />
      <p className="text-xs text-muted-foreground text-center">
        * هذا عرض مفهومي لداشبورد بوابة دفع. اطلب التخصيص الكامل لربطه ببياناتك الفعلية وبوابات الدفع المحلية.
      </p>
    </div>
  );
}
