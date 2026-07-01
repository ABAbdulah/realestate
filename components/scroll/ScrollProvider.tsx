'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useScrollStore } from './useScrollStore';

export default function ScrollProvider({ children }: { children: React.ReactNode }) {
  const setScroll = useScrollStore((s) => s.setScroll);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Reduced motion: skip Lenis, drive progress from native scroll.
    if (prefersReduced) {
      const onScroll = () => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScroll(max > 0 ? window.scrollY / max : 0, 0);
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }

    const lenis = new Lenis({ duration: 1.15, wheelMultiplier: 1, touchMultiplier: 1.5 });
    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    // Read straight off the instance to avoid event-arg typing friction.
    lenis.on('scroll', () => setScroll(lenis.progress ?? 0, lenis.velocity ?? 0));

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [setScroll]);

  return <>{children}</>;
}
