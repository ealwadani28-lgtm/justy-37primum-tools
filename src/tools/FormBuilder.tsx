import { useState } from "react";
import { ActionBar } from "@/components/ActionBar";

type Field = { id: string; type: "text" | "email" | "textarea" | "select"; label: string; options?: string[] };

function buildHtml(fields: Field[]) {
  const rows = fields
    .map((f) => {
      if (f.type === "textarea")
        return `  <label>${f.label}<textarea name="${f.id}" required></textarea></label>`;
      if (f.type === "select")
        return `  <label>${f.label}<select name="${f.id}">${(f.options ?? [])
          .map((o) => `<option>${o}</option>`)
          .join("")}</select></label>`;
      return `  <label>${f.label}<input type="${f.type}" name="${f.id}" required /></label>`;
    })
    .join("\n");
  return `<form dir="rtl" action="#" method="post">\n${rows}\n  <button type="submit">إرسال</button>\n</form>`;
}

export function FormBuilder() {
  const [fields, setFields] = useState<Field[]>([
    { id: "1", type: "text", label: "الاسم الكامل" },
    { id: "2", type: "email", label: "البريد الإلكتروني" },
    { id: "3", type: "textarea", label: "رسالتك" },
  ]);
  const [submitted, setSubmitted] = useState(false);

  const add = (type: Field["type"]) => {
    setFields([
      ...fields,
      {
        id: Date.now().toString(),
        type,
        label: `حقل ${type === "select" ? "اختيار" : type}`,
        options: type === "select" ? ["خيار 1", "خيار 2"] : undefined,
      },
    ]);
  };
  const remove = (id: string) => setFields(fields.filter((f) => f.id !== id));
  const update = (id: string, label: string) =>
    setFields(fields.map((f) => (f.id === id ? { ...f, label } : f)));

  const html = buildHtml(fields);

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h3 className="font-bold mb-4">المُنشئ</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {(["text", "email", "textarea", "select"] as const).map((t) => (
              <button
                key={t}
                onClick={() => add(t)}
                className="text-xs bg-secondary border border-border px-3 py-2 rounded-lg hover:border-primary"
              >
                + {t}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {fields.map((f) => (
              <div
                key={f.id}
                className="flex gap-2 items-center bg-secondary border border-border rounded-xl p-2"
              >
                <span className="text-xs text-muted-foreground w-16">{f.type}</span>
                <input
                  value={f.label}
                  onChange={(e) => update(f.id, e.target.value)}
                  className="flex-1 bg-input rounded px-2 py-1 text-sm"
                />
                <button
                  onClick={() => remove(f.id)}
                  className="text-destructive text-sm w-7 h-7 rounded hover:bg-destructive/10"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-4">المعاينة</h3>
          {submitted ? (
            <div className="bg-primary/10 border border-primary text-primary p-6 rounded-2xl text-center">
              ✓ تم الإرسال بنجاح!
              <button
                onClick={() => setSubmitted(false)}
                className="block mx-auto mt-3 text-xs underline"
              >
                إعادة
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-3 bg-secondary border border-border rounded-2xl p-5"
            >
              {fields.map((f) => (
                <div key={f.id}>
                  <label className="text-xs font-semibold block mb-1">{f.label}</label>
                  {f.type === "textarea" ? (
                    <textarea required className="w-full bg-input rounded-lg p-2 text-sm" rows={3} />
                  ) : f.type === "select" ? (
                    <select className="w-full bg-input rounded-lg p-2 text-sm">
                      {f.options?.map((o) => (
                        <option key={o}>{o}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={f.type}
                      required
                      className="w-full bg-input rounded-lg p-2 text-sm"
                    />
                  )}
                </div>
              ))}
              <button className="w-full bg-mint-gradient text-primary-foreground font-semibold py-2 rounded-lg">
                إرسال
              </button>
            </form>
          )}
        </div>
      </div>

      <div>
        <label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">
          كود HTML الجاهز
        </label>
        <pre
          dir="ltr"
          className="text-xs bg-background border border-border rounded-xl p-3 overflow-auto whitespace-pre font-mono max-h-48"
        >
          {html}
        </pre>
      </div>

      <ActionBar
        copyText={html}
        copyLabel="نسخ كود HTML"
        downloadText={{ content: html, filename: "form.html", mime: "text/html" }}
        downloadLabel="تحميل HTML"
        share={{ title: "نموذج", text: "نموذج HTML تم إنشاؤه" }}
      />
    </div>
  );
}
