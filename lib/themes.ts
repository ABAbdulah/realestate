// Theme metadata + the hex colors used inside the Three.js scene.
// The DOM/Tailwind side is driven by CSS variables in app/globals.css;
// this file mirrors those choices for the 3D canvas (which can't read CSS vars).

export type ThemeName = 'gold' | 'teal';

export const THEMES: { name: ThemeName; label: string; swatch: string }[] = [
  { name: 'gold', label: 'Midnight Gold', swatch: '#C99A3B' },
  { name: 'teal', label: 'Coastal Teal', swatch: '#0F766E' },
];

export interface SceneColors {
  bg: string;
  fog: string;
  ambient: string;
  hemiSky: string;
  hemiGround: string;
  dir: string;
  point1: string;
  point2: string;
  accent: string;
  accentBright: string;
  featureEmissive: string;
  wallDistressed: string;
  wallReno: string;
  roof: string;
  furniture: string;
  floor: string;
  base: string;
  gearA: string;
  gearB: string;
  gearHub: string;
  sparkle: string;
}

export const THREE_COLORS: Record<ThemeName, SceneColors> = {
  // A — Dark cinematic + gold (night render)
  gold: {
    bg: '#0c0a09',
    fog: '#0c0a09',
    ambient: '#ffe9c7',
    hemiSky: '#ffe6bd',
    hemiGround: '#0a0807',
    dir: '#fff1d6',
    point1: '#e7b461',
    point2: '#d8b45a',
    accent: '#c99a3b',
    accentBright: '#d8b45a',
    featureEmissive: '#a16207',
    wallDistressed: '#37322e',
    wallReno: '#6b5f54',
    roof: '#1b1714',
    furniture: '#2b2622',
    floor: '#0a0908',
    base: '#211c18',
    gearA: '#a16207',
    gearB: '#d8b45a',
    gearHub: '#3a2a10',
    sparkle: '#d8b45a',
  },
  // B — Light architectural + teal (day render)
  teal: {
    bg: '#eef7f5',
    fog: '#e2eeeb',
    ambient: '#ffffff',
    hemiSky: '#eafaf7',
    hemiGround: '#b6cfca',
    dir: '#ffffff',
    point1: '#5fd0c4',
    point2: '#39bfb0',
    accent: '#0f766e',
    accentBright: '#14b8a6',
    featureEmissive: '#0369a1',
    wallDistressed: '#c6d4d1',
    wallReno: '#eef4f3',
    roof: '#0f766e',
    furniture: '#b7c8c4',
    floor: '#dcebe8',
    base: '#c9d8d5',
    gearA: '#0f766e',
    gearB: '#14b8a6',
    gearHub: '#0c4a6e',
    sparkle: '#0f766e',
  },
};
