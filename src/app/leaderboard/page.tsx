"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, scoreColor } from "@/lib/utils";
import { leaderboardData, categories } from "@/data/mock-kanbo";

export default function LeaderboardPage() {
  const [category, setCategory] = useState("All");

  const filtered = category === "All"
    ? leaderboardData
    : leaderboardData.filter((e) => e.category === category);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-12">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="goat-eyebrow">Public Leaderboard</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">GOAT Score Rankings</h1>
          <p className="text-[15px] text-muted-foreground max-w-xl">
            Top B2B SaaS companies ranked by AEO performance. Scores updated weekly
            from real AI engine responses.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {categories.slice(0, 10).map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cn(
                "rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
                category === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="goat-card overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="goat-eyebrow text-left px-4 py-3 w-12">#</th>
                <th className="goat-eyebrow text-left px-4 py-3">Company</th>
                <th className="goat-eyebrow text-left px-4 py-3 hidden sm:table-cell">Category</th>
                <th className="goat-eyebrow text-right px-4 py-3">Score</th>
                <th className="goat-eyebrow text-right px-4 py-3 hidden md:table-cell">Trend</th>
                <th className="goat-eyebrow text-left px-4 py-3 hidden lg:table-cell">Strongest</th>
                <th className="goat-eyebrow text-left px-4 py-3 hidden lg:table-cell">Weakest</th>
                <th className="goat-eyebrow text-center px-4 py-3 w-20">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((entry) => (
                <tr
                  key={entry.rank}
                  className={cn(
                    "border-b border-border last:border-0 hover:bg-muted/30 transition-colors",
                    entry.company === "Kanbo" && "bg-primary/5"
                  )}
                >
                  <td className="px-4 py-3 text-[13px] text-muted-foreground tabular-nums">
                    {entry.rank}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/${entry.company.toLowerCase()}`}
                      className="text-[14px] font-medium hover:text-primary transition-colors"
                    >
                      {entry.company}
                    </Link>
                    <div className="text-[11px] text-muted-foreground">{entry.domain}</div>
                  </td>
                  <td className="px-4 py-3 hidden sm:table-cell">
                    <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                      {entry.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className={cn("text-[16px] font-bold tabular-nums", scoreColor(entry.score))}>
                      {entry.score}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right hidden md:table-cell">
                    <span className={cn(
                      "text-[12px] font-medium tabular-nums",
                      entry.delta > 0 ? "text-primary" : entry.delta < 0 ? "text-destructive" : "text-muted-foreground"
                    )}>
                      {entry.delta > 0 ? "+" : ""}{entry.delta}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground hidden lg:table-cell">
                    {entry.topPillar}
                  </td>
                  <td className="px-4 py-3 text-[12px] text-muted-foreground hidden lg:table-cell">
                    {entry.weakPillar}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {entry.claimed ? (
                      <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
                        Claimed
                      </span>
                    ) : (
                      <span className="text-[11px] text-muted-foreground">Unclaimed</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Claim CTA */}
        <div className="mt-8 goat-card p-6 text-center">
          <h3 className="text-[15px] font-semibold mb-2">Don&apos;t see your company?</h3>
          <p className="text-[13px] text-muted-foreground mb-4 max-w-md mx-auto">
            Run a free audit to get your GOAT Score and claim your spot on the leaderboard.
          </p>
          <Link
            href="/"
            className="inline-flex rounded-lg bg-primary px-5 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90 transition-opacity"
          >
            Get your score →
          </Link>
        </div>
      </div>
    </>
  );
}
