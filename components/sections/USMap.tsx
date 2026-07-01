'use client';

import { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import Reveal from '@/components/ui/Reveal';
import { marketStates } from '@/lib/config';

const GEO_URL = '/states-10m.json';

// USPS code -> full name (matches us-atlas geography properties.name)
const NAME: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas', CA: 'California', CO: 'Colorado',
  CT: 'Connecticut', DE: 'Delaware', DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia',
  HI: 'Hawaii', ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa', KS: 'Kansas', KY: 'Kentucky',
  LA: 'Louisiana', ME: 'Maine', MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska', NV: 'Nevada', NH: 'New Hampshire',
  NJ: 'New Jersey', NM: 'New Mexico', NY: 'New York', NC: 'North Carolina', ND: 'North Dakota',
  OH: 'Ohio', OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island', SC: 'South Carolina',
  SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas', UT: 'Utah', VT: 'Vermont', VA: 'Virginia',
  WA: 'Washington', WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

const completed = new Set(marketStates.completed.map((c) => NAME[c]));
const active = new Set(marketStates.active.map((c) => NAME[c]));

type Status = 'completed' | 'active' | 'none';
function statusByName(name: string): Status {
  if (completed.has(name)) return 'completed';
  if (active.has(name)) return 'active';
  return 'none';
}

const FILL: Record<Status, string> = {
  completed: 'rgb(var(--c-accent))',
  active: 'rgb(var(--c-accent-400) / 0.30)',
  none: 'rgb(var(--c-surface-2))',
};

export default function USMap() {
  const [hover, setHover] = useState<{ name: string; status: Status } | null>(null);

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
          {/* Geographic map, framed */}
          <div className="relative w-full overflow-hidden rounded-3xl border border-sand/10 bg-ink-900/40 p-2 sm:p-5">
            <ComposableMap
              projection="geoAlbersUsa"
              width={960}
              height={500}
              projectionConfig={{ scale: 1070 }}
              style={{ width: '100%', height: 'auto' }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }: { geographies: Array<{ rsmKey: string; properties: { name: string } }> }) =>
                  geographies.map((geo) => {
                    const name = geo.properties.name;
                    const status = statusByName(name);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onMouseEnter={() => setHover({ name, status })}
                        onMouseLeave={() => setHover(null)}
                        style={{
                          default: {
                            fill: FILL[status],
                            stroke: 'rgb(var(--c-bg))',
                            strokeWidth: 0.75,
                            outline: 'none',
                            transition: 'fill 0.2s ease',
                          },
                          hover: {
                            fill: status === 'none' ? 'rgb(var(--c-surface-3))' : 'rgb(var(--c-accent-400))',
                            stroke: 'rgb(var(--c-bg))',
                            strokeWidth: 0.75,
                            outline: 'none',
                            cursor: 'pointer',
                          },
                          pressed: { fill: 'rgb(var(--c-accent))', outline: 'none' },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          {/* Legend + readout */}
          <div className="lg:w-64 lg:shrink-0">
            <div className="rounded-2xl border border-sand/10 bg-ink-900/70 p-6">
              <div className="min-h-[3rem]">
                {hover ? (
                  <>
                    <div className="text-lg font-bold text-sand">{hover.name}</div>
                    <div
                      className={`mt-1 text-sm capitalize ${
                        hover.status === 'completed'
                          ? 'text-gold-400'
                          : hover.status === 'active'
                            ? 'text-gold'
                            : 'text-muted'
                      }`}
                    >
                      {hover.status === 'none' ? 'Not yet active' : `${hover.status} market`}
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-muted">Hover a state to see its status.</div>
                )}
              </div>
              <div className="mt-6 space-y-3 border-t border-sand/10 pt-6 text-sm">
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-sm bg-gold" />
                  <span className="text-muted">Closed deals</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-sm border border-gold/60 bg-gold/25" />
                  <span className="text-muted">Active acquisition</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="h-4 w-4 rounded-sm bg-ink-800" />
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
