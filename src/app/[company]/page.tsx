import Link from "next/link";
import { ScoreRing } from "@/components/score-ring";
import { kanboAudit } from "@/data/mock-kanbo";
import { cn, scoreColor, scoreLabel } from "@/lib/utils";

interface Props {
  params: Promise<{ company: string }>;
}

export function generateStaticParams() {
  return [{ company: "kanbo" }];
}

export async function generateMetadata({ params }: Props) {
  const { company } = await params;
  const name = company.charAt(0).toUpperCase() + company.slice(1);
  return {
    title: `${name} — GOAT Score | GoatEO`,
    description: `${name}'s AEO performance profile. GOAT Score, pillar breakdown, and AI engine visibility.`,
  };
}

export default async function CompanyProfilePage({ params }: Props) {
  const { company } = await params;

  // Only kanbo has mock data
  if (company !== "kanbo") {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-3">Company not found</h1>
        <p className="text-muted-foreground text-[14px]">
          No profile for &ldquo;{company}&rdquo;. Try{" "}
          <Link href="/kanbo" className="text-primary underline">kanbo</Link>.
        </p>
      </div>
    );
  }

  const audit = kanboAudit;

  return (
    <>
      {/* Profile hero */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-4xl px-6 py-12">
          <div className="flex items-center gap-2 text-[12px] text-muted-foreground mb-6">
            <Link href="/leaderboard" className="hover:text-foreground transition-colors">Leaderboard</Link>
            <span>/</span>
            <span className="text-foreground">{audit.company}</span>
          </div>

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
            <ScoreRing score={audit.score} size={120} label="GOAT Score" />
            <div>
              <h1 className="text-3xl font-bold">{audit.company}</h1>
              <p className="text-[14px] text-muted-foreground mt-1">
                {audit.domain} · {audit.category} · #{34} in leaderboard
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className={cn(
                  "text-[13px] font-semibold",
                  audit.delta >= 0 ? "text-primary" : "text-destructive"
                )}>
                  {audit.delta >= 0 ? "+" : ""}{audit.delta} pts this week
                </span>
                <span className="text-[13px] text-muted-foreground">
                  {scoreLabel(audit.score)} · Bottom {audit.percentile}th percentile
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-6 py-10 space-y-10">
        {/* Pillar breakdown */}
        <section>
          <h2 className="text-lg font-semibold mb-5">Pillar breakdown</h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
            {audit.pillars.map((p) => (
              <div key={p.name} className="goat-card p-4 text-center">
                <div className={cn("text-2xl font-bold tabular-nums", scoreColor(p.score))}>
                  {p.score}
                </div>
                <div className="text-[11px] text-muted-foreground mt-1">{p.name}</div>
                <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${p.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Engine visibility */}
        <section>
          <h2 className="text-lg font-semibold mb-5">Engine visibility</h2>
          <div className="goat-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="goat-eyebrow text-left px-4 py-3">Engine</th>
                  <th className="goat-eyebrow text-right px-4 py-3">Mentions</th>
                  <th className="goat-eyebrow text-left px-4 py-3">Sentiment</th>
                  <th className="goat-eyebrow text-right px-4 py-3">Hallucinations</th>
                </tr>
              </thead>
              <tbody>
                {audit.engines.map((eng) => (
                  <tr key={eng.name} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 text-[13px] font-medium">{eng.name}</td>
                    <td className="px-4 py-3 text-[13px] text-right tabular-nums">
                      {eng.mentions}/{eng.total}
                    </td>
                    <td className="px-4 py-3 text-[12px] capitalize text-muted-foreground">
                      {eng.sentiment}
                    </td>
                    <td className={cn(
                      "px-4 py-3 text-[13px] text-right tabular-nums",
                      eng.hallucinations > 0 ? "text-destructive font-medium" : "text-muted-foreground"
                    )}>
                      {eng.hallucinations}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Claim / full audit CTA */}
        <section className="goat-card p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-[15px] font-semibold mb-1">This is your company?</h3>
              <p className="text-[13px] text-muted-foreground">
                Claim your profile to access the full audit report, engine-specific playbooks,
                and competitor tracking.
              </p>
            </div>
            <div className="flex gap-2">
              <Link
                href={`/audit/${company}`}
                className="rounded-lg border border-border px-4 py-2 text-[13px] font-medium hover:bg-muted transition-colors whitespace-nowrap"
              >
                View full audit
              </Link>
              <button className="rounded-lg bg-primary px-4 py-2 text-[13px] font-medium text-primary-foreground hover:opacity-90 transition-opacity whitespace-nowrap">
                Claim profile
              </button>
            </div>
          </div>
        </section>

        {/* Embeddable badge */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Embeddable badge</h2>
          <p className="text-[13px] text-muted-foreground mb-4">
            Add your GOAT Score badge to your website. Free for all companies.
          </p>
          <div className="goat-card p-5">
            {/* Badge preview */}
            <div className="mb-4 flex items-center gap-3 rounded-lg bg-muted/50 p-4 w-fit">
              <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground text-[11px] font-bold">
                G
              </span>
              <div className="text-[13px]">
                <span className="font-semibold">GOAT Score: {audit.score}</span>
                <span className="text-muted-foreground ml-2">Scored by GoatEO</span>
              </div>
            </div>
            {/* Embed code */}
            <pre className="rounded-lg bg-muted p-3 text-[12px] font-mono text-muted-foreground overflow-x-auto">
              {`<a href="https://goateo.ai/${company}"><img src="https://goateo.ai/badge/${company}.svg" alt="GOAT Score: ${audit.score}" /></a>`}
            </pre>
          </div>
        </section>
      </div>
    </>
  );
}
