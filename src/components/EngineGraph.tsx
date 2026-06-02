import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';

const engines = [
  { id: 'nada', label: 'sentra-nada', desc: 'Clinical Reasoning' },
  { id: 'pustaka', label: 'sentra-pustaka', desc: 'RAG Pipeline' },
  { id: 'cermin', label: 'sentra-cermin', desc: 'Vector Store' },
  { id: 'sandi', label: 'sentra-sandi', desc: 'FHIR Interop' },
  { id: 'bentara', label: 'sentra-bentara', desc: 'Access Control' },
];

export default function EngineGraph() {
  const ref = useIntersectionAnimation<HTMLDivElement>();

  return (
    <div ref={ref} className="opacity-0">
      {/* Neumorphic Container */}
      <div
        className="w-full rounded-2xl p-8 overflow-x-auto"
        style={{
          background: '#F0F1F3',
          boxShadow: 'inset 2px 2px 5px rgba(0,0,0,0.05), inset -2px -2px 5px rgba(255,255,255,0.8)',
        }}
      >
        {/* Engine Nodes Grid */}
        <div className="flex flex-col items-center gap-6 min-w-[500px]">
          {/* Row 1: Nada → Pustaka */}
          <div className="flex items-center gap-6">
            {/* Nada Card */}
            <NeumorphicCard engine={engines[0]} />

            {/* Arrow: calls */}
            <NeumorphicArrow label="calls" direction="right" />

            {/* Pustaka Card */}
            <NeumorphicCard engine={engines[1]} />
          </div>

          {/* Row 2: Arrow down → Cermin */}
          <div className="flex items-center gap-6 ml-[180px]">
            <NeumorphicArrow label="uses" direction="down-right" />
            <NeumorphicCard engine={engines[2]} />
          </div>

          {/* Row 3: ← Sandi */}
          <div className="flex items-center gap-6 ml-[180px]">
            <NeumorphicArrow label="encodes to" direction="left" />
            <NeumorphicCard engine={engines[3]} />
          </div>

          {/* Row 4: ← Bentara */}
          <div className="flex items-center gap-6 ml-[180px]">
            <NeumorphicArrow label="guarded by" direction="left" />
            <NeumorphicCard engine={engines[4]} />
          </div>

          {/* Row 5: Arrow back to Cermin */}
          <div className="flex items-center gap-6 ml-[180px]">
            <NeumorphicArrow label="looks into" direction="down-left" target="cermin" />
          </div>
        </div>
      </div>

      <p className="text-xs italic mt-3" style={{ color: 'var(--text-tertiary)' }}>
        Crown Jewel engine interaction graph. Arrows indicate call, usage, encoding, guard, and lookup relationships between the five core intelligence engines.
      </p>

      {/* Dark mode override */}
      <style>{`
        .dark .neumorphic-card {
          background: #1A1A1A !important;
          box-shadow: 
            6px 6px 12px rgba(0,0,0,0.4),
            -6px -6px 12px rgba(255,255,255,0.04) !important;
        }
        .dark .neumorphic-card:hover {
          box-shadow: 
            8px 8px 16px rgba(0,0,0,0.5),
            -8px -8px 16px rgba(255,255,255,0.06) !important;
        }
        .dark .neumorphic-container {
          background: #1A1A1A !important;
          box-shadow: 
            inset 3px 3px 6px rgba(0,0,0,0.4),
            inset -3px -3px 6px rgba(255,255,255,0.04) !important;
        }
      `}</style>
    </div>
  );
}

function NeumorphicCard({ engine }: { engine: typeof engines[0] }) {
  return (
    <div
      className="neumorphic-card relative flex flex-col items-center justify-center px-6 py-4 rounded-xl cursor-default transition-all duration-300 select-none"
      style={{
        background: '#F0F1F3',
        boxShadow: '6px 6px 12px rgba(0,0,0,0.06), -6px -6px 12px rgba(255,255,255,0.9)',
        minWidth: 140,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '8px 8px 16px rgba(0,0,0,0.08), -8px -8px 16px rgba(255,255,255,1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '6px 6px 12px rgba(0,0,0,0.06), -6px -6px 12px rgba(255,255,255,0.9)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Inner concave indicator */}
      <div
        className="absolute inset-1 rounded-lg pointer-events-none"
        style={{
          boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.04), inset -2px -2px 4px rgba(255,255,255,0.7)',
        }}
      />
      <span className="font-mono text-xs font-bold tracking-wide" style={{ color: 'var(--text-primary)' }}>
        {engine.label}
      </span>
      <span className="text-[10px] mt-1 font-medium" style={{ color: 'var(--text-tertiary)' }}>
        {engine.desc}
      </span>
    </div>
  );
}

function NeumorphicArrow({ label, direction }: { label: string; direction: string; target?: string }) {
  const isVertical = direction === 'down-right' || direction === 'down-left';

  if (isVertical) {
    return (
      <div className="flex flex-col items-center gap-1" style={{ width: 80 }}>
        {/* Vertical line with neumorphic groove */}
        <div
          className="w-0.5 h-8 rounded-full"
          style={{
            background: '#E8E9EB',
            boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.08), inset -1px -1px 2px rgba(255,255,255,0.8)',
          }}
        />
        <span
          className="text-[10px] font-mono italic px-2 py-0.5 rounded-full whitespace-nowrap"
          style={{
            color: 'var(--text-tertiary)',
            background: '#F0F1F3',
            boxShadow: '2px 2px 4px rgba(0,0,0,0.04), -2px -2px 4px rgba(255,255,255,0.8)',
          }}
        >
          {label}
        </span>
        {/* Arrow head */}
        <svg width="12" height="12" viewBox="0 0 12 12" className="mt-0.5">
          <polygon
            points="6,12 0,4 12,4"
            fill="#F0F1F3"
            style={{
              filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.08))',
            }}
          />
          <polygon
            points="6,11 1,5 11,5"
            fill="none"
            stroke="#D0D1D3"
            strokeWidth="0.5"
          />
        </svg>
      </div>
    );
  }

  // Horizontal arrow
  return (
    <div className="flex items-center gap-0">
      {direction === 'left' && (
        <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0 mr-1">
          <polygon
            points="0,7 10,0 10,14"
            fill="#F0F1F3"
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.08))' }}
          />
          <polygon
            points="1,7 9,2 9,12"
            fill="none"
            stroke="#D0D1D3"
            strokeWidth="0.5"
          />
        </svg>
      )}

      {/* Groove line */}
      <div
        className="h-0.5 rounded-full flex-1"
        style={{
          minWidth: 40,
          maxWidth: 60,
          background: '#E8E9EB',
          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.08), inset -1px -1px 2px rgba(255,255,255,0.8)',
        }}
      />

      {/* Label pill */}
      <span
        className="text-[10px] font-mono italic px-2 py-0.5 rounded-full whitespace-nowrap mx-1"
        style={{
          color: 'var(--text-tertiary)',
          background: '#F0F1F3',
          boxShadow: '2px 2px 4px rgba(0,0,0,0.04), -2px -2px 4px rgba(255,255,255,0.8)',
        }}
      >
        {label}
      </span>

      <div
        className="h-0.5 rounded-full flex-1"
        style={{
          minWidth: 20,
          maxWidth: 40,
          background: '#E8E9EB',
          boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.08), inset -1px -1px 2px rgba(255,255,255,0.8)',
        }}
      />

      {direction === 'right' && (
        <svg width="14" height="14" viewBox="0 0 14 14" className="flex-shrink-0 ml-1">
          <polygon
            points="14,7 4,0 4,14"
            fill="#F0F1F3"
            style={{ filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.08))' }}
          />
          <polygon
            points="13,7 5,2 5,12"
            fill="none"
            stroke="#D0D1D3"
            strokeWidth="0.5"
          />
        </svg>
      )}
    </div>
  );
}
