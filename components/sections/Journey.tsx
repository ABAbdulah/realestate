'use client';

import { motion } from 'framer-motion';
import { pillars } from '@/lib/config';

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Journey() {
  return (
    <div>
      {pillars.map((p, i) => {
        const fromLeft = i % 2 === 0;
        return (
          <section
            key={p.id}
            className={`relative flex h-screen items-center px-6 md:px-16 ${
              fromLeft ? 'justify-start' : 'justify-end'
            }`}
          >
            <motion.div
              initial={{ opacity: 0, x: fromLeft ? -80 : 80, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.8, ease }}
              className="relative max-w-md"
            >
              {/* scrim so text reads over the 3D */}
              <div className="absolute -inset-6 -z-10 rounded-3xl bg-ink/55 backdrop-blur-[2px]" />
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">{p.eyebrow}</p>
              <h2 className="mt-3 text-4xl font-extrabold tracking-tightest text-sand md:text-5xl">{p.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{p.body}</p>
              <div className="mt-6 h-px w-24 bg-gradient-to-r from-gold to-transparent" />
            </motion.div>
          </section>
        );
      })}
    </div>
  );
}
