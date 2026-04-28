import type { AuditSummary, PillarDetail, Issue, Playbook, LeaderboardEntry } from "./types";

// ── Audit summary ──────────────────────────────────────────────────
export const kanboAudit: AuditSummary = {
  company: "Kanbo",
  domain: "kanbo.com",
  category: "Project Management",
  score: 61,
  delta: -3,
  percentile: 44,
  queriesRun: 250,
  enginesUsed: 5,
  issuesFound: 5,
  playbooksGenerated: 17,
  runDate: "2026-04-24",
  auditType: "aeo",
  pillars: [
    { name: "Discoverability", score: 72, weight: 25, delta: 2, icon: "Search" },
    { name: "Citation Presence", score: 48, weight: 30, delta: -5, icon: "Quote" },
    { name: "Answer Quality", score: 54, weight: 20, delta: -8, icon: "CheckCircle" },
    { name: "Source Authority", score: 61, weight: 15, delta: 1, icon: "Shield" },
    { name: "Content Architecture", score: 78, weight: 10, delta: 4, icon: "LayoutGrid" },
  ],
  engines: [
    { name: "ChatGPT", mentions: 22, total: 50, sentiment: "neutral", hallucinations: 1, source: "OpenAI · GPT-4o via Responses API", playbooks: 5 },
    { name: "Claude", mentions: 18, total: 50, sentiment: "mixed", hallucinations: 3, source: "Anthropic · Sonnet 4.6 with web search", playbooks: 4 },
    { name: "Perplexity", mentions: 28, total: 50, sentiment: "positive", hallucinations: 0, source: "Sonar Pro via REST", playbooks: 4 },
    { name: "Gemini", mentions: 15, total: 50, sentiment: "neutral", hallucinations: 1, source: "Google · Gemini 2.5 Flash with grounding", playbooks: 2 },
    { name: "AI Overviews", mentions: 12, total: 50, sentiment: "neutral", hallucinations: 2, source: "Google · via DataForSEO SERP proxy", playbooks: 2 },
  ],
};

// ── Pillar details ─────────────────────────────────────────────────
export const kanboPillarDetails: PillarDetail[] = [
  {
    name: "Discoverability", score: 72, weight: "25%", icon: "Search",
    signals: [
      { name: "Brand mention rate", score: 68, median: 72, desc: "Pct of category queries where you appear" },
      { name: "Query coverage breadth", score: 74, median: 70, desc: "Unique query intents you show up for" },
      { name: "First-position rate", score: 62, median: 68, desc: "How often you appear as the first brand named" },
      { name: "Engine consistency", score: 84, median: 78, desc: "Same visibility level across all 5 engines" },
    ],
    recs: [
      { text: "Unblock AI crawlers in robots.txt to increase indexable surface area", issue: 4 },
      { text: "Build comparison pages (vs Linear, vs Jira) — engines cite these for evaluation queries", issue: 3 },
    ],
  },
  {
    name: "Citation Presence", score: 48, weight: "30%", icon: "Quote",
    signals: [
      { name: "Direct citation rate", score: 38, median: 58, desc: "Pct of mentions that link to your domain" },
      { name: "Citation diversity", score: 44, median: 62, desc: "Number of distinct pages engines cite" },
      { name: "Third-party endorsements", score: 52, median: 70, desc: "Non-owned sources mentioning you positively" },
      { name: "Citation recency", score: 58, median: 65, desc: "How fresh your most-cited content is" },
    ],
    recs: [
      { text: "Your direct citation rate is 20pts below median — create authoritative /use-case pages engines can link to", issue: 3 },
      { text: "Build Reddit presence: 31 of 50 queries cite Reddit, you have only 4 mentions", issue: 5 },
      { text: "Publish guest posts on dev.to and LogRocket to build third-party endorsement", issue: 3 },
    ],
  },
  {
    name: "Answer Quality", score: 54, weight: "20%", icon: "CheckCircle",
    signals: [
      { name: "Factual accuracy", score: 42, median: 78, desc: "Pct of engine statements that are verifiably correct" },
      { name: "Pricing correctness", score: 20, median: 82, desc: "Whether engines report correct pricing" },
      { name: "Feature accuracy", score: 72, median: 68, desc: "Correct descriptions of your capabilities" },
      { name: "Hallucination rate", score: 82, median: 90, desc: "Inverse of fabricated claims about you (higher is better)" },
    ],
    recs: [
      { text: "Fix pricing across G2, Capterra, and your /pricing page — 4 of 5 engines show wrong numbers", issue: 2 },
      { text: "Add Organization schema to counter the fake Asana acquisition hallucination", issue: 1 },
      { text: "Publish a /press-kit page as canonical fact source for engines", issue: 1 },
    ],
  },
  {
    name: "Source Authority", score: 61, weight: "15%", icon: "Shield",
    signals: [
      { name: "Domain authority signal", score: 64, median: 70, desc: "Engine trust in your domain vs. competitors" },
      { name: "Structured data coverage", score: 48, median: 58, desc: "Schema markup on key pages" },
      { name: "Backlink diversity", score: 68, median: 72, desc: "Breadth of external sites linking to you" },
      { name: "Content freshness", score: 64, median: 66, desc: "Average age of your most-cited pages" },
    ],
    recs: [
      { text: "Add SoftwareApplication and FAQPage schema to key pages — your structured data coverage is 10pts below median", issue: 2 },
      { text: "Increase backlink diversity through guest engineering blog posts", issue: 3 },
    ],
  },
  {
    name: "Content Architecture", score: 78, weight: "10%", icon: "LayoutGrid",
    signals: [
      { name: "Crawlability", score: 52, median: 60, desc: "Pct of key pages accessible to AI crawlers" },
      { name: "Heading structure", score: 88, median: 72, desc: "Clean H1/H2/H3 hierarchy on key pages" },
      { name: "Schema markup quality", score: 82, median: 58, desc: "Correctness of existing structured data" },
      { name: "Content hub depth", score: 90, median: 64, desc: "Topical clustering and internal linking" },
    ],
    recs: [
      { text: "Crawlability is your weakest signal here — unblock ClaudeBot, GPTBot, and PerplexityBot", issue: 4 },
      { text: "Add llms.txt file to guide AI crawlers to your most important pages", issue: 4 },
    ],
  },
];

// ── Issues ─────────────────────────────────────────────────────────
export const kanboIssues: Issue[] = [
  {
    id: 1, severity: "critical",
    title: "Claude hallucinates a fake Asana acquisition",
    pillar: "Answer Quality", engines: ["Claude", "ChatGPT"],
    what: "In <strong>3 of 10</strong> Claude queries about Kanbo, responses reference a \"2024 acquisition by Asana\" that never occurred. ChatGPT shows a softer variant (\"part of the Asana ecosystem\") in 1 of 10 queries.",
    reassure: "Perplexity, Gemini, and AI Overviews do not reproduce this hallucination. Your blog content and existing docs are accurate. The issue is sourced from a misread TechCrunch headline.",
    evidence: [
      { engine: "Claude", query: "Is Kanbo a good choice for enterprise teams?", quote: "Kanbo is a project management tool that was <span class=\"bad\">acquired by Asana in 2024</span>, which positions it well for teams already invested in the Asana ecosystem..." },
      { engine: "Claude", query: "Kanbo vs Jira for engineering", quote: "Following Kanbo's <span class=\"bad\">acquisition by Asana</span>, feature parity with Jira has improved, though some integrations remain in transition..." },
    ],
  },
  {
    id: 2, severity: "high",
    title: "Your pricing is wrong in 4 of 5 engines",
    pillar: "Answer Quality", engines: ["ChatGPT", "Claude", "Perplexity", "Gemini"],
    what: "Four of five engines report incorrect pricing. ChatGPT says \"$8/user,\" Claude says \"around $12,\" Perplexity says \"starts at $10.\" Actual pricing is $15/user/month.",
    reassure: "Your /pricing page has the correct number. The issue is stale third-party listings (G2, Capterra) and missing Product schema that engines could use as authoritative source.",
    evidence: [
      { engine: "ChatGPT", query: "How much does Kanbo cost?", quote: "Kanbo offers a free tier and paid plans starting at <span class=\"bad\">$8 per user per month</span>..." },
      { source: "G2.com/products/kanbo", note: "Lists discontinued $8/user pricing from 2024", stat: "stale" },
    ],
  },
  {
    id: 3, severity: "high",
    title: "Absent from \"best PM tool for engineering\" queries",
    pillar: "Citation Presence", engines: ["ChatGPT", "Claude", "Perplexity", "Gemini", "AI Overviews"],
    what: "Kanbo is mentioned in <strong>0 of 15</strong> engineering-focused project management queries across all engines. Competitors (Linear, Jira, Asana, Shortcut) dominate.",
    reassure: "You rank in 22 of 50 general PM queries — the gap is specifically in engineering-PM. Your blog content quality is strong; the issue is a missing use-case page and zero comparison content.",
    evidence: [
      { engine: "ChatGPT", query: "Best project management tool for engineering teams", quote: "Popular choices include Linear, Jira, Asana, and Shortcut. Linear is particularly popular with engineering teams..." },
    ],
  },
  {
    id: 4, severity: "high",
    title: "Docs blocked from AI crawlers",
    pillar: "Discoverability", engines: ["ChatGPT", "Claude", "Perplexity"],
    what: "Your <strong>docs.kanbo.com</strong> subdomain blocks GPTBot, ClaudeBot, and PerplexityBot in robots.txt while allowing Googlebot.",
    reassure: "Your main marketing site (kanbo.com) is fully crawlable. The block is limited to the docs subdomain. Once unblocked, your docs are well-structured with clean headings and semantic HTML.",
    evidence: [
      { engine: "Claude", query: "Does Kanbo support custom workflows?", quote: "Based on third-party reviews, <span class=\"bad\">Kanbo appears to offer custom workflows</span>, though specific documentation is not available to me..." },
      { source: "docs.kanbo.com/robots.txt", note: "Blocks GPTBot, ClaudeBot, PerplexityBot", stat: "blocking" },
    ],
  },
  {
    id: 5, severity: "medium",
    title: "Reddit/HN mentions underrepresent your product",
    pillar: "Source Authority", engines: ["Perplexity", "ChatGPT"],
    what: "31 of 50 queries cite Reddit. Kanbo appears in only 4 Reddit threads and 0 HN threads. Competitors average 15+ Reddit mentions.",
    reassure: "The 4 existing Reddit mentions are positive (avg 3.8/5 sentiment). The issue is volume, not sentiment.",
    evidence: [
      { engine: "Perplexity", query: "Which PM tool should I use for a small dev team?", quote: "Based on Reddit discussions, teams recommend Linear or Shortcut. <span class=\"bad\">Kanbo is not widely discussed</span> on Reddit..." },
    ],
  },
];

// ── Playbooks (abbreviated — full step details in v6 HTML) ─────────
export const kanboPlaybooks: Playbook[] = [
  {
    issue: 1, issueTitle: "Claude hallucinates a fake Asana acquisition", engine: "Claude", severity: "critical",
    whatsWrong: "In 3 of 10 enterprise-framed queries, Claude references a \"2024 acquisition by Asana\" that never occurred.",
    whyItMatters: "Claude weights authoritative press sources heavily. Without a counter-signal from your structured data, the hallucination persists.",
    steps: [
      { t: "Add Organization schema with explicit parentOrganization: \"none\"", e: "2 hrs", d: "Add a JSON-LD script block to your homepage and /about page with schema.org/Organization fields." },
      { t: "Publish a /press-kit page with \"Kanbo is independent\" language", e: "3 hrs", d: "Create a fact card with founding date, founders, funding status, and explicit independence statement." },
      { t: "File correction with TechCrunch editorial", e: "1 day", d: "Email corrections@techcrunch.com with evidence and your press kit link." },
    ],
    expectedImpact: "+7 pts on Claude pillar score. Hallucination clears within 14 days.",
  },
  {
    issue: 2, issueTitle: "Pricing wrong in 4 of 5 engines", engine: "ChatGPT", severity: "high",
    whatsWrong: "ChatGPT reports pricing as \"$8 per user\" based on stale G2 listing.",
    whyItMatters: "ChatGPT's browse tool fetches G2 early in search. Without updated listing, wrong price persists.",
    steps: [
      { t: "Update G2 vendor profile with current pricing", e: "30 min", d: "Log into G2 vendor portal and update pricing to $15/user/month." },
      { t: "Add Product schema to /pricing page", e: "1 hr", d: "JSON-LD with @type Offer, price 15, priceCurrency USD." },
      { t: "Put price in first paragraph of /pricing", e: "30 min", d: "ChatGPT extracts first ~200 words. Make the price visible immediately." },
    ],
    expectedImpact: "+3 pts on ChatGPT Answer Quality. G2 updates propagate in 2-4 weeks.",
  },
  {
    issue: 3, issueTitle: "Absent from engineering PM queries", engine: "Claude", severity: "high",
    whatsWrong: "Claude mentions Kanbo in 1 of 15 engineering-PM queries.",
    whyItMatters: "Claude requires both first-party authority and third-party validation to recommend a product.",
    steps: [
      { t: "Build /compare/kanbo-vs-linear and kanbo-vs-jira pages", e: "2 days", d: "Honest feature comparison with balanced pros/cons." },
      { t: "Add SoftwareApplication schema to homepage", e: "1 hr", d: "Include applicationCategory, operatingSystem, offers, aggregateRating." },
    ],
    expectedImpact: "+2 pts on Claude Citation Presence.",
  },
  {
    issue: 4, issueTitle: "Docs blocked from AI crawlers", engine: "Claude", severity: "high",
    whatsWrong: "docs.kanbo.com blocks ClaudeBot in robots.txt.",
    whyItMatters: "Claude cannot cite your documentation even when users ask about Kanbo features.",
    steps: [
      { t: "Remove ClaudeBot Disallow from robots.txt", e: "5 min", d: "Delete the User-agent: ClaudeBot / Disallow: / lines." },
      { t: "Add llms.txt to docs subdomain", e: "30 min", d: "Follow the llms.txt standard with product summary and section links." },
    ],
    expectedImpact: "+3 pts on Claude Discoverability. Re-crawl within 7-14 days.",
  },
];

// ── Leaderboard mock data ──────────────────────────────────────────
export const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, company: "HubSpot", domain: "hubspot.com", category: "CRM", score: 91, delta: 2, topPillar: "Citation Presence", weakPillar: "Content Architecture", claimed: true },
  { rank: 2, company: "Notion", domain: "notion.so", category: "Productivity", score: 89, delta: -1, topPillar: "Content Architecture", weakPillar: "Answer Quality", claimed: true },
  { rank: 3, company: "Linear", domain: "linear.app", category: "Project Management", score: 87, delta: 4, topPillar: "Discoverability", weakPillar: "Source Authority", claimed: true },
  { rank: 4, company: "Figma", domain: "figma.com", category: "Design", score: 86, delta: 0, topPillar: "Citation Presence", weakPillar: "Discoverability", claimed: true },
  { rank: 5, company: "Vercel", domain: "vercel.com", category: "DevTools", score: 85, delta: 3, topPillar: "Content Architecture", weakPillar: "Citation Presence", claimed: false },
  { rank: 6, company: "Stripe", domain: "stripe.com", category: "Payments", score: 84, delta: 1, topPillar: "Source Authority", weakPillar: "Content Architecture", claimed: true },
  { rank: 7, company: "Datadog", domain: "datadoghq.com", category: "Observability", score: 83, delta: -2, topPillar: "Discoverability", weakPillar: "Answer Quality", claimed: false },
  { rank: 8, company: "Loom", domain: "loom.com", category: "Video", score: 82, delta: 5, topPillar: "Answer Quality", weakPillar: "Source Authority", claimed: true },
  { rank: 9, company: "Slack", domain: "slack.com", category: "Communication", score: 81, delta: -1, topPillar: "Discoverability", weakPillar: "Content Architecture", claimed: true },
  { rank: 10, company: "Airtable", domain: "airtable.com", category: "Productivity", score: 80, delta: 0, topPillar: "Content Architecture", weakPillar: "Citation Presence", claimed: false },
  { rank: 11, company: "Webflow", domain: "webflow.com", category: "Web Platform", score: 79, delta: 2, topPillar: "Content Architecture", weakPillar: "Discoverability", claimed: false },
  { rank: 12, company: "Retool", domain: "retool.com", category: "DevTools", score: 77, delta: 1, topPillar: "Source Authority", weakPillar: "Citation Presence", claimed: false },
  { rank: 34, company: "Kanbo", domain: "kanbo.com", category: "Project Management", score: 61, delta: -3, topPillar: "Content Architecture", weakPillar: "Citation Presence", claimed: false },
];

// ── Categories for filters ─────────────────────────────────────────
export const categories = [
  "All", "CRM", "Project Management", "Productivity", "Design",
  "DevTools", "Payments", "Observability", "Video", "Communication",
  "Web Platform", "Analytics", "Security", "Data",
];
