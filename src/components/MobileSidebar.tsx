import { X } from 'lucide-react';
import Sidebar from './Sidebar';

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  simplified?: boolean;
}

export default function MobileSidebar({ open, onClose, simplified }: MobileSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-[98] transition-opacity duration-200"
          style={{
            background: 'rgba(0,0,0,0.3)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className="fixed top-0 left-0 h-full z-[99] transition-transform duration-250 lg:hidden"
        style={{
          width: 'min(320px, 85vw)',
          transform: open ? 'translateX(0)' : 'translateX(-100%)',
          transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1 rounded-md z-10"
          style={{ color: 'var(--text-tertiary)' }}
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
        <Sidebar simplified={simplified} />
      </div>
    </>
  );
}
