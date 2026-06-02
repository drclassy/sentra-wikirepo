import { useStaggerAnimation } from '@/hooks/useIntersectionAnimation';
import { classifyLink, getLinkClass } from '@/lib/linkClassifier';
import { documentHref } from '@/data/wikiDocuments';

interface LibraryItem {
  label: string;
  href: string;
  children?: LibraryItem[];
}

interface LibraryCategory {
  title: string;
  items: LibraryItem[];
}

const libraryData: LibraryCategory[] = [
  {
    title: 'Core & Systems',
    items: [
      { label: 'Getting Started', href: 'static/Getting Started.html' },
      {
        label: 'AI Capabilities & Systems',
        href: '#',
        children: [
          { label: 'AI Capabilities & Systems', href: '#' },
          { label: 'AI Governance & Safety', href: '#' },
          { label: 'Clinical Pathways & Trajectories', href: '#' },
          { label: 'Clinical Reasoning Engines', href: '#' },
          { label: 'Diagnostic Engines & Algorithms', href: '#' },
          { label: 'Emergency Detection Systems', href: '#' },
          { label: 'Referral Coordination Workflows', href: '#' },
          { label: 'CDS Hooks Integration', href: '#' },
          { label: 'Data Validation & Transformation', href: '#' },
          { label: 'FHIR & Interoperability', href: '#' },
          { label: 'FHIR Resource Implementation', href: '#' },
          { label: 'Healthcare Data Exchange Protocols', href: '#' },
          { label: 'Flow Definition Language', href: '#' },
          { label: 'Flow Orchestration', href: '#' },
          { label: 'Orchestrator Engine Architecture', href: '#' },
          { label: 'Citation & Evidence Management', href: '#' },
          { label: 'Embedding & Vector Systems', href: '#' },
          { label: 'Evaluation & Testing Framework', href: '#' },
          { label: 'Knowledge Ingestion Pipeline', href: '#' },
          { label: 'RAG & Retrieval Systems', href: '#' },
          { label: 'Retrieval Algorithms', href: '#' },
        ],
      },
      {
        label: 'Architecture Overview',
        href: '#',
        children: [
          { label: 'Architecture Overview', href: '#' },
          { label: 'Domain Boundaries & Taxonomy', href: '#' },
          { label: 'Monorepo Strategy & Governance', href: '#' },
          { label: 'Academic Platforms', href: '#' },
          { label: 'Application Layer Architecture', href: '#' },
          { label: 'Community Innovation Apps', href: '#' },
          { label: 'Prototype & Experimental Apps', href: '#' },
          { label: 'Branding Platform', href: '#' },
          { label: 'Corporate Applications', href: '#' },
          { label: 'Ferdi Iskandar Portfolio', href: '#' },
          { label: 'Healthcare Applications', href: '#' },
          { label: 'Primary Healthcare Delivery System', href: '#' },
          { label: 'Sentra Assist AI Platform', href: '#' },
          { label: 'API Gateway & Integration', href: '#' },
          { label: 'Flow Management System', href: '#' },
          { label: 'Platform Services Architecture', href: '#' },
          { label: 'Design System & UI Components', href: '#' },
          { label: 'Integration Layer & Connectors', href: '#' },
          { label: 'Medical Knowledge Repository', href: '#' },
          { label: 'Shared Primitives & Foundation', href: '#' },
          { label: 'Tooling Libraries & Utilities', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Applications & APIs',
    items: [
      {
        label: 'API Reference',
        href: '#',
        children: [
          { label: 'API Reference', href: '#' },
          { label: 'Healthcare Application APIs', href: '#' },
          { label: 'Integration & Bridge APIs', href: '#' },
          { label: 'Orchestration & Flow Management APIs', href: '#' },
          { label: 'Portal & Dashboard APIs', href: '#' },
        ],
      },
      {
        label: 'Applications',
        href: '#',
        children: [
          { label: 'Application Architecture & Boundaries', href: '#' },
          { label: 'Applications', href: '#' },
          { label: 'Corporate Applications', href: '#' },
          { label: 'Internal Applications', href: '#' },
          { label: 'Clinical Data Management', href: '#' },
          { label: 'Healthcare API Integration', href: '#' },
          { label: 'Healthcare Applications', href: '#' },
          { label: 'Primary Healthcare Application', href: '#' },
          { label: 'Sentra Main Application', href: '#' },
        ],
      },
      {
        label: 'Platform Services',
        href: '#',
        children: [
          { label: 'Platform Services', href: '#' },
          { label: 'Data Services', href: '#' },
          { label: 'Document Ingestion Pipeline', href: '#' },
          { label: 'Knowledge Management System', href: '#' },
          { label: 'Query & Command Architecture', href: '#' },
          { label: 'External System Integrations', href: '#' },
          { label: 'Flow Orchestration Engine', href: '#' },
          { label: 'Integration Platforms', href: '#' },
          { label: 'Service Connectivity', href: '#' },
          { label: 'Flow Execution Engine', href: '#' },
          { label: 'Health Monitoring & Status', href: '#' },
          { label: 'Messaging Infrastructure', href: '#' },
          { label: 'Orchestration Engine', href: '#' },
          { label: 'Saga Management System', href: '#' },
          { label: 'Dashboard Architecture', href: '#' },
          { label: 'Deployment & Configuration', href: '#' },
          { label: 'Operational Dashboards', href: '#' },
          { label: 'Portal & Dashboard', href: '#' },
          { label: 'UI Component System', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Development & Governance',
    items: [
      {
        label: 'Development Guide',
        href: '#',
        children: [
          { label: 'CLI Tools & Automation', href: '#' },
          { label: 'Coding Standards & Patterns', href: '#' },
          { label: 'Development Guide', href: '#' },
          { label: 'Getting Started', href: '#' },
          { label: 'Testing & Quality Assurance', href: '#' },
        ],
      },
      {
        label: 'Governance & Operations',
        href: '#',
        children: [
          { label: 'Contribution Workflow', href: '#' },
          { label: 'Governance & Operations', href: '#' },
          { label: 'Agent Lifecycle & Operations', href: '#' },
          { label: 'Agent System & Decision Making', href: '#' },
          { label: 'Boundary Management', href: '#' },
          { label: 'Decision Making Framework', href: '#' },
          { label: 'Emergency Protocols & Handoff Procedures', href: '#' },
          { label: 'Daily Operations', href: '#' },
          { label: 'Emergency Response', href: '#' },
          { label: 'Environment Management', href: '#' },
          { label: 'Monitoring & Alerting', href: '#' },
          { label: 'Operational Procedures', href: '#' },
          { label: 'Access Control & Data Classification', href: '#' },
          { label: 'Compliance & Regulatory Framework', href: '#' },
          { label: 'Incident Response & Vulnerability Management', href: '#' },
          { label: 'Security & Compliance', href: '#' },
          { label: 'Threat Modeling & Risk Assessment', href: '#' },
        ],
      },
      {
        label: 'Infrastructure & Deployment',
        href: '#',
        children: [
          { label: 'CI/CD Pipelines & Automation', href: '#' },
          { label: 'Containerized Development Environment', href: '#' },
          { label: 'Deployment Strategies & Environments', href: '#' },
          { label: 'Infrastructure & Deployment', href: '#' },
          { label: 'Monitoring & Observability', href: '#' },
        ],
      },
    ],
  },
  {
    title: 'Shared Engines & Support',
    items: [
      {
        label: 'Shared Engines & Packages',
        href: '#',
        children: [
          { label: 'Shared Engines & Packages', href: '#' },
          { label: 'Clinical Packages', href: '#' },
          { label: 'Reference Data Package', href: '#' },
          { label: 'Safety Substrate Package', href: '#' },
          { label: 'Shared Types Package', href: '#' },
          { label: 'Database Package', href: '#' },
          { label: 'Document Ingestion Package', href: '#' },
          { label: 'Integration Bridge', href: '#' },
          { label: 'Language Flow Client', href: '#' },
          { label: 'Platform Packages', href: '#' },
          { label: 'Sentra Bentara - Access Control', href: '#' },
          { label: 'Sentra Cermin - Embedding Utilities', href: '#' },
          { label: 'Sentra Crown Jewels', href: '#' },
          { label: 'Sentra Nada - Clinical Reasoning Engine', href: '#' },
          { label: 'Sentra Pustaka - RAG Engine', href: '#' },
          { label: 'Sentra Sandi - FHIR Interoperability', href: '#' },
          { label: 'Design Tokens', href: '#' },
          { label: 'Shared Primitives', href: '#' },
          { label: 'Type Definitions', href: '#' },
          { label: 'Utility Libraries', href: '#' },
          { label: 'Tooling Packages', href: '#' },
        ],
      },
      {
        label: 'Troubleshooting & Support',
        href: '#',
        children: [
          { label: 'Application Troubleshooting', href: '#' },
          { label: 'Common Development Issues', href: '#' },
          { label: 'Infrastructure & Deployment Problems', href: '#' },
          { label: 'Security Incidents & Compliance', href: '#' },
          { label: 'Troubleshooting & Support', href: '#' },
        ],
      },
    ],
  },
];

function renderLibraryItem(item: LibraryItem, depth: number = 0) {
  const href = documentHref(item.label);
  const linkType = classifyLink(href, item.label);
  const linkClass = getLinkClass(linkType);
  const hasChildren = item.children && item.children.length > 0;

  return (
    <li key={item.label} className="my-0.5">
      <a
        href={href}
        className={`${linkClass} text-xs`}
      >
        {item.label}
      </a>
      {hasChildren && (
        <ul
          className="mt-1 space-y-0.5"
          style={{
            paddingLeft: depth === 0 ? '12px' : '8px',
            borderLeft: '1px solid var(--border-subtle)',
          }}
        >
          {item.children!.map((child) => renderLibraryItem(child, depth + 1))}
        </ul>
      )}
    </li>
  );
}

export default function LibraryGrid() {
  const gridRef = useStaggerAnimation(libraryData.length);

  return (
    <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {libraryData.map((category) => (
        <div
          key={category.title}
          className="rounded-md p-5 opacity-0"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
          }}
        >
          <h4
            className="text-[10px] font-bold uppercase tracking-[0.08em] pb-2 mb-3"
            style={{
              color: 'var(--text-primary)',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            {category.title}
          </h4>
          <ul className="space-y-1">
            {category.items.map((item) => renderLibraryItem(item))}
          </ul>
        </div>
      ))}
    </div>
  );
}
