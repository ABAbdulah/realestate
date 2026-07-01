import { create } from 'zustand';

interface ScrollState {
  /** Global page scroll progress (0..1), driven by Lenis. */
  progress: number;
  /** Current scroll velocity, used to spin the gears. */
  velocity: number;
  /** Local progress through the "house journey" region (0..1). */
  journey: number;
  setScroll: (progress: number, velocity: number) => void;
  setJourney: (journey: number) => void;
}

export const useScrollStore = create<ScrollState>((set) => ({
  progress: 0,
  velocity: 0,
  journey: 0,
  setScroll: (progress, velocity) => set({ progress, velocity }),
  setJourney: (journey) => set({ journey }),
}));
