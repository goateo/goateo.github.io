import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Methodology — GoatEO",
  description: "Published scoring rubric v0.1. Five pillars, 40 criteria, detection methods, and scoring philosophy — all open for scrutiny.",
};

const pillars = [
  {
    name: "Discoverability",
    weight: "25%",
    desc: "Can answer engines find you?",
    criteria: [
      "Domain resolvability across AI crawlers",
      "Crawlability for GPTBot, ClaudeBot, PerplexityBot, Google-Extended",
      "llms.txt presence, completeness, and currency",
      "Sitemap freshness and AI-accessible format",
      "Schema.org completeness (Organization, Product, FAQPage)",
      "Canonical signal integrity",
      "Page render cost and JS dependency",
      "CDN / geo-availability for crawler access",
    ],
  },
  {
    name: "Citation Presence",
    weight: "30%",
    desc: "When buyers ask, do you get cited?",
    criteria: [
      "Brand named in direct \"best [category]\" queries (5 queries)",
      "Brand named in comparative queries (10 queries)",
      "Brand named in problem-framing queries (15 queries)",
      "Brand named in objection queries (10 queries)",
      "Brand named in feature queries (10 queries)",
      "Cited-and-positive vs cited-and-neutral vs cited-and-negative",
      "Not-cited detection across all query types",
      "Hallucinated-incorrectly detection",
    ],
  },
  {
    name: "Answer Quality",
    weight: "20%",
    desc: "When cited, is the description accurate?",
    criteria: [
      "Factual accuracy of feature claims",
      "Pricing accuracy across all engines",
      "Positioning clarity — how well engines describe what you do",
      "Competitive framing — how you're positioned vs competitors",
      "Recency of information signal",
      "Hallucination rate — fabricated claims about your product",
    ],
  },
  {
    name: "Source Authority",
    weight: "15%",
    desc: "What sources do engines cite when mentioning you?",
    criteria: [
      "Own-site citation rate",
      "Owned-media citation rate (blog, docs, changelog)",
      "Third-party citation rate (G2, Capterra, TechCrunch)",
      "Community citation rate (Reddit, HN, Stack Overflow)",
      "Stale source detection — how old are the sources engines use",
    ],
  },
  {
    name: "Content Architecture",
    weight: "10%",
    desc: "How well is your site structured for AI consumption?",
    criteria: [
      "FAQ density and structure",
      "Comparison page presence (/compare/you-vs-competitor)",
      "Use-case landing pages",
      "Pricing page transparency and structured data",
      "Documentation coverage and accessibility",
      "Semantic HTML (heading hierarchy, landmark elements)",
      "Answer-first paragraph structure",
    ],
  },
];

const pipeline = [
  { step: "1", title: "Evidence gathering", desc: "Query panel sends 50 prompts to each of the 5 AI engines. Each engine responds as itself. Playwright crawls your site for technical signals." },
  { step: "2", title: "Response analysis", desc: "Parse each engine's raw response into structured evidence: citations found, claims made, sources referenced, factual statements extracted." },
  { step: "3", title: "Rubric scoring", desc: "Structured evidence scored against criterion definitions. Deterministic criteria scored programmatically. Judgment criteria scored against anchored descriptors." },
  { step: "4", title: "Aggregation", desc: "Weighted sum across criteria → pillar score → overall GOAT Score (0-100)." },
  { step: "5", title: "Playbook generation", desc: "For every criterion below threshold, generate engine-specific remediation playbooks grounded in the real findings." },
  { step: "6", title: "Versioning", desc: "Every run is versioned. Methodology changes are auditable. audit_type field determines which rubric applies." },
];

export default function MethodologyPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="goat-eyebrow">Scoring Rubric v0.1</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight mb-3">Methodology</h1>
          <p className="text-[15px] text-muted-foreground leading-relaxed max-w-2xl">
            We don&apos;t guess what AI thinks about you. We ask each engine directly and score what
            it actually says. Every scoring decision is documented, versioned, and public.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-12 space-y-16">
        {/* Core principle */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Core principle</h2>
          <div className="goat-card p-6">
            <p className="text-[14px] font-semibold text-primary mb-2">
              The thing being tested produces the output being scored.
            </p>
            <p className="text-[13px] text-muted-foreground leading-relaxed">
              When you test ChatGPT&apos;s response, ChatGPT is the one answering. The scoring is
              derived from analyzing each engine&apos;s real output against the rubric criteria. We
              don&apos;t ask one model what another model thinks. Every finding is grounded in a real
              response from the engine being evaluated.
            </p>
          </div>
        </section>

        {/* Five pillars */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Five pillars</h2>
          <p className="text-[13px] text-muted-foreground mb-6">40 criteria across 5 weighted pillars</p>

          <div className="space-y-4">
            {pillars.map((pillar) => (
              <div key={pillar.name} className="goat-card p-6">
                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-[15px] font-semibold">{pillar.name}</h3>
                  <span className="text-[12px] font-medium text-primary tabular-nums">{pillar.weight}</span>
                </div>
                <p className="text-[13px] text-muted-foreground mb-4">{pillar.desc}</p>
                <div className="space-y-1.5">
                  {pillar.criteria.map((c, i) => (
                    <div key={i} className="flex items-start gap-2 text-[13px]">
                      <span className="flex-shrink-0 text-primary mt-0.5">•</span>
                      <span className="text-muted-foreground">{c}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Scoring pipeline */}
        <section>
          <h2 className="text-xl font-semibold mb-2">Scoring pipeline</h2>
          <p className="text-[13px] text-muted-foreground mb-6">From query to playbook in 6 steps</p>

          <div className="space-y-3">
            {pipeline.map((step) => (
              <div key={step.step} className="goat-card p-5 flex items-start gap-4">
                <span className="flex-shrink-0 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-[13px] font-bold">
                  {step.step}
                </span>
                <div>
                  <h4 className="text-[14px] font-semibold">{step.title}</h4>
                  <p className="mt-1 text-[13px] text-muted-foreground leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Disclosures */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Disclosures</h2>
          <div className="space-y-3">
            <div className="goat-card p-5">
              <h4 className="text-[14px] font-semibold mb-1">Synthetic panel ≠ real user queries</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                GoatEO runs a curated panel of 50 queries through AI engine APIs. These approximate
                what real buyers ask, but they are not real buyer sessions. The panel composition is
                published and versioned.
              </p>
            </div>
            <div className="goat-card p-5">
              <h4 className="text-[14px] font-semibold mb-1">API responses ≠ consumer UX</h4>
              <p className="text-[13px] text-muted-foreground leading-relaxed">
                API responses may differ from web and mobile app experiences. UI-specific features
                (like citation cards or image results) are not captured. Google AI Overviews are
                captured via SERP proxy to approximate the consumer experience.
              </p>
            </div>
          </div>
        </section>

        {/* What we publish vs hold back */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Transparency stance</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="goat-card p-5">
              <h4 className="text-[14px] font-semibold text-primary mb-3">Published</h4>
              <div className="space-y-1.5 text-[13px] text-muted-foreground">
                {[
                  "Category structure and taxonomy",
                  "Pillar weights and rationale",
                  "Criterion definitions and detection methods",
                  "Scoring philosophy",
                  "Version history with changelogs",
                  "Panel query structure (not exact queries)",
                  "The \"why\" behind every scoring decision",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="goat-card p-5">
              <h4 className="text-[14px] font-semibold text-muted-foreground mb-3">Held back</h4>
              <div className="space-y-1.5 text-[13px] text-muted-foreground">
                {[
                  "Raw prompt templates",
                  "ML features and embeddings",
                  "Proprietary benchmarks",
                  "Exact panel query wording",
                  "Cache architecture",
                  "Abuse defense specifics",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-muted-foreground/50 mt-0.5">—</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
