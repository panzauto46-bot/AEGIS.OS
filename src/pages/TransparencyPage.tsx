import { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  TrendingUp,
  DollarSign,
  Activity,
  ArrowUpRight,
  ExternalLink,
  Wallet,
  Layers,
  Zap,
} from 'lucide-react';

const wealthData = [
  { date: 'Day 1', balance: 0, staked: 0, yield: 0 },
  { date: 'Day 5', balance: 25, staked: 22.5, yield: 0.12 },
  { date: 'Day 10', balance: 55, staked: 49.5, yield: 0.45 },
  { date: 'Day 15', balance: 80, staked: 72, yield: 1.1 },
  { date: 'Day 20', balance: 105, staked: 94.5, yield: 1.8 },
  { date: 'Day 25', balance: 125, staked: 112.5, yield: 2.1 },
  { date: 'Day 30', balance: 145.5, staked: 130, yield: 2.4 },
];

const revenueData = [
  { month: 'W1', audits: 5, revenue: 25 },
  { month: 'W2', audits: 8, revenue: 40 },
  { month: 'W3', audits: 6, revenue: 30 },
  { month: 'W4', audits: 10, revenue: 50 },
];

const allocationData = [
  { name: 'Staked (Aave V3)', value: 130, color: '#00ff88' },
  { name: 'API Fuel Reserve', value: 15.5, color: '#ffd700' },
  { name: 'Available', value: 2.4, color: '#00f0ff' },
];

const transactions = [
  {
    id: '0x7a3f...e91c',
    type: 'Audit Payment',
    amount: '+$5.00',
    time: '2 min ago',
    status: 'confirmed',
  },
  {
    id: '0x4b2e...f73a',
    type: 'Stake to Aave V3',
    amount: '-$4.50',
    time: '2 min ago',
    status: 'confirmed',
  },
  {
    id: '0x9c1d...a48b',
    type: 'Yield Claimed',
    amount: '+$0.18',
    time: '1 hour ago',
    status: 'confirmed',
  },
  {
    id: '0x2f8a...c52d',
    type: 'Audit Payment',
    amount: '+$5.00',
    time: '3 hours ago',
    status: 'confirmed',
  },
  {
    id: '0x6e4c...b91f',
    type: 'Stake to Aave V3',
    amount: '-$4.50',
    time: '3 hours ago',
    status: 'confirmed',
  },
  {
    id: '0x1a7f...d63e',
    type: 'Groq API Call',
    amount: '-$0.03',
    time: '3 hours ago',
    status: 'confirmed',
  },
  {
    id: '0x8d2b...e47a',
    type: 'Audit Payment',
    amount: '+$5.00',
    time: '6 hours ago',
    status: 'confirmed',
  },
  {
    id: '0x5c9e...f28d',
    type: 'Yield Claimed',
    amount: '+$0.22',
    time: '12 hours ago',
    status: 'confirmed',
  },
];

type TabType = 'overview' | 'transactions';

export function TransparencyPage() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  return (
    <div className="min-h-screen bg-deep-space pt-20 px-4 pb-12">
      <div className="fixed inset-0 grid-bg opacity-20" />
      <div className="fixed inset-0 green-radial-glow" />

      <div className="max-w-6xl mx-auto relative z-10 pt-8">
        {/* Header */}
        <div className="text-center mb-10 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-4">
            <Activity className="h-3 w-3 text-matrix-green" />
            <span className="text-xs text-white/50 font-medium">Live On-Chain Data</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
            <span className="text-matrix-green green-neon-text">Transparency</span> Dashboard
          </h1>
          <p className="text-white/30 max-w-lg mx-auto">
            Every transaction, every stake, every yield — fully visible. AEGIS.OS operates with
            complete financial transparency on Base L2.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            {
              icon: Wallet,
              label: 'Total Balance',
              value: '$145.50',
              change: '+12.3%',
              color: 'text-neon-cyan',
            },
            {
              icon: Layers,
              label: 'Staked in Aave',
              value: '$130.00',
              change: '+4.2% APY',
              color: 'text-matrix-green',
            },
            {
              icon: TrendingUp,
              label: 'Total Yield',
              value: '$2.40',
              change: '+$0.18 today',
              color: 'text-matrix-green',
            },
            {
              icon: Zap,
              label: 'Audits Done',
              value: '29',
              change: '+3 today',
              color: 'text-warning-yellow',
            },
          ].map((stat, i) => (
            <div
              key={stat.label}
              className="glass-strong rounded-xl p-4 neon-border animate-fade-in-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center gap-2 mb-2">
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
                <span className="text-white/30 text-xs">{stat.label}</span>
              </div>
              <p className={`text-xl md:text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-matrix-green/60 text-xs mt-1 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                {stat.change}
              </p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {(['overview', 'transactions'] as TabType[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer capitalize ${
                activeTab === tab
                  ? 'text-neon-cyan bg-neon-cyan/10 neon-border'
                  : 'text-white/30 hover:text-white/50 glass'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Wealth Growth Chart */}
            <div className="glass-strong rounded-2xl p-6 neon-border animate-fade-in-up">
              <h3 className="text-white font-semibold mb-1">Treasury Growth</h3>
              <p className="text-white/30 text-sm mb-6">
                AEGIS.OS cumulative wealth over time
              </p>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={wealthData}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00f0ff" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00f0ff" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorStaked" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#00ff88" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#00ff88" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                    <XAxis
                      dataKey="date"
                      stroke="rgba(255,255,255,0.15)"
                      fontSize={12}
                      tickLine={false}
                    />
                    <YAxis
                      stroke="rgba(255,255,255,0.15)"
                      fontSize={12}
                      tickLine={false}
                      tickFormatter={(v) => `$${v}`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(10,22,40,0.95)',
                        border: '1px solid rgba(0,240,255,0.2)',
                        borderRadius: '12px',
                        color: '#e2e8f0',
                        fontSize: '12px',
                      }}
                      formatter={(value: number | undefined) => [`$${(value ?? 0).toFixed(2)}`, '']}
                    />
                    <Area
                      type="monotone"
                      dataKey="balance"
                      stroke="#00f0ff"
                      fill="url(#colorBalance)"
                      strokeWidth={2}
                      name="Total Balance"
                    />
                    <Area
                      type="monotone"
                      dataKey="staked"
                      stroke="#00ff88"
                      fill="url(#colorStaked)"
                      strokeWidth={2}
                      name="Staked"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <div className="glass-strong rounded-2xl p-6 neon-border animate-fade-in-up">
                <h3 className="text-white font-semibold mb-1">Weekly Revenue</h3>
                <p className="text-white/30 text-sm mb-6">Audit revenue per week</p>
                <div className="h-52">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" />
                      <XAxis
                        dataKey="month"
                        stroke="rgba(255,255,255,0.15)"
                        fontSize={12}
                        tickLine={false}
                      />
                      <YAxis
                        stroke="rgba(255,255,255,0.15)"
                        fontSize={12}
                        tickLine={false}
                        tickFormatter={(v) => `$${v}`}
                      />
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(10,22,40,0.95)',
                          border: '1px solid rgba(0,240,255,0.2)',
                          borderRadius: '12px',
                          color: '#e2e8f0',
                          fontSize: '12px',
                        }}
                      />
                      <Bar dataKey="revenue" fill="#00f0ff" radius={[4, 4, 0, 0]} name="Revenue ($)" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Allocation Pie */}
              <div className="glass-strong rounded-2xl p-6 neon-border animate-fade-in-up">
                <h3 className="text-white font-semibold mb-1">Fund Allocation</h3>
                <p className="text-white/30 text-sm mb-6">How AEGIS distributes its funds</p>
                <div className="h-52 flex items-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} opacity={0.8} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          background: 'rgba(10,22,40,0.95)',
                          border: '1px solid rgba(0,240,255,0.2)',
                          borderRadius: '12px',
                          color: '#e2e8f0',
                          fontSize: '12px',
                        }}
                        formatter={(value: number | undefined) => [`$${(value ?? 0).toFixed(2)}`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-wrap gap-4 justify-center mt-2">
                  {allocationData.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: item.color }}
                      />
                      <span className="text-white/40 text-xs">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'transactions' && (
          <div className="glass-strong rounded-2xl neon-border overflow-hidden animate-fade-in-up">
            <div className="p-6 border-b border-white/5">
              <h3 className="text-white font-semibold">PinionOS Transaction History</h3>
              <p className="text-white/30 text-sm">
                All autonomous transactions executed by AEGIS on Base L2
              </p>
            </div>
            <div className="divide-y divide-white/5">
              {transactions.map((tx, i) => (
                <div
                  key={i}
                  className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        tx.amount.startsWith('+')
                          ? 'bg-matrix-green/10'
                          : 'bg-warning-yellow/10'
                      }`}
                    >
                      <DollarSign
                        className={`h-4 w-4 ${
                          tx.amount.startsWith('+')
                            ? 'text-matrix-green'
                            : 'text-warning-yellow'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="text-white/80 text-sm font-medium">{tx.type}</p>
                      <p className="text-white/20 text-xs font-mono">{tx.id}</p>
                    </div>
                  </div>
                  <div className="text-right flex items-center gap-4">
                    <div>
                      <p
                        className={`text-sm font-semibold ${
                          tx.amount.startsWith('+')
                            ? 'text-matrix-green'
                            : 'text-warning-yellow'
                        }`}
                      >
                        {tx.amount}
                      </p>
                      <p className="text-white/20 text-xs">{tx.time}</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-white/10 hover:text-white/30 cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-white/5 text-center">
              <button className="text-neon-cyan/50 text-sm hover:text-neon-cyan transition-colors cursor-pointer">
                View All on BaseScan →
              </button>
            </div>
          </div>
        )}

        {/* On-Chain Proof */}
        <div className="mt-8 glass rounded-xl p-6 text-center animate-fade-in-up">
          <p className="text-white/20 text-sm mb-2">
            All data is verifiable on-chain
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-neon-cyan/40 text-xs font-mono">
              Contract: 0x1234...AEGIS
            </span>
            <ExternalLink className="h-3 w-3 text-neon-cyan/30" />
          </div>
        </div>
      </div>
    </div>
  );
}
