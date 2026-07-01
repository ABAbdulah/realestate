'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { chatbot } from '@/lib/config';

type Msg = { role: 'user' | 'assistant'; content: string };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: 'assistant', content: chatbot.greeting }]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  async function send() {
    const text = input.trim();
    if (!text || loading) return;
    const next = [...messages, { role: 'user' as const, content: text }];
    setMessages(next);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: 'assistant', content: data.reply ?? '…' }]);
    } catch {
      setMessages((m) => [...m, { role: 'assistant', content: 'Connection error — please try again.' }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* Launcher */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat'}
        className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gold text-onaccent shadow-[0_10px_40px_-8px_var(--glow)] transition-transform hover:scale-105"
      >
        {open ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>

      {/* Panel */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 flex h-[30rem] w-[22rem] max-w-[calc(100vw-3rem)] flex-col overflow-hidden rounded-2xl border border-sand/10 bg-ink-900/95 shadow-2xl backdrop-blur-md">
          <div className="flex items-center gap-3 border-b border-sand/10 px-4 py-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-gold" />
            </span>
            <div>
              <div className="text-sm font-semibold text-sand">Deal Desk Assistant</div>
              <div className="text-[11px] text-muted">Typically replies instantly</div>
            </div>
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-gold text-onaccent'
                      : 'bg-ink-800 text-sand'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl bg-ink-800 px-3.5 py-3 text-sand">
                  <span className="inline-flex gap-1">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.3s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted [animation-delay:-0.15s]" />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-muted" />
                  </span>
                </div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="flex items-center gap-2 border-t border-sand/10 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && send()}
              placeholder="Ask about markets, deals…"
              aria-label="Message"
              className="flex-1 rounded-xl border border-sand/10 bg-ink px-3.5 py-2.5 text-sm text-sand placeholder:text-muted/60 focus:border-gold/60 focus:outline-none"
            />
            <button
              type="button"
              onClick={send}
              disabled={loading}
              aria-label="Send message"
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gold text-onaccent transition-transform hover:scale-105 disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
