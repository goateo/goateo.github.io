"use client";

import { useState } from "react";
import { cn, severityClass, engineBadgeClass } from "@/lib/utils";
import type { Playbook } from "@/data/types";

interface Props {
  playbooks: Playbook[];
}

export function PlaybooksTab({ playbooks }: Props) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);
  const [showSteps, setShowSteps] = useState<Record<number, boolean>>({});

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-lg font-semibold">Remediation playbooks</h2>
        <span className="text-[13px] text-muted-foreground">Engine-specific fixes</span>
      </div>

      {playbooks.map((pb, idx) => (
        <div key={`${pb.issue}-${pb.engine}`} className="goat-card overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            className="w-full flex items-start gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
          >
            <span className={cn("flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase", severityClass(pb.severity))}>
              {pb.severity}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium">{pb.issueTitle}</div>
              <div className="mt-1 flex items-center gap-2">
                <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", engineBadgeClass(pb.engine))}>
                  {pb.engine}
                </span>
                <span className="text-[11px] text-muted-foreground">
                  {pb.steps.length} steps · {pb.expectedImpact}
                </span>
              </div>
            </div>
            <svg
              className={cn("w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 mt-1", expandedIdx === idx && "rotate-180")}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Expanded */}
          {expandedIdx === idx && (
            <div className="border-t border-border px-5 py-5 space-y-4">
              <div>
                <h4 className="goat-eyebrow mb-2">What&apos;s wrong</h4>
                <p className="text-[13px] leading-relaxed">{pb.whatsWrong}</p>
              </div>
              <div>
                <h4 className="goat-eyebrow mb-2">Why it matters</h4>
                <p className="text-[13px] leading-relaxed text-muted-foreground">{pb.whyItMatters}</p>
              </div>

              {/* Fix steps */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="goat-eyebrow">Fix steps</h4>
                  <button
                    onClick={() => setShowSteps(s => ({ ...s, [idx]: !s[idx] }))}
                    className="text-[11px] text-primary font-medium hover:underline"
                  >
                    {showSteps[idx] ? "Hide details" : "Show details"}
                  </button>
                </div>
                <div className="space-y-2">
                  {pb.steps.map((step, si) => (
                    <div key={si} className="rounded-lg border border-border p-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-start gap-2">
                          <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-primary text-[11px] font-bold mt-0.5">
                            {si + 1}
                          </span>
                          <span className="text-[13px] font-medium">{step.t}</span>
                        </div>
                        <span className="flex-shrink-0 rounded bg-muted px-1.5 py-0.5 text-[11px] text-muted-foreground font-mono">
                          {step.e}
                        </span>
                      </div>
                      {showSteps[idx] && (
                        <p className="mt-2 ml-7 text-[12px] text-muted-foreground leading-relaxed">
                          {step.d}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-lg bg-primary/5 border border-primary/20 p-3">
                <span className="text-[12px] font-semibold text-primary">Expected impact: </span>
                <span className="text-[12px] text-muted-foreground">{pb.expectedImpact}</span>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
