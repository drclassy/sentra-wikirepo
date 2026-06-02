import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';

interface TOCItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface TOCProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TOCProps) {
  const sectionIds = items.map((item) => item.href.slice(1));
  const activeId = useScrollSpy(sectionIds, 100);
  const ref = useIntersectionAnimation<HTMLElement>();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.getElementById(href.slice(1));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav
      ref={ref}
      className="inline-block min-w-[300px] max-w-full rounded-md p-5 mb-6 opacity-0"
      style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)',
      }}
    >
      <h4
        className="text-center font-bold text-sm mb-3 pb-2"
        style={{ color: 'var(--text-primary)', borderBottom: '1px solid var(--border-subtle)' }}
      >
        Contents
      </h4>
      <ol className="text-sm space-y-1">
        {items.map((item, i) => (
          <li key={item.href}>
            <a
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className="block py-0.5 transition-colors"
              style={{
                color: item.href.slice(1) === activeId ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: item.href.slice(1) === activeId ? 600 : 400,
                textDecoration: 'none',
                borderLeft: item.href.slice(1) === activeId ? '2px solid var(--text-primary)' : '2px solid transparent',
                paddingLeft: item.href.slice(1) === activeId ? 8 : 10,
              }}
            >
              {i + 1} {item.label}
            </a>
            {item.children && (
              <ol className="ml-5 space-y-0.5">
                {item.children.map((child, j) => (
                  <li key={child.href}>
                    <a
                      href={child.href}
                      onClick={(e) => handleClick(e, child.href)}
                      className="block py-0.5 transition-colors text-xs"
                      style={{
                        color: child.href.slice(1) === activeId ? 'var(--text-primary)' : 'var(--text-tertiary)',
                        textDecoration: 'none',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = child.href.slice(1) === activeId ? 'var(--text-primary)' : 'var(--text-tertiary)')}
                    >
                      {i + 1}.{j + 1} {child.label}
                    </a>
                  </li>
                ))}
              </ol>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
