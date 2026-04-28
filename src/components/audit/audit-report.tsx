"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ScoreRing } from "@/components/score-ring";
import { OverviewTab } from "./overview-tab";
import { PillarsTab } from "./pillars-tab";
import { IssuesTab } from "./issues-tab";
import { PlaybooksTab } from "./playbooks-tab";
import { EnginesTab } from "./engines-tab";
import type { AuditSummary, PillarDetail, Issue, Playbook } from "@/data/types";

const tabs = ["Overview", "Pillars", "Issues", "Playbooks", "Engines"] as const;
type Tab = (typeof tabs)[number];

interface Props {
  audit: AuditSummary;
  pillarDetails: PillarDetail[];
  issues: Issue[];
  playbooks: Playbook[];
}

export function AuditReport({ audit, pillarDetails, issues, playbooks }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-10">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground mb-6">
            <Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link>
            <span>/</span>
            <Link href={`/${audit.company.toLowerCase()}`} className="hover:text-foreground transition-colors">{audit.company}</Link>
            <span>/</span>
            <span className="text-foreground">AEO Audit</span>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <ScoreRing score={audit.score} size={100} label="GOAT Score" />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold">{audit.company}</h1>
                <span className="text-[13px] text-muted-foreground">{audit.domain}</span>
                <span className={cn(
                  "text-[12px] font-semibold tabular-nums",
                  audit.delta >= 0 ? "text-primary" : "text-destructive"
                )}>
                  {audit.delta >= 0 ? "+" : ""}{audit.delta} pts
                </span>
              </div>
              <p className="text-[13px] text-muted-foreground">
                {audit.queriesRun} queries · {audit.enginesUsed} engines · {audit.issuesFound} issues · {audit.playbooksGenerated} playbooks · Run {audit.runDate}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="sticky top-14 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6">
          <nav className="flex gap-1 -mb-px">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "px-4 py-3 text-[13px] font-medium border-b-2 transition-colors",
                  activeTab === tab
                    ? "border-primary text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                )}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="mx-auto max-w-6xl px-6 py-8">
        {activeTab === "Overview" && (
          <OverviewTab audit={audit} issues={issues} onTabChange={setActiveTab} />
        )}
        {activeTab === "Pillars" && (
          <PillarsTab details={pillarDetails} />
        )}
        {activeTab === "Issues" && (
          <IssuesTab issues={issues} />
        )}
        {activeTab === "Playbooks" && (
          <PlaybooksTab playbooks={playbooks} />
        )}
        {activeTab === "Engines" && (
          <EnginesTab engines={audit.engines} />
        )}
      </div>
    </>
  );
}
