import { useState } from 'react';
import {
  Upload,
  FileCode,
  ArrowRight,
  AlertCircle,
} from 'lucide-react';
import { PaymentModal } from '../components/PaymentModal';
import { Terminal } from '../components/Terminal';
import { AuditReport } from '../components/AuditReport';

const sampleCode = `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VulnerableVault {
    mapping(address => uint256) public balances;
    address public feeRecipient;
    uint256 public protocolFee;

    constructor(address _feeRecipient) {
        feeRecipient = _feeRecipient;
        protocolFee = 100; // 1%
    }

    function deposit() external payable {
        balances[msg.sender] += msg.value;
    }

    function withdraw() external {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance");
        
        // Vulnerable: external call before state update
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
        balances[msg.sender] = 0;
    }

    function setFee(uint256 _newFee) external {
        // Missing: access control
        protocolFee = _newFee;
    }

    function collectFees(address token, address recipient, uint256 amount) external {
        // Unchecked return value
        IERC20(token).transfer(recipient, amount);
    }
}

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
}`;

type AuditStage = 'input' | 'processing' | 'report';

interface AuditPageProps {
  onBack: () => void;
}

export function AuditPage({ onBack }: AuditPageProps) {
  const [code, setCode] = useState('');
  const [stage, setStage] = useState<AuditStage>('input');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [auditResult, setAuditResult] = useState<any>(null);

  const handleSubmit = () => {
    if (code.trim().length < 10) return;
    setStage('processing');

    // Trigger API call in the background
    fetch('/api/audit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    })
      .then(res => res.json())
      .then(data => setAuditResult(data))
      .catch(() => {
        setStage('input');
        // Optional: you could add a toast error notification here
      });
  };

  const handlePay = () => {
    setIsUnlocked(true);
  };

  const handleTerminalComplete = () => {
    setStage('report');
  };

  if (stage === 'processing') {
    return <Terminal onComplete={handleTerminalComplete} />;
  }

  if (stage === 'report') {
    return (
      <AuditReport
        result={auditResult}
        onBack={() => {
          setStage('input');
          setCode('');
          setAuditResult(null);
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-deep-space pt-20 px-4 pb-12">
      <div className="fixed inset-0 grid-bg opacity-30" />

      <div className={`max-w-4xl mx-auto relative z-10 pt-8 transition-all duration-500 ${!isUnlocked ? 'blur-md pointer-events-none opacity-50' : ''}`}>
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="text-neon-cyan neon-text">AEGIS</span> Audit Workspace
          </h1>
          <p className="text-white/30 max-w-lg mx-auto">
            Paste your Solidity or Rust smart contract below. AEGIS will analyze it for
            vulnerabilities, exploits, and optimization opportunities.
          </p>
        </div>

        {/* Code Editor */}
        <div
          className="rounded-2xl overflow-hidden neon-border animate-fade-in-up"
          style={{ animationDelay: '0.1s' }}
        >
          {/* Editor Header */}
          <div className="glass-strong px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-danger-red/60" />
                <div className="w-3 h-3 rounded-full bg-warning-yellow/60" />
                <div className="w-3 h-3 rounded-full bg-matrix-green/60" />
              </div>
              <span className="text-xs text-white/30 font-mono flex items-center gap-1">
                <FileCode className="h-3 w-3" />
                contract.sol
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCode(sampleCode)}
                className="text-xs text-neon-cyan/50 hover:text-neon-cyan transition-colors cursor-pointer px-2 py-1 rounded hover:bg-neon-cyan/5"
              >
                Load Sample
              </button>
            </div>
          </div>

          {/* Editor Body */}
          <div className="relative">
            {/* Line Numbers */}
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-white/[0.02] border-r border-white/5 flex flex-col pt-4 px-2">
              {Array.from({ length: Math.max(code.split('\n').length, 20) }, (_, i) => (
                <span key={i} className="text-white/15 text-xs font-mono leading-6 text-right">
                  {i + 1}
                </span>
              ))}
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="// Paste your Solidity or Rust code here...&#10;// Or click 'Load Sample' to try a demo contract"
              className="w-full min-h-[400px] code-editor p-4 pl-16 text-sm text-neon-cyan/80 placeholder:text-white/15 focus:outline-none resize-none leading-6 bg-transparent"
              spellCheck={false}
            />
          </div>

          {/* Editor Footer */}
          <div className="glass-strong px-4 py-3 flex items-center justify-between border-t border-white/5">
            <div className="flex items-center gap-4">
              <span className="text-xs text-white/20 font-mono">
                {code.split('\n').length} lines • {code.length} chars
              </span>
              {code.length > 0 && code.length < 50 && (
                <span className="text-xs text-warning-yellow/60 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  Code seems too short
                </span>
              )}
            </div>
            <label className="text-xs text-white/30 hover:text-white/50 transition-colors cursor-pointer flex items-center gap-1">
              <Upload className="h-3 w-3" />
              Upload .sol file
              <input
                type="file"
                accept=".sol,.rs"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                      setCode(ev.target?.result as string);
                    };
                    reader.readAsText(file);
                  }
                }}
              />
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div
          className="mt-6 flex justify-center animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
        >
          <button
            onClick={handleSubmit}
            disabled={code.trim().length < 10}
            className={`rounded-xl py-4 px-10 font-semibold flex items-center gap-2 text-lg cursor-pointer transition-all ${code.trim().length >= 10
              ? 'neon-button text-neon-cyan'
              : 'glass text-white/20 cursor-not-allowed'
              }`}
          >
            Initiate AEGIS Audit
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

        {/* Info Cards */}
        <div
          className="grid md:grid-cols-3 gap-4 mt-12 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {[
            {
              title: 'Cost',
              value: '$5 USDC',
              sub: 'on Base Network',
              color: 'text-neon-cyan',
            },
            {
              title: 'Engine',
              value: 'Groq LLM',
              sub: 'llama-3.3-70b',
              color: 'text-electric-blue',
            },
            {
              title: 'Report',
              value: 'Instant',
              sub: '< 30 seconds',
              color: 'text-matrix-green',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="glass rounded-xl p-4 text-center hover:bg-white/[0.03] transition-all"
            >
              <p className="text-white/30 text-xs uppercase tracking-wider mb-1">{item.title}</p>
              <p className={`text-lg font-bold ${item.color}`}>{item.value}</p>
              <p className="text-white/20 text-xs">{item.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={!isUnlocked}
        onClose={onBack}
        onPay={handlePay}
      />
    </div>
  );
}
