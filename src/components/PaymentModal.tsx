import { Wallet, Shield, X, Zap, Loader2, CheckCircle2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseUnits } from 'viem';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPay: () => void;
}

const USDC_ADDRESS = '0x036CbD53842c5426634e7929541eC2318f3dCF7e'; // Base Sepolia USDC
const AEGIS_WALLET = '0xFEE547941c3E3d3D66dC2e47ee9c16879E870F9b'; // AEGIS Treasury Wallet

const erc20Abi = [
  {
    name: 'transfer',
    type: 'function',
    stateMutability: 'nonpayable',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' },
    ],
    outputs: [{ name: '', type: 'bool' }],
  },
] as const;

export function PaymentModal({ isOpen, onClose, onPay }: PaymentModalProps) {
  const { isConnected } = useAccount();
  const { writeContract, data: hash, isPending: isWriting, error: writeError, isError: isWriteError } = useWriteContract();

  const { isLoading: isWaiting, isSuccess, error: waitError, isError: isWaitError } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      // Small delay to show success state before proceeding
      const t = setTimeout(() => {
        onPay();
      }, 1500);
      return () => clearTimeout(t);
    }
  }, [isSuccess, onPay]);

  const handleRealPayment = () => {
    writeContract({
      address: USDC_ADDRESS,
      abi: erc20Abi,
      functionName: 'transfer',
      args: [AEGIS_WALLET, parseUnits('5', 6)],
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={!isWaiting ? onClose : undefined} />

      <div className="relative glass-strong rounded-2xl p-8 max-w-md w-full neon-border animate-fade-in-up">
        {(!isWriting && !isWaiting && !isSuccess) && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}

        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-neon-cyan/20 to-electric-blue/20 flex items-center justify-center neon-border">
              {isSuccess ? (
                <CheckCircle2 className="h-10 w-10 text-matrix-green" />
              ) : (
                <Shield className="h-10 w-10 text-neon-cyan" />
              )}
            </div>
            {!isSuccess && (
              <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-matrix-green/20 border border-matrix-green/40 flex items-center justify-center">
                <Zap className="h-4 w-4 text-matrix-green" />
              </div>
            )}
          </div>
        </div>

        <div className="text-center mb-8">
          <h3 className="text-xl font-bold text-white mb-2">
            {isSuccess ? 'Payment Successful' : isWaiting ? 'Confirming Transaction...' : isWriting ? 'Awaiting Wallet...' : 'Initiate AEGIS Audit'}
          </h3>
          <p className="text-white/50 text-sm leading-relaxed">
            {isSuccess ? (
              <span className="text-matrix-green">AEGIS system unlocked. Proceeding...</span>
            ) : isWaiting || isWriting ? (
              <span className="text-neon-cyan">Scanning blockchain for confirmation...</span>
            ) : (
              <>
                Aegis requires <span className="text-neon-cyan font-semibold">$5 USDC</span> on{' '}
                <span className="text-electric-blue font-semibold">Base Network</span> to unlock the workspace.
              </>
            )}
          </p>
        </div>

        {(isWriteError || isWaitError) && !isWriting && !isWaiting && (
          <div className="mb-6 p-4 rounded-xl bg-danger-red/10 border border-danger-red/30 text-center animate-fade-in-up">
            <p className="text-danger-red text-sm font-semibold mb-1">Payment Failed</p>
            <p className="text-white/60 text-xs text-left max-h-16 overflow-y-auto">
              {(writeError?.message || waitError?.message || '').toLowerCase().includes('insufficient funds')
                ? 'Aegis requires sufficient funds. Please top up your wallet with at least 5 USDC on Base.'
                : 'Transaction was rejected or failed. Please try again.'}
            </p>
          </div>
        )}

        {(!isWriting && !isWaiting && !isSuccess) && (
          <>
            <div className="glass rounded-xl p-4 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Audit Unlock Fee</span>
                <span className="text-white/70">$5.00 USDC</span>
              </div>
              <div className="border-t border-white/5" />
              <div className="flex justify-between text-xs">
                <span className="text-white/30">→ AI Engine Fuel</span>
                <span className="text-warning-yellow/70">$0.50</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-white/30">→ Staked to Aave V3</span>
                <span className="text-matrix-green/70">$4.50</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={handleRealPayment}
                disabled={!isConnected}
                className="w-full neon-button rounded-xl py-3 px-6 text-neon-cyan font-semibold flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Wallet className="h-5 w-5" />
                Pay $5 USDC
              </button>
              <button
                onClick={onPay}
                className="w-full glass rounded-xl py-3 px-6 text-white/40 font-medium text-sm hover:text-white/60 hover:bg-white/5 transition-all cursor-pointer"
              >
                Demo Mode (Skip Payment)
              </button>
            </div>
          </>
        )}

        {(isWriting || isWaiting) && !isSuccess && !isWriteError && (
          <div className="flex flex-col justify-center items-center py-8">
            <Loader2 className="h-10 w-10 text-neon-cyan animate-spin mb-4" />
            <p className="text-neon-cyan/50 text-xs animate-pulse">
              {isWaiting ? "Do not close this window. Waiting for network..." : "Please confirm in your wallet..."}
            </p>
          </div>
        )}

        {isSuccess && (
          <div className="flex justify-center items-center py-8">
            <CheckCircle2 className="h-10 w-10 text-matrix-green animate-bounce" />
          </div>
        )}

        <p className="text-center text-white/20 text-xs mt-4">
          Powered by PinionOS on Base L2
        </p>
      </div>
    </div>
  );
}
