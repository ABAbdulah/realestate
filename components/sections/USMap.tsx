'use client';

import { useState } from 'react';
import Reveal from '@/components/ui/Reveal';
import { marketStates } from '@/lib/config';

// Tile-grid cartogram of the U.S. (each state placed at an approximate row/col).
// Production: swap for a true geographic SVG via react-simple-maps + us-atlas topojson.
type Cell = { code: string; name: string; row: number; col: number };

const GRID: Cell[] = [
  { code: 'AK', name: 'Alaska', row: 0, col: 0 }, { code: 'ME', name: 'Maine', row: 0, col: 10 },
  { code: 'VT', name: 'Vermont', row: 1, col: 9 }, { code: 'NH', name: 'New Hampshire', row: 1, col: 10 },
  { code: 'WA', name: 'Washington', row: 2, col: 0 }, { code: 'ID', name: 'Idaho', row: 2, col: 1 }, { code: 'MT', name: 'Montana', row: 2, col: 2 }, { code: 'ND', name: 'North Dakota', row: 2, col: 3 }, { code: 'MN', name: 'Minnesota', row: 2, col: 4 }, { code: 'WI', name: 'Wisconsin', row: 2, col: 5 }, { code: 'MI', name: 'Michigan', row: 2, col: 7 }, { code: 'NY', name: 'New York', row: 2, col: 9 }, { code: 'MA', name: 'Massachusetts', row: 2, col: 10 },
  { code: 'OR', name: 'Oregon', row: 3, col: 0 }, { code: 'NV', name: 'Nevada', row: 3, col: 1 }, { code: 'WY', name: 'Wyoming', row: 3, col: 2 }, { code: 'SD', name: 'South Dakota', row: 3, col: 3 }, { code: 'IA', name: 'Iowa', row: 3, col: 4 }, { code: 'IL', name: 'Illinois', row: 3, col: 5 }, { code: 'IN', name: 'Indiana', row: 3, col: 6 }, { code: 'OH', name: 'Ohio', row: 3, col: 7 }, { code: 'PA', name: 'Pennsylvania', row: 3, col: 8 }, { code: 'NJ', name: 'New Jersey', row: 3, col: 9 }, { code: 'CT', name: 'Connecticut', row: 3, col: 10 },
  { code: 'CA', name: 'California', row: 4, col: 0 }, { code: 'UT', name: 'Utah', row: 4, col: 1 }, { code: 'CO', name: 'Colorado', row: 4, col: 2 }, { code: 'NE', name: 'Nebraska', row: 4, col: 3 }, { code: 'MO', name: 'Missouri', row: 4, col: 4 }, { code: 'KY', name: 'Kentucky', row: 4, col: 5 }, { code: 'WV', name: 'West Virginia', row: 4, col: 6 }, { code: 'VA', name: 'Virginia', row: 4, col: 7 }, { code: 'MD', name: 'Maryland', row: 4, col: 8 }, { code: 'DE', name: 'Delaware', row: 4, col: 9 }, { code: 'RI', name: 'Rhode Island', row: 4, col: 10 },
  { code: 'AZ', name: 'Arizona', row: 5, col: 1 }, { code: 'NM', name: 'New Mexico', row: 5, col: 2 }, { code: 'KS', name: 'Kansas', row: 5, col: 3 }, { code: 'AR', name: 'Arkansas', row: 5, col: 4 }, { code: 'TN', name: 'Tennessee', row: 5, col: 5 }, { code: 'NC', name: 'North Carolina', row: 5, col: 6 }, { code: 'SC', name: 'South Carolina', row: 5, col: 7 }, { code: 'DC', name: 'Washington D.C.', row: 5, col: 8 },
  { code: 'HI', name: 'Hawaii', row: 6, col: 0 }, { code: 'OK', name: 'Oklahoma', row: 6, col: 3 }, { code: 'LA', name: 'Louisiana', row: 6, col: 4 }, { code: 'MS', name: 'Mississippi', row: 6, col: 5 }, { code: 'AL', name: 'Alabama', row: 6, col: 6 }, { code: 'GA', name: 'Georgia', row: 6, col: 7 },
  { code: 'TX', name: 'Texas', row: 7, col: 3 }, { code: 'FL', name: 'Florida', row: 7, col: 8 },
];

function statusOf(code: string): 'completed' | 'active' | 'none' {
  if (marketStates.completed.includes(code)) return 'completed';
  if (marketStates.active.includes(code)) return 'active';
  return 'none';
}

const CHIP: Record<string, string> = {
  completed: 'bg-gold text-ink border-gold shadow-[0_0_18px_-4px_rgba(201,154,59,0.8)]',
  active: 'bg-gold/10 text-gold-400 border-gold/70 animate-pulse-glow',
  none: 'bg-ink-800 text-muted/40 border-white/5 hover:border-white/20',
};

export default function USMap() {
  const [hover, setHover] = useState<Cell | null>(null);
  const hoverStatus = hover ? statusOf(hover.code) : null;

  return (
    <section id="coverage" className="relative z-10 bg-gradient-to-b from-ink to-ink-900">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">Nationwide reach</p>
          <h2 className="mt-3 text-4xl font-extrabold tracking-tightest text-sand md:text-5xl">
            Where we source &amp; operate
          </h2>
          <p className="mt-4 text-lg text-muted">
            {marketStates.completed.length} markets with closed deals, {marketStates.active.length} more
            in active acquisition. Hover a state for status.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-col gap-8 lg:flex-row lg:items-start">
          {/* Map grid */}
          <div
            className="grid w-full max-w-3xl gap-1.5"
            style={{ gridTemplateColumns: 'repeat(11, minmax(0, 1fr))' }}
            onMouseLeave={() => setHover(null)}
          >
            {GRID.map((c) => (
              <button
                key={c.code}
                type="button"
                title={`${c.name} — ${statusOf(c.code)}`}
                aria-label={`${c.name}, ${statusOf(c.code)}`}
                onMouseEnter={() => setHover(c)}
                onFocus={() => setHover(c)}
                style={{ gridColumnStart: c.col + 1, gridRowStart: c.row + 1 }}
                className={`aspect-square rounded-md border text-[10px] font-semibold transition-transform duration-150 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold ${CHIP[statusOf(c.code)]}`}
              >
                {c.code}
              </button>
            ))}
          </div>

          {/* Legend + readout */}
          <div className="lg:w-64 lg:shrink-0">
            <div className="rounded-2xl border border-white/10 bg-ink-900/70 p-6">
              <div className="min-h-[3rem]">
                {hover ? (
                  <>
                    <div className="text-lg font-bold text-sand">{hover.name}</div>
                    <div
                      className={`mt-1 text-sm capitalize ${
                        hoverStatus === 'completed'
                          ? 'text-gold-400'
                          : hoverStatus === 'active'
                            ? 'text-gold'
                            : 'text-muted'
                      }`}
                    >
                      {hoverStatus === 'none' ? 'Not yet active' : `${hoverStatus} market`}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted">Hover a state to see its status.</div>
                )}
              </div>
              <div className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded bg-gold" />
                  <span className="text-muted">Closed deals</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded border border-gold/70 bg-gold/10" />
                  <span className="text-muted">Active acquisition</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded bg-ink-800" />
                  <span className="text-muted">Expanding soon</span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
