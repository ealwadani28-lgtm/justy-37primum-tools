import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const AR_DIGITS = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];

/** يحوّل الأرقام اللاتينية في النص إلى أرقام عربية-هندية */
export function toArabicDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => AR_DIGITS[Number(d)]);
}

/** يصيغ رقم بفواصل آلاف + أرقام عربية */
export function arNumber(n: number): string {
  return toArabicDigits(n.toLocaleString("en-US"));
}
