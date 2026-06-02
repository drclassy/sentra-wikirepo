export default function Footer() {
  return (
    <footer
      className="w-full py-6 px-6 text-xs"
      style={{
        background: 'var(--bg-secondary)',
        borderTop: '1px solid var(--border-primary)',
        color: 'var(--text-tertiary)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-center sm:text-left">
          <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>
            Wikirepo: The Abyss
          </p>
          <p>Official Sentra AI Monorepo Documentation</p>
        </div>
        <p className="hidden md:block">Abyss Internal Documentation License</p>
        <div className="flex items-center gap-3">
          <span>Last edited: 30 May 2026</span>
          <img src={`${import.meta.env.BASE_URL}abyss-logo.png`} alt="Abyss Logo" className="w-[30px] h-[30px] object-contain" />
        </div>
      </div>
    </footer>
  );
}
