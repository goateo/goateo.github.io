import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scoreColor(score: number): string {
  if (score >= 80) return "text-primary";
  if (score >= 60) return "text-amber-600";
  return "text-destructive";
}

export function scoreBg(score: number): string {
  if (score >= 80) return "bg-primary/10";
  if (score >= 60) return "bg-amber-600/10";
  return "bg-destructive/10";
}

export function scoreLabel(score: number): string {
  if (score >= 80) return "Strong";
  if (score >= 60) return "Moderate";
  if (score >= 40) return "Weak";
  return "Critical";
}

export function engineBadgeClass(engine: string): string {
  const map: Record<string, string> = {
    ChatGPT: "bg-teal-500/10 text-teal-700",
    Claude: "bg-purple-500/10 text-purple-700",
    Perplexity: "bg-blue-500/10 text-blue-700",
    Gemini: "bg-amber-500/10 text-amber-700",
    "AI Overviews": "bg-neutral-500/10 text-neutral-600",
  };
  return map[engine] ?? "bg-neutral-500/10 text-neutral-600";
}

export function severityClass(severity: string): string {
  const map: Record<string, string> = {
    critical: "bg-destructive/10 text-destructive",
    high: "bg-amber-500/10 text-amber-700",
    medium: "bg-blue-500/10 text-blue-700",
    low: "bg-neutral-500/10 text-neutral-600",
  };
  return map[severity] ?? "bg-neutral-500/10 text-neutral-600";
}
