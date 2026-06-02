export type LinkType = 'tech' | 'academic' | 'public' | 'default' | 'external' | 'nav';

const folderMap: Record<string, LinkType> = {
  'API Reference': 'tech',
  'Infrastructure & Deployment': 'tech',
  'Development Guide': 'tech',
  'Platform Services': 'tech',
  'Shared Engines & Packages': 'tech',
  'AI Capabilities & Systems': 'academic',
  'Architecture Overview': 'academic',
  'Governance & Operations': 'academic',
  'Applications': 'public',
  'Troubleshooting & Support': 'public',
};

const subfolderMap: Record<string, LinkType> = {
  'Clinical Packages': 'academic',
  'Sentra Crown Jewels': 'academic',
  'Clinical Reasoning Engines': 'academic',
  'FHIR & Interoperability': 'academic',
  'Flow Orchestration': 'tech',
  'RAG & Retrieval Systems': 'tech',
  'Application Layer Architecture': 'tech',
  'Corporate Applications': 'tech',
  'Internal Applications': 'tech',
  'Healthcare Applications': 'public',
  'Primary Healthcare Application': 'public',
  'Sentra Main Application': 'public',
  'Operational Procedures': 'tech',
  'Security & Compliance': 'academic',
  'Agent System & Decision Making': 'academic',
  'Data Services': 'tech',
  'Integration Platforms': 'tech',
  'Orchestration Engine': 'tech',
  'Portal & Dashboard': 'tech',
  'Platform Packages': 'tech',
  'Tooling Packages': 'tech',
  'Shared Primitives': 'tech',
  'UI Components': 'tech',
};

const fileMap: Record<string, LinkType> = {
  'Sentra Nada': 'academic',
  'Sentra Pustaka': 'academic',
  'Sentra Sandi': 'academic',
  'Sentra Cermin': 'tech',
  'Sentra Bentara': 'academic',
  'Sentra Crown Jewels': 'academic',
  'Clinical Patterns': 'academic',
  'Access Control': 'academic',
  'Access Tiers': 'academic',
  'Authentication': 'academic',
  'Session Approval': 'academic',
  'Clinical Packages': 'academic',
  'Safety Substrate': 'academic',
  'Reference Data': 'academic',
  'Shared Types': 'academic',
  'Document Ingestion': 'tech',
  'Integration Bridge': 'tech',
  'Language Flow': 'tech',
  'Database Package': 'tech',
  'Agent Governance': 'tech',
  'Boundary Manager': 'tech',
  'Code Analyzer': 'tech',
  'Security Audit': 'tech',
  'Design Tokens': 'tech',
  'Type Definitions': 'tech',
  'Utility Libraries': 'tech',
  'Getting Started': 'public',
  'Application Troubleshooting': 'public',
  'Common Development Issues': 'public',
  'Infrastructure & Deployment Problems': 'public',
  'Security Incidents': 'public',
};

export function classifyLink(href: string, text: string): LinkType {
  if (href.startsWith('http') || href.startsWith('//')) return 'external';

  const cleanHref = decodeURIComponent(href).replace(/^static\//, '');
  const parts = cleanHref.split('/');
  const topFolder = parts[0] || '';
  const secondFolder = parts[1] || '';
  const fileName = parts[parts.length - 1] || '';
  const textClean = text.replace(/\.md$/, '').trim();

  // File name override
  for (const [key, val] of Object.entries(fileMap)) {
    if (fileName.includes(key) || textClean.includes(key)) return val;
  }

  // Subfolder override
  for (const [key, val] of Object.entries(subfolderMap)) {
    if (secondFolder === key) return val;
  }

  // Top-level folder
  for (const [key, val] of Object.entries(folderMap)) {
    if (topFolder === key) return val;
  }

  // Keyword fallback
  const combined = (textClean + ' ' + fileName).toLowerCase();
  if (/api|endpoint|integration|orchestrator|deployment|pipeline|automation|configuration|component|engine|architecture|system|platform|database|messaging|container|build|test|lint|code|package|tool|saga|query|command/i.test(combined)) {
    return 'tech';
  }
  if (/clinical|medical|diagnostic|pathway|algorithm|research|knowledge|governance|compliance|regulatory|security|safety|risk|boundary|decision|agent|audit|pattern|syndrome|fhir|reasoning|trajectory|differential|emergency|referral|triage|assessment|screening/i.test(combined)) {
    return 'academic';
  }
  if (/getting started|troubleshooting|support|help|guide|overview|introduction|application|patient|doctor|service|facility|setup|community|corporate|portfolio|branding|communication|innovation/i.test(combined)) {
    return 'public';
  }

  return 'default';
}

export function getLinkClass(type: LinkType): string {
  switch (type) {
    case 'tech': return 'link-tech';
    case 'academic': return 'link-academic';
    case 'public': return 'link-public';
    case 'external': return 'link-external';
    case 'nav': return 'link-nav';
    default: return 'link-default';
  }
}
