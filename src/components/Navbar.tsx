import { Shield, Menu, X, Wallet, ChevronDown } from 'lucide-react';
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

          {/* Desktop Nav */}
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
              <ConnectButton.Custom>
                {({
                  account,
                  chain,
                  openAccountModal,
                  openChainModal,
                  openConnectModal,
                  mounted,
                }) => {
                  const ready = mounted;
                  const connected = ready && account && chain;

                  return (
                    <div
                      {...(!ready && {
                        'aria-hidden': true,
                        style: {
                          opacity: 0,
                          pointerEvents: 'none' as const,
                          userSelect: 'none' as const,
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              className="neon-button rounded-lg py-2 px-5 text-neon-cyan text-sm font-semibold flex items-center gap-2 cursor-pointer hover:shadow-lg hover:shadow-neon-cyan/20 transition-all"
                            >
                              <Wallet className="h-4 w-4" />
                              Connect Wallet
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              onClick={openChainModal}
                              className="rounded-lg py-2 px-4 bg-danger-red/20 border border-danger-red/40 text-danger-red text-sm font-semibold cursor-pointer hover:bg-danger-red/30 transition-all"
                            >
                              Wrong Network
                            </button>
                          );
                        }

                        return (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={openChainModal}
                              className="glass rounded-lg py-2 px-3 text-xs font-mono text-white/60 flex items-center gap-1.5 cursor-pointer hover:bg-white/10 transition-all border border-white/5"
                            >
                              {chain.hasIcon && chain.iconUrl && (
                                <img
                                  alt={chain.name ?? 'Chain'}
                                  src={chain.iconUrl}
                                  className="h-4 w-4 rounded-full"
                                />
                              )}
                              <span className="text-matrix-green">{chain.name}</span>
                              <ChevronDown className="h-3 w-3 text-white/30" />
                            </button>

                            <button
                              onClick={openAccountModal}
                              className="glass rounded-lg py-2 px-4 text-sm font-mono flex items-center gap-2 cursor-pointer hover:bg-white/10 transition-all neon-border"
                            >
                              <div className="h-2 w-2 rounded-full bg-matrix-green animate-pulse" />
                              <span className="text-neon-cyan font-semibold">
                                {account.displayName}
                              </span>
                              {account.displayBalance && (
                                <span className="text-white/40 text-xs hidden lg:inline">
                                  {account.displayBalance}
                                </span>
                              )}
                            </button>
                          </div>
                        );
                      })()}
                    </div>
                  );
                }}
              </ConnectButton.Custom>
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
          <div className="pt-2 border-t border-white/5">
            <ConnectButton.Custom>
              {({
                account,
                chain,
                openAccountModal,
                openConnectModal,
                mounted,
              }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                if (!connected) {
                  return (
                    <button
                      onClick={openConnectModal}
                      className="w-full neon-button rounded-lg py-3 px-5 text-neon-cyan text-sm font-semibold flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Wallet className="h-4 w-4" />
                      Connect Wallet
                    </button>
                  );
                }

                return (
                  <button
                    onClick={openAccountModal}
                    className="w-full glass rounded-lg py-3 px-4 text-sm font-mono flex items-center justify-center gap-2 cursor-pointer neon-border"
                  >
                    <div className="h-2 w-2 rounded-full bg-matrix-green animate-pulse" />
                    <span className="text-neon-cyan">{account.displayName}</span>
                    <span className="text-white/40 text-xs">{account.displayBalance}</span>
                  </button>
                );
              }}
            </ConnectButton.Custom>
          </div>
        </div>
      )}
    </nav>
  );
}
