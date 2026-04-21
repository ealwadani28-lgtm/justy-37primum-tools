import { TalentShowcase } from "@/components/showcases/TalentShowcase";

export function TalentManagement() {
  return (
    <div className="space-y-4">
      <TalentShowcase />
      <p className="text-xs text-muted-foreground text-center">
        * عرض مفهومي لمنصة إدارة المواهب. اطلب التخصيص الكامل لإضافة ملفات الموظفين، تقييمات OKR، وتقارير الأداء.
      </p>
    </div>
  );
}
