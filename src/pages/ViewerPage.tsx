import { useState, useEffect, useMemo, useRef } from 'react';
import { Search } from 'lucide-react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import TopNav from '@/components/TopNav';
import Sidebar from '@/components/Sidebar';
import MobileSidebar from '@/components/MobileSidebar';
import Footer from '@/components/Footer';
import TabBar from '@/components/TabBar';
import { useTheme } from '@/hooks/useTheme';
import { classifyLink, getLinkClass } from '@/lib/linkClassifier';
import { documentHref, getWikiDocument, searchWikiDocuments } from '@/data/wikiDocuments';
import { marked } from 'marked';

function renderDocumentMarkdown(slug: string | undefined, query: string) {
  if (slug === 'search') {
    const results = searchWikiDocuments(query);
    const rows = results
      .map((doc) => `- [${doc.title}](${documentHref(doc.title)}) — ${doc.summary}`)
      .join('\n');

    return `# Search Results

Query: **${query || 'all indexed documents'}**

${results.length > 0 ? rows : 'No curated document matched this search yet. Try "architecture", "governance", or "crown jewels".'}

## Search Scope

This search currently covers the app-local Wikirepo registry. It keeps the internal wiki usable while a future live documentation ingestion pipeline can be connected through an approved service boundary.`;
  }

  const doc = getWikiDocument(slug);
  return `# ${doc.title}

_${doc.section}_

${doc.summary}

## Overview

${doc.body}

## Operational Notes

- Runtime access tier: **CJ-0 none** for Wikirepo.
- Protected Sentra logic remains outside this app.
- Canonical source files remain authoritative when they conflict with this rendered documentation page.

## Related Pages

- [Getting Started](${documentHref('Getting Started')})
- [Architecture Overview](${documentHref('Architecture Overview')})
- [AGENTS.md Governance Protocol](${documentHref('AGENTS.md Governance Protocol')})
- [Boundary Management](${documentHref('Boundary Management')})
- [Sentra Crown Jewels](${documentHref('Sentra Crown Jewels')})`;
}

function processRenderedContent(container: HTMLElement) {
  // Auto-classify links
  container.querySelectorAll('a[href]').forEach((link) => {
    const el = link as HTMLAnchorElement;
    if (el.classList.contains('link-tech') || el.classList.contains('link-academic') ||
        el.classList.contains('link-public') || el.classList.contains('link-external')) return;

    const href = el.getAttribute('href') || '';
    const text = el.textContent || '';

    if (href.startsWith('http') || href.startsWith('//')) {
      el.classList.add('link-external');
      el.setAttribute('target', '_blank');
      el.setAttribute('rel', 'noopener noreferrer');
      return;
    }

    const type = classifyLink(href, text);
    el.classList.add(getLinkClass(type));
  });

  // Style code blocks
  container.querySelectorAll('pre').forEach((pre) => {
    (pre as HTMLElement).style.cssText = `
      background: var(--code-bg);
      border: 1px solid var(--code-border);
      border-radius: 6px;
      padding: 16px 20px;
      overflow-x: auto;
      margin-bottom: 1.25rem;
      font-size: 0.8125rem;
      line-height: 1.6;
    `;
  });

  // Style inline code
  container.querySelectorAll('code:not(pre code)').forEach((code) => {
    (code as HTMLElement).style.cssText = `
      background: var(--bg-tertiary);
      padding: 2px 6px;
      border-radius: 3px;
      font-size: 0.85em;
      color: var(--text-primary);
    `;
  });

  // Style tables
  container.querySelectorAll('table').forEach((table) => {
    (table as HTMLElement).style.cssText = `
      width: 100%;
      border-collapse: separate;
      border-spacing: 0;
      margin-bottom: 1.25rem;
      font-size: 0.875rem;
      border: 1px solid var(--border-subtle);
      border-radius: 6px;
      overflow: hidden;
    `;
  });

  container.querySelectorAll('th, td').forEach((cell) => {
    (cell as HTMLElement).style.cssText = `
      border-bottom: 1px solid var(--border-subtle);
      padding: 10px 12px;
      text-align: left;
    `;
  });

  container.querySelectorAll('th').forEach((th) => {
    (th as HTMLElement).style.cssText += `
      background: var(--bg-tertiary);
      font-weight: 600;
      font-size: 0.8rem;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    `;
  });

  // Style blockquotes
  container.querySelectorAll('blockquote').forEach((bq) => {
    (bq as HTMLElement).style.cssText = `
      border-left: 3px solid var(--text-primary);
      background: var(--bg-secondary);
      padding: 16px 20px;
      margin-bottom: 1.25rem;
      border-radius: 0 6px 6px 0;
      font-style: italic;
    `;
  });

  // Style horizontal rules
  container.querySelectorAll('hr').forEach((hr) => {
    (hr as HTMLElement).style.cssText = `
      border: none;
      height: 1px;
      background: var(--border-subtle);
      margin: 2rem 0;
    `;
  });
}

export default function ViewerPage() {
  const { theme, toggle } = useTheme();
  const { docId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [viewerSearch, setViewerSearch] = useState(searchParams.get('q') || '');
  const contentRef = useRef<HTMLDivElement>(null);
  const query = searchParams.get('q') || '';
  const activeDocument = docId === 'search' ? undefined : getWikiDocument(docId);
  const content = useMemo(() => {
    marked.setOptions({ gfm: true, breaks: true });
    return marked.parse(renderDocumentMarkdown(docId, query)) as string;
  }, [docId, query]);

  useEffect(() => {
    requestAnimationFrame(() => {
      if (contentRef.current) {
        processRenderedContent(contentRef.current);
      }
    });
  }, [content]);

  const navigateViewerSearch = () => {
    navigate(`/viewer/search?q=${encodeURIComponent(viewerSearch.trim())}`);
  };

  const submitViewerSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigateViewerSearch();
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-primary)' }}>
      <TopNav theme={theme} onToggleTheme={toggle} onMenuToggle={() => setSidebarOpen(true)} />

      <MobileSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} simplified />

      <div className="flex pt-12">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-[240px] flex-shrink-0">
          <div className="sticky top-12">
            <Sidebar simplified />
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          {/* Breadcrumb Bar */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 lg:px-10 py-2"
            style={{
              background: 'var(--bg-secondary)',
              borderBottom: '1px solid var(--border-primary)',
              height: 40,
            }}
          >
            <div className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>
              <a href="/" className="hover:underline" style={{ color: 'var(--text-secondary)' }}>Documentation</a>
              <span className="mx-1">&rsaquo;</span>
              <a href={documentHref(activeDocument?.section || 'Search Results')} className="hover:underline" style={{ color: 'var(--text-secondary)' }}>{activeDocument?.section || 'Search'}</a>
              <span className="mx-1">&rsaquo;</span>
              <span style={{ color: 'var(--text-primary)' }}>{activeDocument?.title || 'Search Results'}</span>
            </div>
            <form
              onSubmit={submitViewerSearch}
              className="hidden sm:flex items-center rounded-full transition-all duration-300"
              style={{
                width: searchFocused ? 280 : 200,
                background: 'var(--bg-primary)',
                border: `1px solid ${searchFocused ? 'var(--border-primary)' : 'var(--border-subtle)'}`,
              }}
            >
              <Search size={13} className="ml-2.5 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                placeholder="Search Sentra Wiki"
                value={viewerSearch}
                className="w-full bg-transparent border-none outline-none px-2 py-1 text-xs"
                style={{ color: 'var(--text-primary)' }}
                onChange={(event) => setViewerSearch(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    navigateViewerSearch();
                  }
                }}
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
              />
            </form>
          </div>

          <div className="max-w-[960px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <TabBar />

            <div
              ref={contentRef}
              id="rendered-content"
              className="pb-20 animate-fade-up"
              style={{ animationDuration: '300ms' }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
