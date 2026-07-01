import { create } from 'zustand';
import type { ThemeName } from '@/lib/themes';

function apply(name: ThemeName) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', name);
  }
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('theme', name);
    } catch {
      /* ignore private-mode storage errors */
    }
  }
}

interface ThemeState {
  theme: ThemeName;
  setTheme: (name: ThemeName) => void;
  toggle: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: 'gold',
  setTheme: (name) => {
    apply(name);
    set({ theme: name });
  },
  toggle: () => {
    const next: ThemeName = get().theme === 'gold' ? 'teal' : 'gold';
    apply(next);
    set({ theme: next });
  },
}));
