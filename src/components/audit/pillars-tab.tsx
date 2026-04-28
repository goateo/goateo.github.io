"use client";

import { useState } from "react";
import { cn, scoreColor } from "@/lib/utils";
import type { PillarDetail } from "@/data/types";

interface Props {
  details: PillarDetail[];
}

export function PillarsTab({ details }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-lg font-semibold">Pillar breakdown</h2>
        <span className="text-[13px] text-muted-foreground">Signals, benchmarks, and recommendations</span>
      </div>

      {details.map((pillar, idx) => (
        <div key={pillar.name} className="goat-card overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex items-center gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
          >
            <span className={cn("text-2xl font-bold tabular-nums w-12", scoreColor(pillar.score))}>
              {pillar.score}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-semibold">{pillar.name}</div>
              <div className="text-[12px] text-muted-foreground">Weight: {pillar.weight}</div>
            </div>
            <svg
              className={cn("w-4 h-4 text-muted-foreground transition-transform", openIdx === idx && "rotate-180")}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Expanded content */}
          {openIdx === idx && (
            <div className="border-t border-border px-5 py-5 space-y-6">
              {/* Signals grid */}
              <div>
                <h4 className="goat-eyebrow mb-3">Signals</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {pillar.signals.map((sig) => (
                    <div key={sig.name} className="rounded-lg border border-border p-3">
                      <div className="flex items-baseline justify-between mb-1">
                        <span className="text-[13px] font-medium">{sig.name}</span>
                        <div className="flex items-center gap-2">
                          <span className={cn("text-[14px] font-bold tabular-nums", scoreColor(sig.score))}>
                            {sig.score}
                          </span>
                          <span className="text-[11px] text-muted-foreground">
                            median {sig.median}
                          </span>
                        </div>
                      </div>
                      <p className="text-[12px] text-muted-foreground">{sig.desc}</p>
                      <div className="mt-2 h-1 rounded-full bg-muted overflow-hidden relative">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{ width: `${sig.score}%` }}
                        />
                        {/* Median marker */}
                        <div
                          className="absolute top-0 h-full w-px bg-foreground/30"
                          style={{ left: `${sig.median}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="goat-eyebrow mb-3">Recommendations</h4>
                <div className="space-y-2">
                  {pillar.recs.map((rec, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-lg border border-border p-3">
                      <span className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[13px] leading-relaxed">{rec.text}</p>
                        {rec.issue && (
                          <span className="mt-1 inline-block text-[11px] text-muted-foreground">
                            → Issue #{String(rec.issue).padStart(2, "0")}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
