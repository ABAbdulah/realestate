'use client';

import { brand } from '@/lib/config';

export default function Nav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-30">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="font-mono text-sm uppercase tracking-[0.2em] text-sand">
          {brand.name.split(' ')[0]}
          <span className="text-gold">.</span>
        </a>
        <nav className="hidden items-center gap-8 text-sm text-muted md:flex">
          <a href="#proof" className="transition-colors hover:text-sand">Results</a>
          <a href="#coverage" className="transition-colors hover:text-sand">Coverage</a>
          <a href="#blog" className="transition-colors hover:text-sand">Insights</a>
        </nav>
        <a
          href="#contact"
          className="rounded-full border border-gold/40 bg-gold/10 px-5 py-2 text-sm font-semibold text-gold-400 backdrop-blur-sm transition-colors hover:bg-gold/20"
        >
          Get Deals
        </a>
      </div>
    </header>
  );
}
