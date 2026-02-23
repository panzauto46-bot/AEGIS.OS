import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme, type Locale } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { Component, type ReactNode } from 'react';
import { http } from 'wagmi';

const WALLETCONNECT_PROJECT_ID = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || 'b1e20b90b81b0ef8c0a5f4c2e158e1e4';

const config = getDefaultConfig({
  appName: 'Aegis.OS',
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [base, baseSepolia],
  ssr: false,
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

// Custom AEGIS dark theme for RainbowKit modals
const aegisTheme = darkTheme({
  accentColor: '#00e5ff',
  accentColorForeground: '#0a0e1a',
  borderRadius: 'medium',
  fontStack: 'system',
  overlayBlur: 'large',
});

// Deep override for neon styling
aegisTheme.colors.modalBackground = '#0d1117';
aegisTheme.colors.modalBorder = 'rgba(0, 229, 255, 0.15)';
aegisTheme.colors.profileForeground = '#0d1117';
aegisTheme.colors.closeButton = 'rgba(255, 255, 255, 0.4)';
aegisTheme.colors.closeButtonBackground = 'rgba(255, 255, 255, 0.06)';
aegisTheme.colors.actionButtonBorder = 'rgba(0, 229, 255, 0.2)';
aegisTheme.colors.actionButtonSecondaryBackground = 'rgba(0, 229, 255, 0.08)';
aegisTheme.colors.generalBorder = 'rgba(255, 255, 255, 0.06)';
aegisTheme.shadows.dialog = '0 25px 60px -12px rgba(0, 229, 255, 0.15)';

class Web3ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <>{this.props.children}</>;
    }
    return this.props.children;
  }
}

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <Web3ErrorBoundary>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider
            theme={aegisTheme}
            locale={'en' as Locale}
            modalSize="compact"
          >
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Web3ErrorBoundary>
  );
}
