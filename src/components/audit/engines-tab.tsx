"use client";

import { cn, engineBadgeClass } from "@/lib/utils";
import type { Engine } from "@/data/types";

interface Props {
  engines: Engine[];
}

export function EnginesTab({ engines }: Props) {
  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-lg font-semibold">Engine breakdown</h2>
        <span className="text-[13px] text-muted-foreground">How each AI engine sees you</span>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {engines.map((eng) => {
          const mentionPct = Math.round((eng.mentions / eng.total) * 100);
          return (
            <div key={eng.name} className="goat-card p-5">
              <div className="flex items-center justify-between mb-3">
                <span className={cn("rounded-full px-2 py-0.5 text-[12px] font-semibold", engineBadgeClass(eng.name))}>
                  {eng.name}
                </span>
                <span className="text-[11px] text-muted-foreground">{eng.playbooks} playbooks</span>
              </div>

              {/* Mention rate */}
              <div className="mb-3">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-[12px] text-muted-foreground">Mention rate</span>
                  <span className="text-[14px] font-semibold tabular-nums">
                    {eng.mentions}/{eng.total}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${mentionPct}%` }}
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 text-[12px]">
                <div>
                  <span className="text-muted-foreground">Sentiment</span>
                  <div className={cn(
                    "font-medium capitalize",
                    eng.sentiment === "positive" ? "text-primary" :
                    eng.sentiment === "mixed" ? "text-amber" :
                    "text-muted-foreground"
                  )}>
                    {eng.sentiment}
                  </div>
                </div>
                <div>
                  <span className="text-muted-foreground">Hallucinations</span>
                  <div className={cn(
                    "font-medium",
                    eng.hallucinations > 0 ? "text-destructive" : "text-primary"
                  )}>
                    {eng.hallucinations}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-border">
                <span className="text-[11px] text-muted-foreground">{eng.source}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Insight */}
      <div className="goat-card p-5 mt-6">
        <h3 className="text-[14px] font-semibold mb-2">Cross-engine insight</h3>
        <p className="text-[13px] text-muted-foreground leading-relaxed">
          Perplexity is your best surface — Sonar heavily weights recent web content where your blog performs well.
          Claude is worst, driven by the acquisition hallucination (Issue 01) and stale pre-training data.
          Each engine has separate playbooks because what works for one doesn&apos;t work for another.
        </p>
      </div>
    </div>
  );
}
