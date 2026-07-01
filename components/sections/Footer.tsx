'use client';

import { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { brand, socials } from '@/lib/config';

export default function Footer() {
  const [sent, setSent] = useState(false);

  // Demo handler. Production: POST to /api/lead (DB + email + CRM webhook).
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <footer id="contact" className="relative z-10 bg-ink">
      <div className="mx-auto max-w-7xl px-6 py-28">
        {/* Final CTA + lead form */}
        <div className="grid gap-12 rounded-3xl border border-gold/20 bg-gradient-to-br from-ink-900 to-ink p-10 md:grid-cols-2 md:p-14">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tightest text-sand md:text-5xl">
              Get deals in your inbox.
            </h2>
            <p className="mt-4 max-w-md text-lg text-muted">{brand.tagline} Tell us your buy-box and we&apos;ll match you with off-market inventory.</p>
          </div>

          {sent ? (
            <div className="flex flex-col items-start justify-center gap-3 rounded-2xl border border-gold/30 bg-gold/5 p-8">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-gold text-onaccent">
                <Check className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-sand">You&apos;re on the list.</h3>
              <p className="text-muted">We&apos;ll reach out with deals that fit your market.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Full name" aria-label="Full name" className="rounded-xl border border-sand/10 bg-ink-900 px-4 py-3 text-sand placeholder:text-muted/60 focus:border-gold/60 focus:outline-none" />
                <input required type="email" placeholder="Email" aria-label="Email" className="rounded-xl border border-sand/10 bg-ink-900 px-4 py-3 text-sand placeholder:text-muted/60 focus:border-gold/60 focus:outline-none" />
              </div>
              <select required aria-label="Investor type" defaultValue="" className="rounded-xl border border-sand/10 bg-ink-900 px-4 py-3 text-sand focus:border-gold/60 focus:outline-none">
                <option value="" disabled>I am a…</option>
                <option>Fix &amp; flip investor</option>
                <option>Wholesaler</option>
                <option>Buy &amp; hold investor</option>
              </select>
              <input placeholder="Target markets (e.g. TX, FL)" aria-label="Target markets" className="rounded-xl border border-sand/10 bg-ink-900 px-4 py-3 text-sand placeholder:text-muted/60 focus:border-gold/60 focus:outline-none" />
              <button type="submit" className="group flex items-center justify-center gap-2 rounded-xl bg-gold px-6 py-3.5 font-semibold text-onaccent transition-transform hover:scale-[1.02]">
                Join the buyer list
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </form>
          )}
        </div>

        {/* Footer links */}
        <div className="mt-20 flex flex-col items-center justify-between gap-8 border-t border-sand/10 pt-10 md:flex-row">
          <div className="font-mono text-sm uppercase tracking-[0.2em] text-sand">
            {brand.name}
            <span className="text-gold">.</span>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {socials.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-sm text-muted transition-colors hover:text-gold-400">
                {s.label}
              </a>
            ))}
          </nav>
          <p className="text-xs text-muted/60">© 2026 {brand.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
