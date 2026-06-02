import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';

interface EngineCardProps {
  id: string;
  title: string;
  description: string;
  subsystems: string[];
  disclaimer?: string;
}

export default function EngineCard({ id, title, description, subsystems, disclaimer }: EngineCardProps) {
  const ref = useIntersectionAnimation<HTMLDivElement>();

  return (
    <div
      ref={ref}
      id={id}
      className="mb-5 rounded-r-md opacity-0 transition-all duration-250 hover:-translate-y-0.5 group"
      style={{
        background: 'var(--bg-secondary)',
        borderLeft: '3px solid var(--border-primary)',
        padding: '20px 24px',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderLeftColor = 'var(--text-primary)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderLeftColor = 'var(--border-primary)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <h3 className="font-semibold text-base mb-3" style={{ color: 'var(--text-primary)' }}>
        {title}
      </h3>
      <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
        {description}
      </p>
      <ul className="text-sm space-y-1.5 list-disc pl-5 mb-3">
        {subsystems.map((item) => (
          <li key={item} style={{ color: 'var(--text-secondary)' }}>
            <span dangerouslySetInnerHTML={{ __html: item }} />
          </li>
        ))}
      </ul>
      {disclaimer && (
        <p className="text-xs italic" style={{ color: 'var(--text-tertiary)' }}>
          {disclaimer}
        </p>
      )}
    </div>
  );
}
