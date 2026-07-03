import React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface IssueItem {
  url: string;
  issue: string;
  coverage?: string;
}

interface Props {
  issueCount?: number;
  urlsChecked?: number;
  issues?: IssueItem[];
}

const Email = ({ issueCount = 0, urlsChecked = 0, issues = [] }: Props) => (
  <Html lang="ar" dir="rtl">
    <Head />
    <Preview>{`تنبيه فهرسة Google — ${issueCount} مشكلة على ${urlsChecked} رابط`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>🚨 تنبيه فهرسة Google Search Console</Heading>
        <Text style={p}>
          الفحص الأسبوعي التلقائي رصد <b>{issueCount}</b> مشكلة فهرسة على أصل{" "}
          <b>justlator.com</b> (من أصل {urlsChecked} رابط تم فحصه).
        </Text>

        <Section style={box}>
          {issues.map((i) => (
            <div key={i.url} style={row}>
              <Text style={urlText}>{i.url}</Text>
              <Text style={badge}>
                {i.issue}
                {i.coverage ? ` — ${i.coverage}` : ""}
              </Text>
            </div>
          ))}
        </Section>

        <Text style={p}>
          الأنواع المرصودة: <code>noindex</code> / <code>soft_404</code> /{" "}
          <code>blocked_by_robots</code>.
        </Text>
        <Text style={muted}>
          تم إنشاء هذا التنبيه تلقائياً من مراقب فهرسة Justlator.
        </Text>
      </Container>
    </Body>
  </Html>
);

const main = { backgroundColor: "#ffffff", fontFamily: "Tajawal, Arial, sans-serif" };
const container = { padding: "24px", maxWidth: "600px", margin: "0 auto" };
const h1 = { fontSize: "20px", color: "#0f1a16", margin: "0 0 16px" };
const p = { fontSize: "14px", color: "#334", lineHeight: "1.7" };
const muted = { fontSize: "12px", color: "#888", marginTop: "24px" };
const box = {
  border: "1px solid #e5e7eb",
  borderRadius: "8px",
  padding: "12px",
  margin: "16px 0",
  backgroundColor: "#fafafa",
};
const row = { borderBottom: "1px solid #eee", padding: "8px 0" };
const urlText = { fontSize: "13px", color: "#0369a1", margin: "0", wordBreak: "break-all" as const };
const badge = { fontSize: "12px", color: "#b91c1c", margin: "4px 0 0", fontWeight: 600 };

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    `🚨 ${data.issueCount ?? 0} مشكلة فهرسة على justlator.com`,
  displayName: "تنبيه فهرسة Google",
  previewData: {
    issueCount: 2,
    urlsChecked: 37,
    issues: [
      { url: "https://justlator.com/tools/old-slug", issue: "noindex", coverage: "Excluded by 'noindex' tag" },
      { url: "https://justlator.com/tools/missing", issue: "soft_404", coverage: "Soft 404" },
    ],
  },
} satisfies TemplateEntry;
