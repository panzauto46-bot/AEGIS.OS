import { createPublicClient, createWalletClient, http, parseAbi, parseUnits } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { base } from 'viem/chains';

// AEGIS Wallet Private Key (mounted via PinionOS secure environment)
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

// Addresses on Base Network
const USDC_ADDRESS = '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913';
const AAVE_V3_POOL_ADDRESS = '0xA238Dd80C259a72e81d7e4664a9801593F98d1c5'; // Aave V3 Pool Base

const ERC20_ABI = parseAbi([
  'function balanceOf(address owner) view returns (uint256)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
]);

const AAVE_ABI = parseAbi([
  'function supply(address asset, uint256 amount, address onBehalfOf, uint16 referralCode)',
]);

/**
 * 4. Triggering "The Autonomy Loop" (PinionOS & DeFi Staking)
 * This script runs continuously in the background via PinionOS.
 * Monitors incoming 5 USDC, retains 0.5 USDC for AI operations, and stakes 4.5 USDC into Aave V3.
 */
async function autonomyLoop() {
  console.log('[AEGIS.OS] Autonomy Loop Started on Base L2...');

  // Event Listener: Listen for incoming USDC to the AEGIS wallet
  publicClient.watchContractEvent({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    eventName: 'Transfer',
    args: { to: account.address }, // Filter specifically for incoming transfers
    onLogs: async (logs) => {
      for (const log of logs) {
        const amountReceived = log.args.value;
        if (!amountReceived) continue;

        const usdcReceived = Number(amountReceived) / 1e6; // USDC has 6 decimals
        console.log(`[AEGIS.OS] 🚨 Detected incoming transfer of ${usdcReceived} USDC at Block ${log.blockNumber}`);

        // Logic only executes if at least 5 USDC is received
        if (usdcReceived >= 5.0) {
          console.log('[AEGIS.OS] Initiating The Autonomy Loop...');

          // Split 2: $4.50 (90%) goes into Aave V3 
          // (Split 1: $0.50 automatically remains in the wallet as natural balance)
          const amountToStake = parseUnits('4.5', 6);

          try {
            // 1. Approve USDC to Aave Pool
            console.log('[AEGIS.OS] Sending ERC-20 USDC Approval to Aave V3 Pool...');
            const { request: approveReq } = await publicClient.simulateContract({
              account,
              address: USDC_ADDRESS,
              abi: ERC20_ABI,
              functionName: 'approve',
              args: [AAVE_V3_POOL_ADDRESS, amountToStake],
            });
            const approveHash = await walletClient.writeContract(approveReq);
            await publicClient.waitForTransactionReceipt({ hash: approveHash });
            console.log(`[AEGIS.OS] ✅ Approved tx: ${approveHash}`);

            // 2. Supply to Aave V3
            console.log('[AEGIS.OS] Staking $4.50 into Aave V3 Pool...');
            const { request: supplyReq } = await publicClient.simulateContract({
              account,
              address: AAVE_V3_POOL_ADDRESS,
              abi: AAVE_ABI,
              functionName: 'supply',
              args: [USDC_ADDRESS, amountToStake, account.address, 0],
            });
            const supplyHash = await walletClient.writeContract(supplyReq);
            await publicClient.waitForTransactionReceipt({ hash: supplyHash });

            console.log(`[AEGIS.OS] 🟢 SUCCESS! $4.50 Staked in Aave V3 (tx: ${supplyHash})`);
            // Backend can update DB/UI Ticker Bar here

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
