export interface WikiDocument {
  slug: string;
  title: string;
  section: string;
  summary: string;
  body: string;
}

const curatedDocuments: WikiDocument[] = [
  {
    slug: 'getting-started',
    title: 'Getting Started',
    section: 'Development Guide',
    summary: 'Orientation for working inside the ABYSS monorepo with pnpm, Turborepo, and the live SSOT.',
    body: [
      'Start with the repository root AGENTS.md, then read the active .agent continuity files before editing. ABYSS treats those files as the operational source of truth for current state, protected areas, and verification expectations.',
      'Use pnpm workspace filters for app-local checks. For Wikirepo itself, the smallest useful loop is lint, build, and link verification.',
      'Keep app work separated from crown-jewel packages. Wikirepo is an internal documentation surface and does not own diagnosis, RAG, OCR, or clinical reasoning algorithms.',
    ].join('\n\n'),
  },
  {
    slug: 'architecture',
    title: 'Architecture Overview',
    section: 'Architecture Overview',
    summary: 'A high-level map of ABYSS layers, package boundaries, and product surfaces.',
    body: [
      'ABYSS is organized as a boundary-enforced monorepo. Applications live under apps, crown-jewel capabilities live under packages/sentra, shared primitives live under packages/shared, and operational tooling lives under tooling.',
      'The safe access shape for applications is app -> contracts, SDK/API client, or service facade -> crown-jewel core. Direct imports into crown-jewel internals remain forbidden.',
      'Wikirepo documents this structure for operators and contributors without importing or executing crown-jewel implementation code.',
    ].join('\n\n'),
  },
  {
    slug: 'agents-md-governance-protocol',
    title: 'AGENTS.md Governance Protocol',
    section: 'Governance & Operations',
    summary: 'The agent operating contract that protects SSOT continuity, surgical changes, and verification discipline.',
    body: [
      'AGENTS.md defines the active workflow for autonomous and assisted engineering in ABYSS. It requires SSOT reads, relevant reference reads, brief notes, surgical scope, and fresh verification before completion claims.',
      'For app work, the apps governance layer adds a boundary preflight so product independence and crown-jewel access remain explicit.',
      'Wikirepo links to this protocol as an internal orientation artifact. The source AGENTS.md file remains authoritative.',
    ].join('\n\n'),
  },
  {
    slug: 'ssot-policy',
    title: 'SSOT Policy',
    section: 'Governance & Operations',
    summary: 'How ABYSS keeps current project state, handoffs, and durable decisions in one readable authority chain.',
    body: [
      '.agent/ is operational knowledge, not tooling. Root AGENTS.md is the public rulebook, while .agent/README.md, HANDOFF.md, CONTEXT.md, PROGRESS.md, and DECISIONS.md carry active continuity.',
      'Generated logs, sessions, caches, and runtime databases are not treated as canonical project artifacts.',
      'Wikirepo should summarize and route to SSOT concepts, but it must not replace the live SSOT files.',
    ].join('\n\n'),
  },
  {
    slug: 'boundary-management',
    title: 'Boundary Management',
    section: 'Architecture Overview',
    summary: 'The app/package boundary model that prevents accidental coupling to protected implementation details.',
    body: [
      'Every app must declare its domain, classification, future standalone posture, crown-jewel access tier, and verification command before implementation work.',
      'The default allowed shape is app-local UI and workflow code with optional approved contracts, clients, or facades. Sibling app imports and crown-jewel internal imports are forbidden.',
      'Wikirepo is classified as an internal operator app with CJ-0 runtime access.',
    ].join('\n\n'),
  },
  {
    slug: 'crown-jewels',
    title: 'Sentra Crown Jewels',
    section: 'Shared Engines & Packages',
    summary: 'A documentation entry for protected Sentra capabilities and their access restrictions.',
    body: [
      'Crown jewels include proprietary diagnosis, clinical reasoning, RAG, OCR, document intelligence, and related core algorithms owned by the monorepo.',
      'Applications may describe these capabilities, but they must not copy, fork, or silently reimplement them. Runtime consumption requires an approved contract, SDK/API client, or service facade.',
      'Human review, uncertainty, and auditability stay visible in clinical and healthcare workflows.',
    ].join('\n\n'),
  },
];

const curatedBySlug = new Map(curatedDocuments.map((doc) => [doc.slug, doc]));

export function slugifyDocument(label: string): string {
  return label
    .trim()
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function documentHref(label: string): string {
  return `/viewer/${slugifyDocument(label)}`;
}

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export function getWikiDocument(slug: string | undefined): WikiDocument {
  const normalized = slug || 'architecture';
  const curated = curatedBySlug.get(normalized);
  if (curated) return curated;

  const title = titleFromSlug(normalized);
  return {
    slug: normalized,
    title,
    section: 'Wikirepo Index',
    summary: `${title} is indexed in Wikirepo as an internal ABYSS documentation entry.`,
    body: [
      `${title} belongs to the internal Wikirepo documentation graph. This generated entry keeps the route navigable while the canonical source file is curated into the live documentation registry.`,
      'Use the surrounding Wikirepo sections to inspect related architecture, governance, application, platform, and crown-jewel boundary context.',
      'This page is documentation-only. It does not execute, import, or own protected Sentra implementation logic.',
    ].join('\n\n'),
  };
}

export function searchWikiDocuments(query: string): WikiDocument[] {
  const needle = query.trim().toLowerCase();
  if (!needle) return curatedDocuments;

  return curatedDocuments.filter((doc) =>
    [doc.title, doc.section, doc.summary, doc.body].some((value) =>
      value.toLowerCase().includes(needle),
    ),
  );
}
