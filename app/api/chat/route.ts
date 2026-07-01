import { NextResponse } from 'next/server';
import { chatbot } from '@/lib/config';

export const runtime = 'nodejs';

type Msg = { role: 'user' | 'assistant'; content: string };

// ── Provider-agnostic chat. Swap providers with the AI_PROVIDER env var. ──
// AI_PROVIDER=gemini  -> Google Gemini Flash (free tier, for dev/testing)
// AI_PROVIDER=openai  -> OpenAI GPT (production)
// No key set          -> graceful mock reply so the demo works offline.

async function callGemini(messages: Msg[]): Promise<string> {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return mockReply(messages);
  const model = process.env.GEMINI_MODEL || 'gemini-2.0-flash';
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: chatbot.systemPrompt }] },
        contents: messages.map((m) => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }],
        })),
      }),
    },
  );
  if (!res.ok) throw new Error(`Gemini ${res.status}`);
  const data = await res.json();
  return data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I didn't catch that.";
}

async function callOpenAI(messages: Msg[]): Promise<string> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return mockReply(messages);
  const model = process.env.OPENAI_MODEL || 'gpt-4o-mini';
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: chatbot.systemPrompt }, ...messages],
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}`);
  const data = await res.json();
  return data?.choices?.[0]?.message?.content ?? "Sorry, I didn't catch that.";
}

function mockReply(messages: Msg[]): string {
  const last = messages[messages.length - 1]?.content ?? '';
  return `(${'demo mode — no API key set'}) Thanks! You said: "${last.slice(0, 80)}". In production I'd qualify your buy-box and capture your contact so the team can send matching off-market deals. Add a GEMINI_API_KEY or OPENAI_API_KEY in .env to go live.`;
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages: Msg[] };
    if (!Array.isArray(messages)) {
      return NextResponse.json({ error: 'messages[] required' }, { status: 400 });
    }
    const provider = (process.env.AI_PROVIDER || 'gemini').toLowerCase();
    const reply = provider === 'openai' ? await callOpenAI(messages) : await callGemini(messages);
    return NextResponse.json({ reply });
  } catch (err) {
    console.error('[chat] error', err);
    return NextResponse.json(
      { reply: "I'm having trouble connecting right now — please try again in a moment." },
      { status: 200 },
    );
  }
}
