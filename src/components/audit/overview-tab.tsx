"use client";

import { cn, scoreColor, scoreLabel } from "@/lib/utils";
import type { AuditSummary, Issue } from "@/data/types";

interface Props {
  audit: AuditSummary;
  issues: Issue[];
  onTabChange: (tab: "Overview" | "Pillars" | "Issues" | "Playbooks" | "Engines") => void;
}

export function OverviewTab({ audit, issues, onTabChange }: Props) {
  return (
    <div className="space-y-10">
      {/* Pillar grid */}
      <section>
        <div className="flex items-baseline gap-3 mb-5">
          <h2 className="text-lg font-semibold">Pillar breakdown</h2>
          <span className="text-[13px] text-muted-foreground">5 pillars, 40 criteria</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
          {audit.pillars.map((p) => (
            <button
              key={p.name}
              onClick={() => onTabChange("Pillars")}
              className="goat-card p-4 text-left hover:shadow-sm transition-shadow"
            >
              <div className="text-[11px] text-muted-foreground mb-1">{p.name}</div>
              <div className="flex items-baseline gap-2">
                <span className={cn("text-2xl font-bold tabular-nums", scoreColor(p.score))}>
                  {p.score}
                </span>
                <span className={cn(
                  "text-[11px] font-medium tabular-nums",
                  p.delta >= 0 ? "text-primary" : "text-destructive"
                )}>
                  {p.delta >= 0 ? "+" : ""}{p.delta}
                </span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${p.score}%` }}
                />
              </div>
              <div className="mt-1.5 text-[11px] text-muted-foreground">
                {scoreLabel(p.score)} · {p.weight}%
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Quick insight */}
      <section className="goat-card p-6">
        <h3 className="text-[14px] font-semibold mb-2">Key finding</h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Driven by <strong className="text-foreground">Citation Presence (48)</strong> and{" "}
          <strong className="text-foreground">Answer Quality (54)</strong>. Each engine has different
          problems — Claude hallucinates, ChatGPT has stale pricing, Perplexity can&apos;t find your
          docs. Content Architecture (78) is your strongest pillar and well above median.
        </p>
      </section>

      {/* Top issues preview */}
      <section>
        <div className="flex items-baseline justify-between mb-5">
          <div className="flex items-baseline gap-3">
            <h2 className="text-lg font-semibold">Top issues</h2>
            <span className="text-[13px] text-muted-foreground">{issues.length} found</span>
          </div>
          <button
            onClick={() => onTabChange("Issues")}
            className="text-[13px] text-primary font-medium hover:underline"
          >
            View all →
          </button>
        </div>

        <div className="space-y-3">
          {issues.slice(0, 3).map((issue) => (
            <button
              key={issue.id}
              onClick={() => onTabChange("Issues")}
              className="goat-card w-full p-4 text-left hover:shadow-sm transition-shadow flex items-start gap-4"
            >
              <span className={cn(
                "flex-shrink-0 mt-0.5 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase",
                issue.severity === "critical" ? "bg-destructive/10 text-destructive" :
                issue.severity === "high" ? "bg-amber-500/10 text-amber-700" :
                "bg-blue-500/10 text-blue-700"
              )}>
                {issue.severity}
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-[14px] font-medium">{issue.title}</div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[11px] text-muted-foreground">{issue.pillar}</span>
                  <span className="text-muted-foreground">·</span>
                  <div className="flex gap-1">
                    {issue.engines.map((e) => (
                      <span key={e} className="rounded-full bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                        {e}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Playbook callout */}
      <section className="goat-card p-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-[14px] font-semibold mb-1">
            {audit.playbooksGenerated} engine-specific playbooks generated
          </h3>
          <p className="text-[13px] text-muted-foreground">
            Start with Issue 01 — a two-day fix that clears Claude&apos;s acquisition hallucination.
          </p>
        </div>
        <button
          onClick={() => onTabChange("Playbooks")}
          className="rounded-lg bg-primary px-5 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap"
        >
          View playbooks →
        </button>
      </section>
    </div>
  );
}
