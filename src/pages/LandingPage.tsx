import { StatusTicker } from '../components/StatusTicker';
import {
  Shield,
  Zap,
  Eye,
  DollarSign,
  ArrowRight,
  Brain,
  Lock,
  TrendingUp,
  Code,
} from 'lucide-react';
import { useAccount } from 'wagmi';
import { useConnectModal } from '@rainbow-me/rainbowkit';

interface LandingPageProps {
  onNavigate: (page: 'audit' | 'transparency') => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const { isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();

  const handleHireAegis = () => {
    if (isConnected) {
      onNavigate('audit');
    } else if (openConnectModal) {
      openConnectModal();
    }
  };

  return (
    <div className="min-h-screen bg-deep-space">
      {/* Background Effects */}
      <div className="fixed inset-0 grid-bg opacity-50" />
      <div className="fixed inset-0 radial-glow" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
            <div className="w-2 h-2 rounded-full bg-matrix-green animate-pulse" />
            <span className="text-xs text-white/50 font-medium">
              Autonomous AI Agent • Live on Base L2
            </span>
          </div>

          {/* Hero Title */}
          <h1
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <span className="text-white">Meet </span>
            <span className="text-neon-cyan neon-text">AEGIS</span>
            <span className="text-white/60">.OS</span>
          </h1>

          <p
            className="text-lg sm:text-xl md:text-2xl text-white/40 max-w-3xl mx-auto mb-4 animate-fade-in-up font-light"
            style={{ animationDelay: '0.2s' }}
          >
            The First{' '}
            <span className="text-neon-cyan font-medium">Self-Funding</span> AI
            Smart Contract Auditor.
          </p>

          <p
            className="text-sm md:text-base text-white/25 max-w-2xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.3s' }}
          >
            An autonomous agent that audits your code, earns its own money,
            stakes its profits into DeFi, and funds its own AI compute. No human
            intervention required.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
          >
            <button
              onClick={handleHireAegis}
              className="neon-button rounded-xl py-4 px-8 text-neon-cyan font-semibold flex items-center gap-2 text-lg cursor-pointer group"
            >
              <Shield className="h-5 w-5" />
              Hire Aegis for $5 USDC
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => onNavigate('transparency')}
              className="glass rounded-xl py-4 px-8 text-white/40 font-medium hover:text-white/60 hover:bg-white/5 transition-all cursor-pointer"
            >
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                View Financials
              </span>
            </button>
          </div>

          {/* Orbiting Shield */}
          <div className="relative w-40 h-40 mx-auto mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 rounded-full border border-neon-cyan/10 animate-rotate-slow" />
            <div className="absolute inset-4 rounded-full border border-neon-cyan/20 animate-rotate-slow" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
            <div className="absolute inset-8 rounded-full border border-neon-cyan/10" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-electric-blue/10 flex items-center justify-center neon-border animate-float">
                <Shield className="h-8 w-8 text-neon-cyan" />
              </div>
            </div>
            {/* Orbiting dots */}
            <div className="absolute inset-0 animate-rotate-slow" style={{ animationDuration: '8s' }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-matrix-green shadow-[0_0_10px_#00ff88]" />
            </div>
            <div className="absolute inset-0 animate-rotate-slow" style={{ animationDuration: '12s', animationDirection: 'reverse' }}>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_10px_#00f0ff]" />
            </div>
          </div>
        </div>

        {/* Status Ticker */}
        <StatusTicker />
      </section>

      {/* How It Works Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              How <span className="text-neon-cyan neon-text">AEGIS</span> Works
            </h2>
            <p className="text-white/30 max-w-xl mx-auto">
              A fully autonomous loop: Earn → Stake → Grow → Audit
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: Code,
                step: '01',
                title: 'Submit Code',
                desc: 'Paste your Solidity or Rust smart contract code into the AEGIS workspace.',
                color: 'text-neon-cyan',
                glow: 'shadow-[0_0_30px_rgba(0,240,255,0.1)]',
              },
              {
                icon: DollarSign,
                step: '02',
                title: 'Pay $5 USDC',
                desc: 'Payment is split: $0.50 for AI compute, $4.50 staked into Aave V3 for yield.',
                color: 'text-matrix-green',
                glow: 'shadow-[0_0_30px_rgba(0,255,136,0.1)]',
              },
              {
                icon: Brain,
                step: '03',
                title: 'AI Audit',
                desc: 'Groq LLM engine analyzes your contract for vulnerabilities, exploits, and gas inefficiencies.',
                color: 'text-electric-blue',
                glow: 'shadow-[0_0_30px_rgba(59,130,246,0.1)]',
              },
              {
                icon: TrendingUp,
                step: '04',
                title: 'Self-Fund',
                desc: 'AEGIS grows its treasury autonomously through DeFi yield. No human intervention.',
                color: 'text-warning-yellow',
                glow: 'shadow-[0_0_30px_rgba(255,215,0,0.1)]',
              },
            ].map((item) => (
              <div
                key={item.step}
                className={`glass rounded-2xl p-6 hover:bg-white/[0.04] transition-all duration-300 group ${item.glow}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-white/10 text-3xl font-bold">{item.step}</span>
                  <item.icon className={`h-6 w-6 ${item.color} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Lock,
                title: 'Military-Grade Audit',
                desc: 'Detects reentrancy, overflow, access control flaws, and 50+ vulnerability patterns used in real-world exploits.',
                color: 'text-danger-red',
              },
              {
                icon: Zap,
                title: 'Self-Sustaining Economy',
                desc: 'Every dollar earned is autonomously split between AI compute costs and DeFi yield farming on Aave V3.',
                color: 'text-matrix-green',
              },
              {
                icon: Eye,
                title: 'Full Transparency',
                desc: 'Every transaction, every stake, every yield — all visible on-chain. AEGIS has nothing to hide.',
                color: 'text-neon-cyan',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-strong rounded-2xl p-8 neon-border hover:bg-white/[0.04] transition-all duration-300 group"
              >
                <item.icon
                  className={`h-8 w-8 ${item.color} mb-4 group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-white font-bold text-lg mb-3">{item.title}</h3>
                <p className="text-white/30 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20">
        <div className="mx-auto max-w-3xl px-4 text-center relative z-10">
          <div className="glass-strong rounded-3xl p-12 neon-border">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to audit your{' '}
              <span className="text-neon-cyan neon-text">smart contract</span>?
            </h2>
            <p className="text-white/30 mb-8 max-w-lg mx-auto">
              Join the future of autonomous security. Let an AI that pays for
              itself protect your code.
            </p>
            <button
              onClick={handleHireAegis}
              className="neon-button rounded-xl py-4 px-10 text-neon-cyan font-semibold text-lg cursor-pointer group inline-flex items-center gap-2"
            >
              <Shield className="h-5 w-5" />
              Start Audit Now
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-neon-cyan/50" />
            <span className="text-white/20 text-sm">
              AEGIS.OS — Autonomous AI Security Agent
            </span>
          </div>
          <div className="text-white/15 text-xs">
            Powered by Groq • Base L2 • Aave V3 • PinionOS
          </div>
        </div>
      </footer>
    </div>
  );
}
