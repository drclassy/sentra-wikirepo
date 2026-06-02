import { useIntersectionAnimation } from '@/hooks/useIntersectionAnimation';

const infoboxData = [
  { field: 'Status', value: 'Active / Production' },
  { field: 'Type', value: 'pnpm Workspace' },
  { field: 'Build System', value: 'Turborepo 2.x' },
  { field: 'Languages', value: 'TypeScript, SQL' },
  { field: 'Core Engines', value: 'SYMPHONY, NADA, PUSTAKA' },
  { field: 'Infrastructure', value: 'Kafka, PostgreSQL, Redis' },
  { field: 'Governance', value: 'AI-Led (AGENTS.md)' },
  { field: 'Repository', value: 'abyss-monorepo.git' },
  { field: 'Founder', value: 'dr. Ferdi Iskandar, SH MKN CLM CMDC' },
  { field: 'Organization', value: 'Sentra Healthcare AI' },
  { field: 'Initiated', value: '2024' },
  { field: 'License', value: 'Abyss Internal Documentation License' },
];

export default function Infobox() {
  const ref = useIntersectionAnimation<HTMLElement>();

  return (
    <aside
      ref={ref}
      className="w-full md:w-[300px] md:float-right md:ml-6 mb-6 rounded-xl overflow-hidden opacity-0"
      style={{
        background: 'var(--bg-glass)',
        backdropFilter: 'blur(16px) saturate(180%)',
        WebkitBackdropFilter: 'blur(16px) saturate(180%)',
        border: '1px solid var(--border-glass)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.06)',
      }}
    >
      {/* Header */}
      <div
        className="text-center font-semibold text-sm py-2 px-4 m-3 rounded-md"
        style={{ background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
      >
        Abyss Monorepo
      </div>

      {/* Logo */}
      <div className="flex justify-center py-2">
        <img src={`${import.meta.env.BASE_URL}abyss-logo.png`} alt="Abyss Logo" className="w-[120px] h-[120px] object-contain" />
      </div>

      {/* Data Table */}
      <table className="w-full text-xs">
        <tbody>
          {infoboxData.map((row, i) => (
            <tr
              key={row.field}
              style={{
                background: i % 2 === 0 ? 'var(--bg-primary)' : 'var(--bg-secondary)',
              }}
            >
              <td
                className="py-1.5 px-3 font-semibold w-[45%]"
                style={{ color: 'var(--text-primary)' }}
              >
                {row.field}
              </td>
              <td className="py-1.5 px-3" style={{ color: 'var(--text-secondary)' }}>
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}
