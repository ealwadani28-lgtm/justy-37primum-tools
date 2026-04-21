import { ComponentType } from "react";
import { QrGenerator } from "./QrGenerator";
import { Countdown } from "./Countdown";
import { Counter } from "./Counter";
import { Faq } from "./Faq";
import { Polls } from "./Polls";
import { BeforeAfter } from "./BeforeAfter";
import { Translator } from "./Translator";
import { Recipes } from "./Recipes";
import { Popup } from "./Popup";
import { Menu } from "./Menu";
import { Team } from "./Team";
import { Charts } from "./Charts";
import { Protection } from "./Protection";
import { Pricing } from "./Pricing";
import { Audio } from "./Audio";
import { Timeline } from "./Timeline";
import { VideoBanner } from "./VideoBanner";
import { Testimonials } from "./Testimonials";
import { OpenHours } from "./OpenHours";
import { TrustBadges } from "./TrustBadges";
import { PdfViewer } from "./PdfViewer";
import { Gdpr } from "./Gdpr";
import { Whatsapp } from "./Whatsapp";
import { FormBuilder } from "./FormBuilder";
import { SecurityAudit } from "./SecurityAudit";
import { SentimentAi } from "./SentimentAi";
import { Heatmap } from "./Heatmap";

export const toolRegistry: Record<string, ComponentType> = {
  "qr-generator": QrGenerator,
  countdown: Countdown,
  counter: Counter,
  faq: Faq,
  polls: Polls,
  "before-after": BeforeAfter,
  translator: Translator,
  recipes: Recipes,
  popup: Popup,
  menu: Menu,
  team: Team,
  charts: Charts,
  protection: Protection,
  pricing: Pricing,
  audio: Audio,
  timeline: Timeline,
  "video-banner": VideoBanner,
  testimonials: Testimonials,
  "open-hours": OpenHours,
  "trust-badges": TrustBadges,
  "pdf-viewer": PdfViewer,
  gdpr: Gdpr,
  whatsapp: Whatsapp,
  "form-builder": FormBuilder,
  "security-audit": SecurityAudit,
  "sentiment-ai": SentimentAi,
  heatmap: Heatmap,
};
