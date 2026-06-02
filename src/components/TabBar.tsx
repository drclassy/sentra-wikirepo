import { useState } from 'react';

interface TabBarProps {
  tabs?: string[];
  activeTab?: string;
}

export default function TabBar({ tabs, activeTab }: TabBarProps) {
  const group1 = tabs || ['Article', 'Talk'];
  const group2 = ['Read', 'Edit source', 'View history'];
  const [active1, setActive1] = useState(activeTab || 'Article');
  const [active2, setActive2] = useState('Read');

  return (
    <div
      className="flex flex-wrap justify-between gap-2 pb-1"
      style={{ borderBottom: '1px solid var(--border-primary)' }}
    >
      <div className="flex gap-0.5">
        {group1.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive1(tab)}
            aria-pressed={tab === active1}
            className="px-3 py-1.5 text-xs font-medium transition-colors rounded-t"
            style={{
              color: tab === active1 ? 'var(--text-primary)' : 'var(--text-tertiary)',
              borderBottom: tab === active1 ? '2px solid var(--text-primary)' : '2px solid transparent',
              fontWeight: tab === active1 ? 600 : 500,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex gap-0.5">
        {group2.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActive2(tab)}
            aria-pressed={tab === active2}
            className="px-3 py-1.5 text-xs font-medium transition-colors rounded-t"
            style={{
              color: tab === active2 ? 'var(--text-primary)' : 'var(--text-tertiary)',
              borderBottom: tab === active2 ? '2px solid var(--text-primary)' : '2px solid transparent',
              fontWeight: tab === active2 ? 600 : 500,
            }}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
}
