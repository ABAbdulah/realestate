'use client';

import { Play, Quote, Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { stats, testimonials } from '@/lib/config';

export default function SocialProof() {
  return (
    <section id="proof" className="relative z-10 bg-ink">
      {/* fade from the transparent 3D journey into the solid section */}
      <div className="pointer-events-none absolute -top-40 left-0 right-0 h-40 bg-gradient-to-b from-transparent to-ink" />

      <div className="mx-auto max-w-7xl px-6 py-28">
        {/* Stats */}
        <Reveal className="grid grid-cols-2 gap-8 border-y border-white/10 py-12 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-mono text-4xl font-bold text-gold-400 md:text-5xl">{s.value}</div>
              <div className="mt-2 text-sm uppercase tracking-wider text-muted">{s.label}</div>
            </div>
          ))}
        </Reveal>

        {/* Heading */}
        <Reveal className="mt-24 max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">Proof, not promises</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tightest text-sand md:text-5xl">
            Investors who closed with us
          </h2>
        </Reveal>

        {/* Video reviews */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink-900/60 p-6 transition-colors hover:border-gold/40">
                {/* video placeholder */}
                <div className="relative mb-6 grid aspect-video place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-ink-800 to-black">
                  <div className="grid h-14 w-14 place-items-center rounded-full bg-gold/90 text-ink transition-transform group-hover:scale-110">
                    <Play className="h-5 w-5 translate-x-[1px]" fill="currentColor" />
                  </div>
                  <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-widest text-muted">
                    video review
                  </span>
                </div>
                <Quote className="h-6 w-6 text-gold/50" />
                <p className="mt-3 font-quote text-lg italic leading-relaxed text-sand">&ldquo;{t.quote}&rdquo;</p>
                <div className="mt-auto pt-6">
                  <div className="flex gap-0.5 text-gold">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5" fill="currentColor" />
                    ))}
                  </div>
                  <div className="mt-2 font-semibold text-sand">{t.name}</div>
                  <div className="text-sm text-muted">{t.role}</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
