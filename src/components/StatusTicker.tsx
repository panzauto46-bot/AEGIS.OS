import { useEffect, useState } from 'react';
import { Wallet, TrendingUp, Fuel, Zap } from 'lucide-react';

export function StatusTicker() {
  const [walletBalance, setWalletBalance] = useState(145.5);
  const [staked, setStaked] = useState(130.0);
  const [yieldEarned, setYieldEarned] = useState(2.4);
  const [apiFuel] = useState(15.5);

  useEffect(() => {
    const interval = setInterval(() => {
      setYieldEarned((prev) => +(prev + Math.random() * 0.02).toFixed(4));
      setStaked((prev) => +(prev + Math.random() * 0.01).toFixed(2));
      setWalletBalance((prev) => +(prev + Math.random() * 0.01).toFixed(2));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const items = [
    { icon: Wallet, label: 'AEGIS Wallet', value: `$${walletBalance.toFixed(2)} USDC`, color: 'text-neon-cyan' },
    { icon: TrendingUp, label: 'Staked in Aave', value: `$${staked.toFixed(2)}`, color: 'text-electric-blue' },
    { icon: Zap, label: 'Yield Earned', value: `+$${yieldEarned.toFixed(4)}`, color: 'text-matrix-green' },
    { icon: Fuel, label: 'API Fuel', value: `$${apiFuel.toFixed(2)}`, color: 'text-warning-yellow' },
  ];

  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="w-full overflow-hidden glass border-y border-neon-cyan/10">
      <div className="flex animate-ticker whitespace-nowrap py-3">
        {duplicatedItems.map((item, i) => (
          <div key={i} className="flex items-center gap-2 mx-6 shrink-0">
            <item.icon className={`h-4 w-4 ${item.color}`} />
            <span className="text-white/40 text-xs font-medium uppercase tracking-wider">
              {item.label}:
            </span>
            <span className={`text-sm font-semibold ${item.color}`}>{item.value}</span>
            <span className="text-white/10 ml-4">│</span>
          </div>
        ))}
      </div>
    </div>
  );
}
