'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const Scene = dynamic(() => import('./Scene'), { ssr: false });

export default function ClientScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Fallback backdrop until the canvas mounts (and for SSR).
  if (!mounted) {
    return (
      <div
        className="fixed inset-0 z-0 bg-gradient-to-b from-ink-900 via-ink to-ink-900"
        aria-hidden="true"
      />
    );
  }
  return <Scene />;
}
