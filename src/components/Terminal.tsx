import { useEffect, useState } from 'react';

interface TerminalProps {
  onComplete: () => void;
}

const terminalLines = [
  { text: '> Payment received: $5.00 USDC on Base Network', color: 'text-matrix-green', delay: 400 },
  { text: '> Verifying transaction on blockchain...', color: 'text-white/60', delay: 600 },
  { text: '  ✓ Tx confirmed: 0x7a3f...e91c', color: 'text-neon-cyan', delay: 400 },
  { text: '> Allocating $0.50 to API Fuel Wallet...', color: 'text-warning-yellow', delay: 500 },
  { text: '> Staking $4.50 to Aave V3 on Base...', color: 'text-matrix-green', delay: 600 },
  { text: '  ✓ Staking confirmed. Earning 4.2% APY', color: 'text-matrix-green', delay: 400 },
  { text: '', color: '', delay: 300 },
  { text: '══════════════════════════════════════════', color: 'text-neon-cyan/30', delay: 200 },
  { text: '  AEGIS NEURAL AUDIT ENGINE v2.1.0', color: 'text-neon-cyan', delay: 300 },
  { text: '══════════════════════════════════════════', color: 'text-neon-cyan/30', delay: 200 },
  { text: '', color: '', delay: 200 },
  { text: '> Initiating Groq LLM Engine...', color: 'text-electric-blue', delay: 500 },
  { text: '  ✓ Model loaded: llama-3.3-70b-versatile', color: 'text-neon-cyan', delay: 400 },
  { text: '> Parsing Solidity AST...', color: 'text-white/60', delay: 600 },
  { text: '> Scanning for Reentrancy vulnerabilities...', color: 'text-white/60', delay: 700 },
  { text: '  ⚠ Potential reentrancy detected at line 42', color: 'text-danger-red', delay: 400 },
  { text: '> Analyzing call stacks & external calls...', color: 'text-white/60', delay: 600 },
  { text: '> Checking access control patterns...', color: 'text-white/60', delay: 500 },
  { text: '  ⚠ Missing onlyOwner modifier at line 78', color: 'text-warning-yellow', delay: 400 },
  { text: '> Detecting integer overflow/underflow...', color: 'text-white/60', delay: 500 },
  { text: '  ✓ SafeMath patterns detected', color: 'text-matrix-green', delay: 300 },
  { text: '> Analyzing gas optimization opportunities...', color: 'text-white/60', delay: 600 },
  { text: '> Running formal verification checks...', color: 'text-white/60', delay: 700 },
  { text: '> Cross-referencing known exploit database...', color: 'text-white/60', delay: 500 },
  { text: '', color: '', delay: 200 },
  { text: '> Compiling audit report...', color: 'text-neon-cyan', delay: 600 },
  { text: '  ✓ Report generated successfully', color: 'text-matrix-green', delay: 400 },
  { text: '', color: '', delay: 300 },
  { text: '═══ AUDIT COMPLETE ═══', color: 'text-matrix-green', delay: 200 },
];

export function Terminal({ onComplete }: TerminalProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentLine = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const showNextLine = () => {
      if (currentLine < terminalLines.length) {
        currentLine++;
        setVisibleLines(currentLine);
        setProgress(Math.round((currentLine / terminalLines.length) * 100));
        timeoutId = setTimeout(showNextLine, terminalLines[currentLine - 1]?.delay || 300);
      } else {
        setTimeout(onComplete, 1000);
      }
    };

    timeoutId = setTimeout(showNextLine, 500);
    return () => clearTimeout(timeoutId);
  }, [onComplete]);

  return (
    <div className="min-h-screen bg-deep-space pt-20 px-4 flex items-center justify-center">
      <div className="max-w-3xl w-full animate-fade-in-up">
        {/* Terminal Window */}
        <div className="rounded-2xl overflow-hidden neon-border">
          {/* Terminal Header */}
          <div className="glass-strong px-4 py-3 flex items-center gap-3 border-b border-white/5">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-danger-red/60" />
              <div className="w-3 h-3 rounded-full bg-warning-yellow/60" />
              <div className="w-3 h-3 rounded-full bg-matrix-green/60" />
            </div>
            <span className="text-xs text-white/30 font-mono">aegis-audit-engine — bash</span>
          </div>

          {/* Terminal Body */}
          <div className="code-editor p-6 min-h-[400px] max-h-[500px] overflow-y-auto">
            {terminalLines.slice(0, visibleLines).map((line, i) => (
              <div
                key={i}
                className={`font-mono text-sm ${line.color} ${
                  i === visibleLines - 1 ? 'animate-fade-in-up' : ''
                }`}
                style={{ animationDuration: '0.2s' }}
              >
                {line.text || '\u00A0'}
              </div>
            ))}
            {visibleLines < terminalLines.length && (
              <span className="inline-block w-2 h-4 bg-neon-cyan animate-pulse-glow ml-1" />
            )}
          </div>

          {/* Progress Bar */}
          <div className="glass-strong px-4 py-3 border-t border-white/5">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-matrix-green transition-all duration-500 animate-progress-glow"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <span className="text-xs font-mono text-neon-cyan min-w-[3rem] text-right">
                {progress}%
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 text-center">
          <p className="text-white/30 text-sm font-mono animate-pulse-glow">
            {progress < 100 ? 'AEGIS Neural Engine Processing...' : 'Generating Report...'}
          </p>
        </div>
      </div>
    </div>
  );
}
