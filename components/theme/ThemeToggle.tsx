'use client';

import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';
import { useThemeStore } from './useThemeStore';
import { THEMES, type ThemeName } from '@/lib/themes';

export default function ThemeToggle() {
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const toggle = useThemeStore((s) => s.toggle);
  const [mounted, setMounted] = useState(false);

  // Sync the store with whatever the no-flash head script already applied.
  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as ThemeName) || 'gold';
    setTheme(current);
    setMounted(true);
  }, [setTheme]);

  const current = THEMES.find((t) => t.name === theme) ?? THEMES[0];
  const other = THEMES.find((t) => t.name !== theme) ?? THEMES[1];

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${other.label} theme`}
      title={mounted ? `Switch to ${other.label}` : 'Switch theme'}
      className="flex items-center gap-2 rounded-full border border-gold/30 bg-ink-900/40 px-3 py-2 backdrop-blur-sm transition-colors hover:border-gold/60"
    >
      <Palette className="h-4 w-4 text-gold-400" />
      <span
        className="h-3 w-3 rounded-full ring-1 ring-sand/20"
        style={{ background: mounted ? current.swatch : THEMES[0].swatch }}
      />
      <span className="hidden text-xs font-medium text-sand sm:inline">
        {mounted ? current.label.split(' ')[1] : 'Theme'}
      </span>
    </button>
  );
}
