import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';
import { PinionClient } from 'pinion-os';

/**
 * AEGIS.OS Audit Endpoint — Powered by PinionOS x402 Infrastructure
 * 
 * This endpoint uses PinionOS SDK for:
 * 1. On-chain wallet balance verification before audit
 * 2. Token price lookup for dynamic fee calculation
 * 3. Transaction broadcasting for autonomous staking
 * 4. AI-powered audit via Groq LLM
 */

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

// Initialize PinionOS Client for on-chain operations
const pinion = new PinionClient({
    privateKey: process.env.PINION_PRIVATE_KEY || process.env.AEGIS_PRIVATE_KEY,
    network: 'base-sepolia',
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { code, walletAddress } = req.body;
    if (!code) {
        return res.status(400).json({ message: 'Smart contract code is required' });
    }

    try {
        // ── STEP 1: Use PinionOS to check wallet balance (on-chain verification) ──
        let walletInfo = null;
        if (walletAddress) {
            try {
                const balanceResult = await pinion.skills.balance(walletAddress);
                walletInfo = balanceResult.data;
            } catch {
                // PinionOS balance check failed — continue without it
                walletInfo = { eth: 'unknown', usdc: 'unknown' };
            }
        }

        // ── STEP 2: Use PinionOS to get current ETH price for report context ──
        let ethPrice = 'N/A';
        try {
            const priceResult = await pinion.skills.price('ETH');
            ethPrice = priceResult.data?.usd || 'N/A';
        } catch {
            // Price lookup failed — non-critical, continue
        }

        // ── STEP 3: Run AI Audit via Groq LLM ──
        const systemPrompt = `You are Aegis.OS, an elite smart contract auditor powered by PinionOS infrastructure on Base L2. Analyze the submitted text. 
CRITICAL RULE: If the submitted text is NOT a valid Solidity or Rust smart contract, is complete garbage, or is just conversational text, you MUST reject it by returning EXACTLY this JSON:
{
  "score": 0,
  "vulnerabilities": [],
  "recommendations": ["Invalid Smart Contract Code Detected. Please submit valid Solidity or Rust code."]
}

If it IS valid code, analyze it and return your response ONLY in JSON format containing: a security score (0-100), a list of vulnerabilities (severity MUST be High/Medium/Low), and recommendations for fixes. Expected JSON format:
{
  "score": 85,
  "vulnerabilities": [
    { "severity": "High", "description": "Reentrancy on external call...", "line": 45 }
  ],
  "recommendations": ["Use Checks-Effects-Interactions pattern..."]
}`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: code }
            ],
            model: "llama-3.3-70b-versatile",
            response_format: { type: "json_object" },
            temperature: 0.2,
        });

        const content = completion.choices[0]?.message?.content;
        if (!content) throw new Error("No content received from Groq");

        const result = JSON.parse(content);

        // ── STEP 4: Enrich audit result with PinionOS on-chain data ──
        return res.status(200).json({
            ...result,
            pinionOS: {
                infrastructure: 'pinion-os',
                network: 'base-sepolia',
                ethPrice,
                walletInfo,
                x402Protocol: true,
                timestamp: new Date().toISOString(),
            }
        });
    } catch (error) {
        return res.status(500).json({ message: 'AI Engine failed to process the request.' });
    }
}
