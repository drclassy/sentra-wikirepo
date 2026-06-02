import { useScrollSpy } from '@/hooks/useScrollSpy';
import { documentHref } from '@/data/wikiDocuments';

interface SidebarProps {
  sectionIds?: string[];
  simplified?: boolean;
}

const fullNavItems = [
  { label: 'Main page', href: '/' },
  { label: 'Origin & History', href: '#origin' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'AI Engines', href: '#engines' },
  { label: 'Platform Services', href: '#platform' },
  { label: 'Applications', href: '#apps' },
  { label: 'Workflow', href: '#workflow' },
  { label: 'Governance', href: '#governance' },
  { label: 'Regulatory', href: '#regulatory' },
  { label: 'Documentation Library', href: '#library' },
];

const simpleNavItems = [
  { label: 'Main page', href: '/' },
  { label: 'Architecture', href: '/#architecture' },
  { label: 'AI Engines', href: '/#engines' },
  { label: 'Applications', href: '/#apps' },
  { label: 'Full Library', href: '/#library' },
];

const contributeItems = [
  { label: 'AGENTS.md', href: documentHref('AGENTS.md Governance Protocol') },
  { label: 'SSOT Policy', href: documentHref('SSOT Policy') },
  { label: 'Boundary Management', href: documentHref('Boundary Management') },
];

const sectionIdMap: Record<string, string> = {
  'Origin & History': 'origin',
  'Architecture': 'architecture',
  'AI Engines': 'engines',
  'Platform Services': 'platform',
  'Applications': 'apps',
  'Workflow': 'workflow',
  'Governance': 'governance',
  'Regulatory': 'regulatory',
  'Documentation Library': 'library',
};

export default function Sidebar({ sectionIds = [], simplified = false }: SidebarProps) {
  const ids = simplified ? [] : sectionIds;
  const activeId = useScrollSpy(ids, 100);

  const navItems = simplified ? simpleNavItems : fullNavItems;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <aside
      className="h-[calc(100vh-48px)] overflow-y-auto custom-scrollbar flex flex-col"
      style={{
        background: 'var(--bg-secondary)',
        borderRight: '1px solid var(--border-primary)',
      }}
    >
      {/* Header */}
      <div className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-3 mb-1">
          <img src={`${import.meta.env.BASE_URL}abyss-logo.png`} alt="Abyss Logo" className="w-[50px] h-[50px] object-contain" />
          <div>
            <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
              Wikirepo
            </h3>
            <span
              className="text-[10px] font-bold uppercase tracking-[0.1em]"
              style={{ color: 'var(--text-tertiary)' }}
            >
              The Abyss
            </span>
          </div>
        </div>
        <div className="mt-3" style={{ borderTop: '1px solid var(--border-subtle)' }} />
      </div>

      {/* Navigation */}
      <nav className="px-4 pb-3 flex-1">
        <p
          className="text-[10px] font-bold uppercase tracking-[0.1em] mb-2"
          style={{ color: 'var(--text-tertiary)' }}
        >
          Navigation
        </p>
        <ul className="space-y-0.5 mb-6">
          {navItems.map((item) => {
            const itemId = sectionIdMap[item.label] || '';
            const isActive = !simplified && itemId === activeId;
            const isCurrent = item.href === '/' && !simplified;
            return (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={(e) => handleClick(e, item.href)}
                  className={`link-nav py-1 text-sm ${isActive ? 'active' : ''} ${isCurrent ? 'font-semibold' : ''}`}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        {!simplified && (
          <>
            <p
              className="text-[10px] font-bold uppercase tracking-[0.1em] mb-2"
              style={{ color: 'var(--text-tertiary)' }}
            >
              Contribute
            </p>
            <ul className="space-y-0.5">
              {contributeItems.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="link-nav py-1 text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {simplified && (
          <div className="mt-6 pt-4" style={{ borderTop: '1px solid var(--border-subtle)' }}>
            <a
              href="/"
              className="text-sm italic transition-colors"
              style={{ color: 'var(--text-tertiary)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-tertiary)')}
            >
              &larr; Back to Article
            </a>
          </div>
        )}
      </nav>
    </aside>
  );
}
