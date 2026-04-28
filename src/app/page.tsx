import Link from "next/link";
import { ScoreRing } from "@/components/score-ring";
import { kanboAudit } from "@/data/mock-kanbo";

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">
          <div className="mx-auto mb-6 flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="goat-eyebrow">AI Scoring Platform for B2B SaaS</span>
          </div>
          <h1 className="mx-auto max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
            What does AI actually say about you?
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] text-muted-foreground leading-relaxed">
            We ask each AI engine directly, score the real responses against a
            published 40-criterion rubric, and tell you exactly what to
            fix — with engine-specific playbooks.
          </p>

          {/* URL input CTA */}
          <div className="mx-auto mt-8 flex max-w-md gap-2">
            <input
              type="url"
              placeholder="yourcompany.com"
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2.5 text-[14px] placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <button className="rounded-lg bg-primary px-6 py-2.5 text-[14px] font-medium text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap">
              Get your score
            </button>
          </div>
          <p className="mt-3 text-[12px] text-muted-foreground">
            Free single-engine audit. No credit card required.
          </p>
        </div>
      </section>

      {/* Sample audit preview */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10 flex items-baseline gap-3">
          <h2 className="text-xl font-semibold">Sample audit</h2>
          <span className="text-[13px] text-muted-foreground">See what you get</span>
        </div>

        <Link
          href="/audit/kanbo"
          className="goat-card block p-8 hover:shadow-md transition-shadow group"
        >
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
            {/* Score ring */}
            <div className="flex-shrink-0">
              <ScoreRing score={kanboAudit.score} size={120} />
            </div>

            {/* Summary */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-semibold">{kanboAudit.company}</h3>
                <span className="text-[12px] text-muted-foreground">{kanboAudit.domain}</span>
                <span className="rounded-full bg-muted px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                  {kanboAudit.category}
                </span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed mb-4">
                {kanboAudit.queriesRun} queries across {kanboAudit.enginesUsed} engines.{" "}
                {kanboAudit.issuesFound} issues found, {kanboAudit.playbooksGenerated} playbooks generated.
                Bottom 44th percentile in Project Management.
              </p>

              {/* Pillar mini bars */}
              <div className="grid grid-cols-5 gap-3">
                {kanboAudit.pillars.map((p) => (
                  <div key={p.name}>
                    <div className="flex items-baseline justify-between mb-1">
                      <span className="text-[11px] text-muted-foreground truncate">{p.name}</span>
                      <span className="text-[12px] font-semibold tabular-nums">{p.score}</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full rounded-full bg-primary transition-all"
                        style={{ width: `${p.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow */}
            <div className="hidden sm:flex items-center text-muted-foreground group-hover:text-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </Link>
      </section>

      {/* How it works */}
      <section className="border-t border-border bg-card">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="mb-10 flex items-baseline gap-3">
            <h2 className="text-xl font-semibold">How it works</h2>
            <span className="text-[13px] text-muted-foreground">Three steps, real responses</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                step: "01",
                title: "We query every engine",
                desc: "50 canonical buyer queries sent to ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews. Each engine responds as itself.",
              },
              {
                step: "02",
                title: "We score real responses",
                desc: "40 criteria across 5 pillars. Each engine's actual output is scored against the published rubric. No guessing, no proxies.",
              },
              {
                step: "03",
                title: "You get engine-specific fixes",
                desc: "Severity-ranked remediation playbooks tailored to what each engine rewards. Different engines, different fixes.",
              },
            ].map((s) => (
              <div key={s.step} className="goat-card p-6">
                <span className="text-[12px] font-semibold text-primary">{s.step}</span>
                <h3 className="mt-2 text-[15px] font-semibold">{s.title}</h3>
                <p className="mt-2 text-[13px] text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology teaser */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="goat-card p-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-[15px] font-semibold mb-1">Published methodology</h3>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-lg">
              Every scoring decision is documented, versioned, and public.
              Five pillars, 40 weighted criteria, detection methods, and scoring
              philosophy — all open for scrutiny.
            </p>
          </div>
          <Link
            href="/methodology"
            className="rounded-lg border border-border px-5 py-2 text-[13px] font-medium hover:bg-muted transition-colors whitespace-nowrap"
          >
            Read the rubric →
          </Link>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-10 flex flex-wrap items-center justify-center gap-8 text-[13px] text-muted-foreground">
          <span>5 engines tested</span>
          <span className="h-3 w-px bg-border" />
          <span>40 criteria scored</span>
          <span className="h-3 w-px bg-border" />
          <span>Published rubric</span>
          <span className="h-3 w-px bg-border" />
          <span>Engine-specific playbooks</span>
          <span className="h-3 w-px bg-border" />
          <span>Real responses, not predictions</span>
        </div>
      </section>
    </>
  );
}
