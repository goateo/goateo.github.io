// GoatEO data types — shared across all pages

export type AuditType = "aeo" | "agent_eval";

export type Severity = "critical" | "high" | "medium" | "low";

export type EngineName = "ChatGPT" | "Claude" | "Perplexity" | "Gemini" | "AI Overviews";

export interface Pillar {
  name: string;
  score: number;
  weight: number;
  delta: number;
  icon: string;
}

export interface PillarDetail {
  name: string;
  score: number;
  weight: string;
  icon: string;
  signals: Signal[];
  recs: Recommendation[];
}

export interface Signal {
  name: string;
  score: number;
  median: number;
  desc: string;
}

export interface Recommendation {
  text: string;
  issue?: number;
}

export interface Engine {
  name: EngineName;
  mentions: number;
  total: number;
  sentiment: string;
  hallucinations: number;
  source: string;
  playbooks: number;
}

export interface PlaybookStep {
  t: string;
  e: string;
  d: string;
}

export interface Playbook {
  issue: number;
  issueTitle: string;
  engine: string;
  severity: Severity;
  whatsWrong: string;
  whyItMatters: string;
  steps: PlaybookStep[];
  expectedImpact: string;
}

export interface IssueEvidence {
  engine?: string;
  query?: string;
  quote?: string;
  source?: string;
  note?: string;
  stat?: string;
}

export interface Issue {
  id: number;
  severity: Severity;
  title: string;
  pillar: string;
  engines: string[];
  what: string;
  reassure: string;
  evidence: IssueEvidence[];
}

export interface LeaderboardEntry {
  rank: number;
  company: string;
  domain: string;
  category: string;
  score: number;
  delta: number;
  topPillar: string;
  weakPillar: string;
  claimed: boolean;
}

export interface AuditSummary {
  company: string;
  domain: string;
  category: string;
  score: number;
  delta: number;
  percentile: number;
  queriesRun: number;
  enginesUsed: number;
  issuesFound: number;
  playbooksGenerated: number;
  runDate: string;
  auditType: AuditType;
  pillars: Pillar[];
  engines: Engine[];
}
