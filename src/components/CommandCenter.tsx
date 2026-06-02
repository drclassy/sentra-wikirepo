import { TrendingUp, FileText, GitBranch, Shield, Cpu } from 'lucide-react';
import { documentHref } from '@/data/wikiDocuments';

const trendingItems = [
  { title: 'AGENTS.md Governance Protocol', time: 'Updated 2h ago', href: documentHref('AGENTS.md Governance Protocol') },
  { title: 'SYMPHONY Clinical Engine v2.1', time: 'Updated 1d ago', href: documentHref('SYMPHONY Clinical Engine v2.1') },
  { title: 'RAG Pipeline Evaluation Suite', time: 'Updated 3d ago', href: documentHref('RAG Pipeline Evaluation Suite') },
  { title: 'FHIR R4 SATUSEHAT Mapping', time: 'Updated 5d ago', href: documentHref('FHIR R4 SATUSEHAT Mapping') },
];

const quickLinks = [
  { icon: FileText, label: 'Getting Started', href: documentHref('Getting Started') },
  { icon: GitBranch, label: 'Architecture', href: '#architecture' },
  { icon: Shield, label: 'Governance', href: '#governance' },
  { icon: Cpu, label: 'Crown Jewels', href: '#engines' },
];

export default function CommandCenter() {
  return (
    <aside
      className="hidden xl:block sticky top-16 w-[280px] self-start space-y-4"
    >
      {/* Trending Research */}
      <div
        className="rounded-xl p-4 transition-all duration-300 hover:-translate-y-px"
        style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid var(--border-glass)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-primary)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.08)';
          e.currentTarget.style.background = 'rgba(255,255,255,0.85)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border-glass)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
          e.currentTarget.style.background = 'var(--bg-glass)';
        }}
      >
        <h4
          className="flex items-center gap-2 text-sm font-semibold mb-3 pb-2"
          style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          <TrendingUp size={16} style={{ color: 'var(--text-tertiary)' }} />
          Trending Research
        </h4>
        <ul className="space-y-2.5">
          {trendingItems.map((item) => (
            <li key={item.title}>
              <a
                href={item.href}
                className="block text-xs transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <span className="font-medium hover:underline">{item.title}</span>
                <span className="block mt-0.5" style={{ color: 'var(--text-tertiary)', fontSize: '10px' }}>
                  {item.time}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Article Metadata */}
      <div
        className="rounded-xl p-4"
        style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid var(--border-glass)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        }}
      >
        <h4
          className="text-sm font-semibold mb-3 pb-2"
          style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          Article Metadata
        </h4>
        <dl className="space-y-2 text-xs">
          {[
            { key: 'Reading time', value: '~18 min' },
            { key: 'Last edited', value: '30 May 2026' },
            { key: 'Word count', value: '4,200' },
            { key: 'Editor', value: 'AGENTS.md' },
          ].map((item) => (
            <div key={item.key} className="flex justify-between">
              <dt style={{ color: 'var(--text-tertiary)' }}>{item.key}</dt>
              <dd className="font-medium" style={{ color: 'var(--text-secondary)' }}>{item.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Quick Links */}
      <div
        className="rounded-xl p-4"
        style={{
          background: 'var(--bg-glass)',
          backdropFilter: 'blur(16px) saturate(180%)',
          WebkitBackdropFilter: 'blur(16px) saturate(180%)',
          border: '1px solid var(--border-glass)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
        }}
      >
        <h4
          className="text-sm font-semibold mb-3 pb-2"
          style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}
        >
          Quick Links
        </h4>
        <ul className="space-y-2">
          {quickLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex items-center gap-2 text-xs transition-colors"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                <link.icon size={14} style={{ color: 'var(--text-tertiary)' }} />
                <span className="hover:underline">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
