import type { VercelRequest, VercelResponse } from '@vercel/node';
import Groq from 'groq-sdk';

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ message: 'Smart contract code is required' });
    }

    const systemPrompt = `You are Aegis.OS, an elite smart contract auditor. Analyze the submitted text. 
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

    try {
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
        return res.status(200).json(result);
    } catch (error) {
        console.error('[AEGIS.OS] Audit Engine Error:', error);
        return res.status(500).json({ message: 'AI Engine failed to process the request.' });
    }
}
