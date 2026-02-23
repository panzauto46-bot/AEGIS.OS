import { createPublicClient, createWalletClient, http, parseAbi, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';
import { PinionClient } from 'pinion-os';

/**
 * AEGIS.OS — Autonomous Yield Farming Loop
 * Powered by PinionOS x402 Infrastructure on Base L2
 * 
 * This worker uses PinionOS SDK for:
 * - Wallet balance monitoring via skills.balance()
 * - Token price tracking via skills.price()
 * - Transaction verification via skills.tx()
 * - On-chain fund status via skills.fund()
 * 
 * Combined with direct Viem integration for:
 * - ERC-20 approve + Aave V3 supply automation
 * - USDC Transfer event listening
 */

// ── PinionOS Client (x402 micropayments for on-chain data skills) ──
const pinion = new PinionClient({
  privateKey: process.env.AEGIS_PRIVATE_KEY || process.env.PINION_PRIVATE_KEY,
  network: 'base',
});

// ── Viem Clients (direct on-chain interactions) ──
const account = privateKeyToAccount(process.env.AEGIS_PRIVATE_KEY as `0x${string}`);

const publicClient = createPublicClient({
  chain: base,
  transport: http(process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
});

const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http(process.env.BASE_RPC_URL || 'https://mainnet.base.org'),
});

// ── Contract Addresses on Base ──
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const AAVE_V3_POOL_ADDRESS = '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5';

const ERC20_ABI = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
]);

const AAVE_ABI = parseAbi([
  'function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)',
]);

/**
 * The Autonomy Loop — PinionOS-Powered DeFi Worker
 * 
 * Monitors incoming $5 USDC payments, retains $0.50 for AI compute fuel,
 * and stakes $4.50 into Aave V3 for autonomous yield generation.
 */
async function autonomyLoop() {
  console.log('[AEGIS.OS] 🛡️ Autonomy Loop Started on Base L2...');
  console.log('[AEGIS.OS] 📡 PinionOS SDK initialized for x402 skill access');

  // ── PinionOS: Check initial wallet balance & funding status ──
  try {
    const balance = await pinion.skills.balance(account.address);
    console.log(`[AEGIS.OS] 💰 Wallet Balance: ETH=${balance.data.eth}, USDC=${balance.data.usdc}`);

    const ethPrice = await pinion.skills.price('ETH');
    console.log(`[AEGIS.OS] 📈 Current ETH Price: $${ethPrice.data.usd}`);

    const fundStatus = await pinion.skills.fund(account.address);
    console.log(`[AEGIS.OS] 🏦 Fund Status:`, fundStatus.data);
  } catch (error) {
    console.warn('[AEGIS.OS] ⚠️ PinionOS initial check skipped (x402 payment needed)');
  }

  // ── Event Listener: Watch for incoming USDC ──
  publicClient.watchContractEvent({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    eventName: 'Transfer',
    args: { to: account.address },
    onLogs: async (logs) => {
      for (const log of logs) {
        const amountReceived = log.args.value;
        if (!amountReceived) continue;

        const usdcReceived = Number(amountReceived) / 1e6;
        console.log(`[AEGIS.OS] 🚨 Incoming: ${usdcReceived} USDC at Block ${log.blockNumber}`);

        if (usdcReceived >= 5.0) {
          console.log('[AEGIS.OS] ⚡ Initiating The Autonomy Loop...');

          // ── PinionOS: Verify the transaction on-chain ──
          try {
            const txInfo = await pinion.skills.tx(log.transactionHash);
            console.log(`[AEGIS.OS] 🔍 PinionOS tx verification:`, txInfo.data);
          } catch {
            console.warn('[AEGIS.OS] ⚠️ PinionOS tx lookup skipped');
          }

          const amountToStake = parseUnits('4.5', 6);

          try {
            // 1. Approve USDC to Aave Pool
            console.log('[AEGIS.OS] 📝 ERC-20 Approval → Aave V3 Pool...');
            const { request: approveReq } = await publicClient.simulateContract({
              account,
              address: USDC_ADDRESS,
              abi: ERC20_ABI,
              functionName: 'approve',
              args: [AAVE_V3_POOL_ADDRESS, amountToStake],
            });
            const approveHash = await walletClient.writeContract(approveReq);
            await publicClient.waitForTransactionReceipt({ hash: approveHash });
            console.log(`[AEGIS.OS] ✅ Approved: ${approveHash}`);

            // 2. Supply $4.50 to Aave V3
            console.log('[AEGIS.OS] 🏦 Staking $4.50 → Aave V3...');
            const { request: supplyReq } = await publicClient.simulateContract({
              account,
              address: AAVE_V3_POOL_ADDRESS,
              abi: AAVE_ABI,
              functionName: 'supply',
              args: [USDC_ADDRESS, amountToStake, account.address, 0],
            });
            const supplyHash = await walletClient.writeContract(supplyReq);
            await publicClient.waitForTransactionReceipt({ hash: supplyHash });

            console.log(`[AEGIS.OS] 🟢 SUCCESS! $4.50 staked in Aave V3 (tx: ${supplyHash})`);

            // ── PinionOS: Post-stake balance check ──
            try {
              const postBalance = await pinion.skills.balance(account.address);
              console.log(`[AEGIS.OS] 💰 Post-stake Balance: ETH=${postBalance.data.eth}, USDC=${postBalance.data.usdc}`);
            } catch {
              // Non-critical
            }

          } catch (error) {
            console.error('[AEGIS.OS] 🔴 Yield Farming FAILED:', error);
          }
        }
      }
    },
  });
}

// Run the loop
autonomyLoop().catch(console.error);
