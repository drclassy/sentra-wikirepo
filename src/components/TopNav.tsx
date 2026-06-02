import { Menu, Search, Sun, Moon, ExternalLink } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { documentHref, slugifyDocument } from '@/data/wikiDocuments';

interface TopNavProps {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onMenuToggle: () => void;
}

export default function TopNav({ theme, onToggleTheme, onMenuToggle }: TopNavProps) {
  const [searchFocused, setSearchFocused] = useState(false);
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const navigateSearch = () => {
    const term = query.trim();
    if (term) {
      navigate(`/viewer/search?q=${encodeURIComponent(term)}`);
      return;
    }

    navigate(documentHref('Getting Started'));
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateSearch();
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 h-12 flex items-center justify-between px-4 z-[100]"
      style={{
        background: theme === 'dark' ? 'rgba(17,17,17,0.8)' : 'rgba(255,255,255,0.72)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        borderBottom: `1px solid ${theme === 'dark' ? 'rgba(51,51,51,0.5)' : 'rgba(224,224,224,0.5)'}`,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)',
      }}
    >
      {/* Left: Menu + Wordmark */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-1.5 rounded-md transition-colors"
          style={{ color: 'var(--text-secondary)' }}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>
        <Link to="/" className="flex items-baseline gap-2 no-underline">
          <span className="font-semibold text-base" style={{ color: 'var(--text-primary)' }}>
            Wikirepo
          </span>
          <span className="text-xs hidden sm:inline" style={{ color: 'var(--text-tertiary)' }}>
            The Abyss
          </span>
        </Link>
      </div>

      {/* Center: Search */}
      <form
        onSubmit={submitSearch}
        className="hidden md:flex items-center rounded-full transition-all duration-300"
        style={{
          width: searchFocused ? 360 : 280,
          background: searchFocused ? 'var(--bg-primary)' : 'var(--bg-secondary)',
          border: `1px solid ${searchFocused ? 'var(--border-primary)' : 'var(--border-subtle)'}`,
          boxShadow: searchFocused ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
        }}
      >
        <Search size={15} className="ml-3 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
        <input
          type="text"
          placeholder="Search the monorepo..."
          value={query}
          className="w-full bg-transparent border-none outline-none px-2 py-1.5 text-xs"
          style={{ color: 'var(--text-primary)' }}
          onChange={(event) => setQuery(event.currentTarget.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              navigateSearch();
            }
          }}
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </form>

      {/* Right: Theme + View Source */}
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleTheme}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-150 hover:scale-105"
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            color: 'var(--text-secondary)',
          }}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
        </button>
        <a
          href={documentHref('AGENTS.md Governance Protocol')}
          className="hidden sm:flex items-center gap-1 text-xs font-medium transition-colors"
          style={{ color: 'var(--text-tertiary)' }}
          onClick={(event) => {
            event.preventDefault();
            navigate(`/viewer/${slugifyDocument('AGENTS.md Governance Protocol')}`);
          }}
        >
          <ExternalLink size={12} />
          <span>View Source</span>
        </a>
      </div>
    </nav>
  );
}
