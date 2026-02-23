<div align="center">

# 🛡️ AEGIS.OS

### The First Self-Funding AI Smart Contract Auditor

*An autonomous agent that audits your code, earns its own money, stakes its profits into DeFi, and funds its own AI compute. No human intervention required.*

[![Built on Base](https://img.shields.io/badge/Built%20on-Base%20L2-0052FF?style=for-the-badge&logo=coinbase&logoColor=white)](https://base.org)
[![Powered by Groq](https://img.shields.io/badge/Powered%20by-Groq%20AI-F55036?style=for-the-badge)](https://groq.com)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://aegis-os-id.vercel.app)
[![License: MIT](https://img.shields.io/badge/License-MIT-00E5FF?style=for-the-badge)](LICENSE)

**[🌐 Live Demo](https://aegis-os-id.vercel.app)** · **[📄 Documentation](#-architecture)** · **[🐛 Report Bug](https://github.com/panzauto46-bot/AEGIS.OS/issues)**

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)
- [How It Works](#-how-it-works)
- [Roadmap](#-roadmap)
- [Screenshots](#-screenshots)
- [License](#-license)

---

## 🧠 Overview

**AEGIS.OS** is a full-stack, AI-powered smart contract auditing platform combined with a fully autonomous DeFi yield farming loop — built on the **Base L2** blockchain.

Unlike traditional audit tools that require manual review and centralized payment rails, AEGIS.OS is designed to be **completely self-sustaining**:

1. A user pays **$5 USDC** on-chain to unlock an audit.
2. AEGIS splits the fee: **$0.50** for AI compute costs, **$4.50** into Aave V3 yield farming.
3. The **Groq LLM** (`llama-3.3-70b-versatile`) analyzes the submitted smart contract.
4. A comprehensive security report is generated with vulnerabilities, severity ratings, and actionable recommendations.
5. The user can **download the report as PDF** and **verify on-chain activity via BaseScan**.

> *" Built for the PinionOS Hackathon — proving that AI agents can be economically autonomous."*

---

## ✨ Key Features

| Feature | Description |
|---|---|
| 🤖 **AI-Powered Auditing** | Deep static analysis of Solidity & Rust contracts via Groq LLM (`llama-3.3-70b-versatile`) with structured JSON output |
| 💰 **$5 USDC On-Chain Paywall** | Web3-native payment using USDC on the Base network — no credit cards, no middlemen |
| 🔄 **Autonomous Yield Loop** | Background worker (`autonomy_loop.ts`) auto-stakes $4.50 from every payment into Aave V3 |
| 🔗 **On-Chain Proof of Life** | Direct BaseScan link in every audit report for transparent on-chain verification |
| 📄 **PDF Report Export** | One-click downloadable audit reports with scores, vulnerabilities, and AI recommendations |
| 🎨 **Custom Wallet UX** | Fully themed RainbowKit integration with neon dark aesthetics and English locale |
| 🛡️ **Garbage Input Rejection** | AI system prompt rejects non-code inputs with structured error responses |
| ⚡ **Error Resilience** | Handles insufficient funds, network drops, and transaction failures gracefully |
| 🧹 **Zero Console Leaks** | Production builds strip all `console.log` and `debugger` statements via esbuild |

---

## 🏗 Architecture

AEGIS.OS operates on **4 fundamental pillars**:

```
┌─────────────────────────────────────────────────────────────────┐
│                        AEGIS.OS ARCHITECTURE                     │
├──────────────┬──────────────┬───────────────┬───────────────────┤
│   PILLAR 1   │   PILLAR 2   │   PILLAR 3    │     PILLAR 4      │
│  Identity &  │   Access     │  AI Analysis  │  Autonomous       │
│  Auth        │   Control    │  Engine       │  Yield Loop       │
├──────────────┼──────────────┼───────────────┼───────────────────┤
│ RainbowKit   │ $5 USDC      │ Groq SDK      │ autonomy_loop.ts  │
│ Wagmi v2     │ PaymentModal │ llama-3.3-70b │ Aave V3 Supply    │
│ WalletConnect│ Base Network │ Vercel        │ ERC20 Approve     │
│ ConnectButton│ Transaction  │ Serverless    │ PinionOS Worker   │
│ (Custom)     │ Verification │ Function      │ USDC Listener     │
└──────────────┴──────────────┴───────────────┴───────────────────┘

User Flow:
  Connect Wallet → Pay $5 USDC → Submit Code → AI Analyzes →
  → Report Generated → Download PDF → Verify on BaseScan
                                         ↓
                              $4.50 auto-staked to Aave V3
                              $0.50 retained for AI fuel
```

---

## 🛠 Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 19.2.3 | UI Framework |
| TypeScript | 5.9.3 | Type Safety |
| Vite | 7.2.4 | Build Tool & Dev Server |
| Tailwind CSS | 4.1.17 | Utility-First Styling |
| Recharts | 3.7.0 | Data Visualization |
| Lucide React | 0.575.0 | Icon System |

### Web3
| Technology | Version | Purpose |
|---|---|---|
| Wagmi | 2.14.0 | React Hooks for Ethereum |
| Viem | 2.46.2 | TypeScript Ethereum Interface |
| RainbowKit | 2.2.10 | Wallet Connection UI |
| @tanstack/react-query | 5.90.21 | Async State Management |

### Backend / AI
| Technology | Version | Purpose |
|---|---|---|
| Groq SDK | 0.37.0 | LLM API Client |
| @vercel/node | 5.6.6 | Serverless Function Runtime |
| Vercel | — | Deployment & Hosting |

### Blockchain
| Network | Protocol | Purpose |
|---|---|---|
| Base (L2) | USDC ERC-20 | Payment Currency |
| Aave V3 | Lending Pool | Yield Farming Destination |
| BaseScan | Explorer | On-Chain Verification |

---

## 📁 Project Structure

```
AEGIS.OS/
│
├── api/                              # Vercel Serverless Functions
│   └── audit.ts                      # POST /api/audit — Groq AI analysis endpoint
│
├── scripts/                          # PinionOS Background Workers
│   └── autonomy_loop.ts              # Auto-staking loop: USDC listener → Aave V3
│
├── src/                              # Frontend Application Source
│   ├── components/                   # Reusable UI Components
│   │   ├── AuditReport.tsx           # Security report display + PDF export
│   │   ├── Navbar.tsx                # Navigation + Custom ConnectButton
│   │   ├── ParticleField.tsx         # Animated background particles
│   │   ├── PaymentModal.tsx          # $5 USDC checkout + tx state handling
│   │   ├── StatusTicker.tsx          # Real-time financial dashboard ticker
│   │   └── Terminal.tsx              # Hacking-style processing animation
│   │
│   ├── pages/                        # Application Pages
│   │   ├── AuditPage.tsx             # Code editor + audit workflow engine
│   │   ├── LandingPage.tsx           # Hero section + feature showcase
│   │   └── TransparencyPage.tsx      # Financial transparency dashboard
│   │
│   ├── utils/                        # Utility Functions
│   │   └── cn.ts                     # Tailwind class merge utility (clsx + twMerge)
│   │
│   ├── App.tsx                       # Root application component + routing
│   ├── Web3Provider.tsx              # Wagmi + RainbowKit configuration
│   ├── main.tsx                      # React DOM entry point
│   └── index.css                     # Global styles + design tokens
│
├── .env                              # Environment variables (git-ignored)
├── .env.example                      # Environment template
├── .gitignore                        # Git ignore rules
├── .npmrc                            # npm config (legacy-peer-deps)
├── index.html                        # HTML entry point + Google Fonts
├── LICENSE                           # MIT License — Pandu Dargah
├── package.json                      # Dependencies & scripts
├── tsconfig.json                     # TypeScript configuration
├── vercel.json                       # Vercel deployment settings
├── vite.config.ts                    # Vite build config + esbuild optimizations
└── README.md                         # Project documentation (you are here)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and npm
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- USDC on Base network (for live payments)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/panzauto46-bot/AEGIS.OS.git
cd AEGIS.OS

# 2. Install dependencies
npm install --legacy-peer-deps

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your GROQ_API_KEY

# 4. Start development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build (strips console.log) |
| `npm run preview` | Preview production build locally |

---

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Required — Groq AI API Key (get free at https://console.groq.com)
GROQ_API_KEY=gsk_your_api_key_here

# Optional — WalletConnect Project ID (get free at https://cloud.walletconnect.com)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id

# Required for autonomy_loop.ts only (injected via PinionOS)
AEGIS_PRIVATE_KEY=0x_your_private_key
BASE_RPC_URL=https://mainnet.base.org
```

> ⚠️ **Security**: Never commit `.env` files. API keys are server-side only (in `api/audit.ts`). No secrets are exposed in the frontend bundle.

---

## ☁️ Deployment

AEGIS.OS is optimized for **Vercel** deployment:

1. Import the GitHub repository in [Vercel Dashboard](https://vercel.com)
2. Framework will be auto-detected as **Vite**
3. Add `GROQ_API_KEY` in **Settings → Environment Variables**
4. Deploy — Vercel handles the rest automatically

The `vercel.json` ensures proper configuration:
```json
{
  "installCommand": "npm install --legacy-peer-deps",
  "buildCommand": "npm run build",
  "outputDirectory": "dist"
}
```

**Live Production URL**: [https://aegis-os-id.vercel.app](https://aegis-os-id.vercel.app)

---

## ⚙️ How It Works

### 1. Neural Audit Engine (`api/audit.ts`)

The serverless function receives Solidity/Rust code via POST and sends it to Groq's `llama-3.3-70b-versatile` model with a specialized system prompt. The AI returns structured JSON:

```json
{
  "score": 72,
  "vulnerabilities": [
    {
      "severity": "High",
      "description": "Reentrancy vulnerability in withdraw()",
      "line": 45
    }
  ],
  "recommendations": [
    "Use Checks-Effects-Interactions pattern"
  ]
}
```

**Garbage rejection**: Non-code inputs are automatically rejected with `score: 0` and an error message.

### 2. Payment Flow (`PaymentModal.tsx`)

Uses Wagmi's `useWriteContract` to execute a USDC `transfer()` on Base. The modal handles:
- ✅ Wallet confirmation states
- ✅ Network waiting indicators
- ✅ Insufficient funds detection
- ✅ Transaction failure recovery
- ✅ Demo mode bypass

### 3. Autonomy Loop (`scripts/autonomy_loop.ts`)

A Node.js background worker that:
1. Listens for incoming USDC `Transfer` events to the AEGIS treasury
2. Deducts $0.50 for AI fuel costs
3. Approves $4.50 USDC to the Aave V3 Pool contract
4. Calls `supply()` to deposit into Aave V3 for yield generation

---

## 🗺 Roadmap

### Phase 1: Genesis ✅
- [x] Dark-mode terminal UI with particle animations
- [x] Wallet integration (Wagmi + RainbowKit + Custom Styling)
- [x] $5 USDC on-chain paywall with error handling

### Phase 2: Neural Integration ✅
- [x] Groq API integration (`llama-3.3-70b-versatile`)
- [x] Structured JSON audit reports
- [x] Garbage input rejection system prompt
- [x] PDF report generation & download

### Phase 3: Autonomous DeFi Loop ✅
- [x] `autonomy_loop.ts` background worker
- [x] USDC event listener on Base
- [x] ERC-20 approve + Aave V3 `supply()` automation
- [x] On-chain verification via BaseScan link

### Phase 4: Scale & Expand 🔮
- [ ] Multi-language support (Cairo, Move, Vyper)
- [ ] Historical audit storage on IPFS / Arweave
- [ ] Automated CI/CD audit hooks for GitHub repos
- [ ] Multi-chain deployment (Optimism, Arbitrum, zkSync)
- [ ] DAO governance for treasury allocation

---

## 📸 Screenshots

| Landing Page | Audit Workspace | Security Report |
|---|---|---|
| Dark-mode hero with particle animations | Code editor with syntax highlighting | AI-generated vulnerability analysis |

---

## 📄 License

This project is licensed under the **MIT License**.

```
MIT License — Copyright (c) 2026 Pandu Dargah
```

See [LICENSE](LICENSE) for the full text.

---

<div align="center">

**Built with 🛡️ by [Pandu Dargah](https://github.com/panzauto46-bot)**

*AEGIS.OS — Where AI meets Autonomous DeFi on Base L2*

</div>
