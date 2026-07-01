'use client';

import { useScrollStore } from '@/components/scroll/useScrollStore';

export default function ScrollProgress() {
  const progress = useScrollStore((s) => s.progress);
  return (
    <div className="fixed left-0 top-0 z-40 h-[2px] w-full bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-gold-600 via-gold to-gold-400"
        style={{ width: `${Math.round(progress * 100)}%` }}
      />
    </div>
  );
}
