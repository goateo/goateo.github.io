import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-semibold text-[15px] mb-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground text-[10px] font-bold">
                G
              </span>
              GoatEO
            </div>
            <p className="text-[13px] text-muted-foreground leading-relaxed max-w-md">
              The AI scoring platform for B2B SaaS. We ask each AI engine what
              it thinks about you, score the real responses against a published
              rubric, and tell you exactly what to fix.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="goat-eyebrow mb-3">Platform</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/leaderboard" className="text-muted-foreground hover:text-foreground transition-colors">Leaderboard</Link></li>
              <li><Link href="/methodology" className="text-muted-foreground hover:text-foreground transition-colors">Methodology</Link></li>
              <li><span className="text-muted-foreground/50">Agent Eval (coming soon)</span></li>
            </ul>
          </div>

          {/* Audit */}
          <div>
            <h4 className="goat-eyebrow mb-3">Resources</h4>
            <ul className="space-y-2 text-[13px]">
              <li><Link href="/methodology" className="text-muted-foreground hover:text-foreground transition-colors">Scoring rubric v0.1</Link></li>
              <li><span className="text-muted-foreground/50">API docs (coming soon)</span></li>
              <li><span className="text-muted-foreground/50">Blog (coming soon)</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12px] text-muted-foreground">
            Scored by the GoatEO AI scoring platform against the GOAT Score
            rubric v0.1. The rubric framework, scoring methodology, and audit
            type definitions are public and versioned.
          </p>
          <div className="flex items-center gap-4 text-[12px] text-muted-foreground">
            <span>Scoring method: Direct engine queries</span>
            <span>Audit type: AEO v0.1</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
