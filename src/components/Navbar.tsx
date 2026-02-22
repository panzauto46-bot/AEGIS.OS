import { Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

type Page = 'landing' | 'audit' | 'transparency';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems: { label: string; page: Page }[] = [
    { label: 'Home', page: 'landing' },
    { label: 'Audit', page: 'audit' },
    { label: 'Transparency', page: 'transparency' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="relative">
              <Shield className="h-8 w-8 text-neon-cyan animate-pulse-glow" />
              <div className="absolute inset-0 h-8 w-8 bg-neon-cyan/20 rounded-full blur-xl" />
            </div>
            <span className="text-xl font-bold tracking-wider">
              <span className="text-neon-cyan neon-text">AEGIS</span>
              <span className="text-white/60">.OS</span>
            </span>
          </button>

          // Desktop Nav
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.page}
                onClick={() => onNavigate(item.page)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 cursor-pointer ${currentPage === item.page
                  ? 'text-neon-cyan bg-neon-cyan/10 neon-border'
                  : 'text-white/50 hover:text-white/80 hover:bg-white/5'
                  }`}
              >
                {item.label}
              </button>
            ))}
            <div className="ml-4">
              <ConnectButton />
            </div>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white/70 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden glass-strong border-t border-white/5 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.page}
              onClick={() => {
                onNavigate(item.page);
                setMobileOpen(false);
              }}
              className={`block w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${currentPage === item.page
                ? 'text-neon-cyan bg-neon-cyan/10'
                : 'text-white/50 hover:text-white/80'
                }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
