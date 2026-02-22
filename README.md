<div align="center">
  <img src="https://via.placeholder.com/150/000000/00ffff?text=AEGIS.OS" alt="AEGIS.OS Logo" width="120" />
  <h1>🛡️ AEGIS.OS</h1>
  <p><strong>Autonomous Neural Smart Contract Evaluator & DeFi Auto-Compounding Engine</strong></p>
  <p>Built exclusively on the elite PinionOS framework for the Base L2 Ecosystem.</p>
</div>

---

## 🌟 Executive Summary

**AEGIS.OS** is a revolutionary, full-stack, AI-powered smart contract auditing workspace combined with a completely autonomous "Proof-of-Life" DeFi staking loop. Designed to address the increasing complexities and security flaws in modern decentralized applications, AEGIS.OS offers real-time, deep static and heuristic code analysis using an advanced Groq LLM model (`llama-3.3-70b`). 

What sets AEGIS.OS apart is its uncompromising tokenomic flow. By unlocking the audit engine with a pure on-chain web3 transaction ($5 USDC on Base), AEGIS.OS natively supports itself, retaining AI fuel fees and automatically executing cross-protocol yield farming strategies to the Aave V3 market.

> “Bridging the gap between cutting-edge LLMs and fully automated decentralized finance protocols.”

---

## 🏗️ Project Architecture & Workflow

AEGIS.OS operates based on four fundamental pillars, uniting frontend client interfaces, robust AI backend reasoning, and real-time blockchain execution.

### The 4 Pillars of AEGIS.OS

1. **Authentication & Identity**: Wallet integration powered by `wagmi` and `RainbowKit` connecting users instantly to the Base and Base Sepolia networks.
2. **Access Control (Paywall)**: Smart, responsive UI lock relying on on-chain transaction verifications for $5 USDC transfer.
3. **Core Analysis Engine**: Serverless Node API securely interacting with the Groq SDK (`llama-3.3-70b-versatile`) to compile exhaustive JSON audits dynamically.
4. **Autonomous Yield (The Loop)**: A persistent, background worker script representing the soul of PinionOS, automatically intercepting incoming fees, routing $0.50 for operational AI fuel, and approving/staking $4.50 directly into the Aave V3 Liquidity Pool.

### Project Directory Structure

```text
AEGIS.OS/
├── api/
│   └── audit.ts                 // Serverless execution context for Groq AI
├── scripts/
│   └── autonomy_loop.ts         // PinionOS worker script for auto-staking to Aave V3
├── src/
│   ├── components/
│   │   ├── AuditReport.tsx      // Dynamic UI parsing Groq results & Proof-of-life link
│   │   ├── Navbar.tsx           // Navigation & RainbowKit ConnectButton
│   │   ├── PaymentModal.tsx     // Web3 Checkout & tx waiting handlers
│   │   ├── StatusTicker.tsx     // Top financial dashboard (simulated ticker)
│   │   └── Terminal.tsx         // Processing animatic terminal
│   ├── pages/
│   │   ├── AuditPage.tsx        // The main workspace & editor logic
│   │   └── LandingPage.tsx      // Hero entry & feature explanations
│   ├── App.tsx                 
│   ├── main.tsx                 // React DOM root
│   ├── Web3Provider.tsx         // Wagmi + RainbowKit global configuration
│   └── index.css                // Global style implementations
├── .env.example                 // Environment references 
├── package.json                 // Project dependencies and scripts
├── vite.config.ts               // Bundler and build configurations
└── README.md                    // Project Documentation (You are here)
```

---

## 🚀 Key Features

*   **Groq-powered Heuristic Audit**: Parses `.sol` and `.rs` code to locate reentrancy, integer overflows, access control bugs, and gas optimization vectors.
*   **English First System Prompts**: Ensured deterministic JSON output with extreme edge-case handling (rejecting garbage inputs) for flawless UI presentation.
*   **Decentralized UX First**: Modal flows that check blockchain confirmations natively instead of relying on centralized databases. Failsafes built-in for insufficient funds and network drops.
*   **On-chain Verifiability (Proof of Life)**: The Audit Report generates a direct link to BaseScan to verify the background script's yield farming tx.

---

## 🗺️ Roadmap

### Phase 1: Genesis (Completed)
- [x] Integrate Wagmi, Viem, and RainbowKit.
- [x] Design dark-mode "Matrix/Terminal" aesthetics.
- [x] Implement $5 Web3 Paywall modal with transaction tracking.

### Phase 2: Neural Integration (Completed)
- [x] Backend configuration with Groq SDK (`llama-3.3-70b-versatile`).
- [x] JSON enforcement via dynamic System Prompting.
- [x] Implement UI fallback components (Spinners, Terminal logs, Error Toasts). 
- [x] Stress-test edge cases ("Broke User" test, "Garbage In" test).

### Phase 3: The PinionOS Autonomy Loop (Completed)
- [x] Build standalone worker script `autonomy_loop.ts`.
- [x] Establish Web3 listener for incoming USDC events to AEGIS Treasury.
- [x] Automate ERC20 approvals.
- [x] Automate interactions with the Aave V3 supply function.
- [x] Refine log output to professional English for the Hackathon review cycle.

### Phase 4: Production Polish (Ongoing/Next Steps)
- [ ] Implement Live Deployments (Vercel/Cloudflare).
- [ ] Add support for Multi-chain audits beyond Solidity/Rust (e.g., Cairo, Move).
- [ ] Incorporate comprehensive Git-action automated testing suites.

---

## ⚙️ Quick Start Installation

1. **Clone the repository:**
   \`\`\`bash
   git clone https://github.com/panzauto46-bot/AEGIS.OS.git
   cd AEGIS.OS
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   npm install
   \`\`\`

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory and ensure the following keys are populated:
   \`\`\`env
   GROQ_API_KEY=your_groq_api_key
   AEGIS_PRIVATE_KEY=your_pinionOS_wallet_private_key
   BASE_RPC_URL=your_base_rpc_endpoint
   \`\`\`

4. **Launch Application:**
   \`\`\`bash
   npm run dev
   \`\`\`

---

## ⚖️ License

Built with ❤️ by **Pandu Dargah**.  
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
