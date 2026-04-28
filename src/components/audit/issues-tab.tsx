"use client";

import { useState } from "react";
import { cn, severityClass, engineBadgeClass } from "@/lib/utils";
import type { Issue } from "@/data/types";

interface Props {
  issues: Issue[];
}

export function IssuesTab({ issues }: Props) {
  const [expandedId, setExpandedId] = useState<number | null>(issues[0]?.id ?? null);

  return (
    <div className="space-y-3">
      <div className="flex items-baseline gap-3 mb-5">
        <h2 className="text-lg font-semibold">Ranked issues</h2>
        <span className="text-[13px] text-muted-foreground">{issues.length} issues by severity</span>
      </div>

      {issues.map((issue) => (
        <div key={issue.id} className="goat-card overflow-hidden">
          {/* Header */}
          <button
            onClick={() => setExpandedId(expandedId === issue.id ? null : issue.id)}
            className="w-full flex items-start gap-4 p-5 text-left hover:bg-muted/30 transition-colors"
          >
            <span className="text-[13px] font-mono text-muted-foreground tabular-nums">
              {String(issue.id).padStart(2, "0")}
            </span>
            <span className={cn("flex-shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase", severityClass(issue.severity))}>
              {issue.severity}
            </span>
            <div className="flex-1 min-w-0">
              <div className="text-[14px] font-medium">{issue.title}</div>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <span className="text-[11px] text-muted-foreground">{issue.pillar}</span>
                <span className="text-muted-foreground">·</span>
                {issue.engines.map((e) => (
                  <span key={e} className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-medium", engineBadgeClass(e))}>
                    {e}
                  </span>
                ))}
              </div>
            </div>
            <svg
              className={cn("w-4 h-4 text-muted-foreground transition-transform flex-shrink-0 mt-1", expandedId === issue.id && "rotate-180")}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {/* Expanded */}
          {expandedId === issue.id && (
            <div className="border-t border-border px-5 py-5 space-y-5">
              {/* What's wrong */}
              <div>
                <h4 className="goat-eyebrow mb-2">What&apos;s happening</h4>
                <p className="text-[13px] leading-relaxed" dangerouslySetInnerHTML={{ __html: issue.what }} />
              </div>

              {/* Evidence */}
              {issue.evidence.length > 0 && (
                <div>
                  <h4 className="goat-eyebrow mb-2">Evidence</h4>
                  <div className="space-y-2">
                    {issue.evidence.map((ev, i) => (
                      <div key={i} className="rounded-lg bg-muted/50 p-3">
                        {ev.engine && ev.query && (
                          <div className="text-[11px] text-muted-foreground mb-1">
                            <strong>{ev.engine}</strong> · &ldquo;{ev.query}&rdquo;
                          </div>
                        )}
                        {ev.quote && (
                          <p className="text-[13px] italic leading-relaxed" dangerouslySetInnerHTML={{ __html: ev.quote }} />
                        )}
                        {ev.source && (
                          <div className="text-[11px] text-muted-foreground">
                            Source: {ev.source}
                            {ev.stat && <span className="ml-2 rounded bg-destructive/10 text-destructive px-1 py-0.5 text-[10px] font-medium uppercase">{ev.stat}</span>}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reassurance */}
              <div className="rounded-lg border border-primary/20 bg-primary/5 p-3">
                <h4 className="text-[12px] font-semibold text-primary mb-1">What you&apos;re doing right</h4>
                <p className="text-[13px] text-muted-foreground leading-relaxed">{issue.reassure}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
