import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultConfig, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import React, { Component, type ReactNode } from 'react';
import { http } from 'wagmi';

// WalletConnect Cloud Project ID — get yours free at https://cloud.walletconnect.com
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

// Error boundary to gracefully handle Web3 init failures
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
          <RainbowKitProvider theme={darkTheme({
            accentColor: '#3b82f6',
            accentColorForeground: 'white',
            borderRadius: 'small',
            fontStack: 'system',
            overlayBlur: 'small',
          })}>
            {children}
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </Web3ErrorBoundary>
  );
}
