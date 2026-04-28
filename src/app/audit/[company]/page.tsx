import Link from "next/link";
import { kanboAudit, kanboPillarDetails, kanboIssues, kanboPlaybooks } from "@/data/mock-kanbo";
import { AuditReport } from "@/components/audit/audit-report";

interface Props {
  params: Promise<{ company: string }>;
}

export function generateStaticParams() {
  return [{ company: "kanbo" }];
}

export async function generateMetadata({ params }: Props) {
  const { company } = await params;
  return {
    title: `${company.charAt(0).toUpperCase() + company.slice(1)} AEO Audit — GoatEO`,
    description: `Full AEO audit for ${company} — GOAT Score, pillar breakdown, engine-specific remediation playbooks.`,
  };
}

export default async function AuditPage({ params }: Props) {
  const { company } = await params;

  // In production this would be a Supabase query
  // For now, only "kanbo" has mock data
  if (company !== "kanbo") {
    return (
      <div className="mx-auto max-w-6xl px-6 py-24 text-center">
        <h1 className="text-2xl font-semibold mb-3">Audit not found</h1>
        <p className="text-muted-foreground text-[14px]">
          No audit data for &ldquo;{company}&rdquo;. Try{" "}
          <Link href="/audit/kanbo" className="text-primary underline">kanbo</Link>.
        </p>
      </div>
    );
  }

  return (
    <AuditReport
      audit={kanboAudit}
      pillarDetails={kanboPillarDetails}
      issues={kanboIssues}
      playbooks={kanboPlaybooks}
    />
  );
}
