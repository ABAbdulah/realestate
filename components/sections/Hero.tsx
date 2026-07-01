'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { brand } from '@/lib/config';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  return (
    <section id="top" className="relative flex h-screen flex-col items-center justify-center px-6 text-center">
      {/* readability scrim */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--scrim)_0%,transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Founder face as the brand */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease }}
          className="relative mb-8"
        >
          <div className="absolute -inset-3 rounded-full bg-gold/20 blur-2xl" />
          <div className="relative grid h-32 w-32 place-items-center overflow-hidden rounded-full border border-gold/50 bg-gradient-to-br from-ink-800 to-ink shadow-[0_0_60px_-10px_var(--glow)]">
            <span className="font-quote text-4xl italic text-gold-400">
              {brand.name.split(' ').map((w) => w[0]).join('')}
            </span>
          </div>
          <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-widest text-muted">
            founder portrait / video
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease }}
          className="mt-6 font-mono text-xs uppercase tracking-[0.35em] text-gold-400"
        >
          {brand.role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease }}
          className="mt-4 max-w-4xl text-balance text-5xl font-extrabold leading-[1.02] tracking-tightest text-sand sm:text-6xl md:text-7xl"
        >
          {brand.name}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease }}
          className="mt-5 max-w-xl text-pretty text-lg text-muted"
        >
          {brand.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="mt-9 flex flex-col items-center gap-4 sm:flex-row"
        >
          <a
            href="#contact"
            className="rounded-full bg-gold px-8 py-3.5 font-semibold text-onaccent shadow-[0_8px_30px_-8px_var(--glow)] transition-transform hover:scale-[1.03]"
          >
            Join the Buyer List
          </a>
          <a href="#proof" className="rounded-full border border-sand/15 px-8 py-3.5 font-medium text-sand transition-colors hover:border-gold/50">
            See the results
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest">Scroll to enter</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </motion.div>
    </section>
  );
}
