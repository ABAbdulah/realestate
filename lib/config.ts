// ──────────────────────────────────────────────────────────────
// Single source of truth for site copy / data.
// Swap these placeholders for the client's real content.
// (Production: most of this should come from a CMS like Sanity.)
// ──────────────────────────────────────────────────────────────

export const brand = {
  name: 'Abdul Moiz Awan',
  role: 'Off-Market Real Estate Deal Sourcing',
  tagline: 'Investor-ready deals. Delivered nationwide.',
  intro:
    "I source vetted, off-market real estate leads and hand them to investors, flippers, and wholesalers ready to close. No noise — just deals with margin.",
  email: 'deals@example.com',
};

export const stats = [
  { value: '1,200+', label: 'Deals sourced' },
  { value: '$180M+', label: 'Property volume' },
  { value: '38', label: 'States covered' },
  { value: '4.9/5', label: 'Buyer rating' },
];

// Value pillars — one per "room" of the scroll journey.
export const pillars = [
  {
    id: 'off-market',
    eyebrow: 'Room 01',
    title: 'Off-Market Deals',
    body: 'Properties you will not find on the MLS. Sourced directly from motivated sellers before anyone else sees them.',
  },
  {
    id: 'vetted',
    eyebrow: 'Room 02',
    title: 'Vetted, Motivated Leads',
    body: 'Every lead is qualified for motivation, equity, and timeline — so you spend time closing, not chasing.',
  },
  {
    id: 'nationwide',
    eyebrow: 'Room 03',
    title: 'Nationwide Coverage',
    body: 'Active acquisition in 38 states and growing. Tell us your buy-box; we cover the map.',
  },
  {
    id: 'roi',
    eyebrow: 'Room 04',
    title: 'Proven ROI',
    body: 'Deals underwritten with real numbers. Our buyers average strong spreads on flips and holds alike.',
  },
];

export const testimonials = [
  {
    name: 'Marcus T.',
    role: 'Fix & Flip Investor — TX',
    quote:
      'Closed three deals in my first 60 days. The leads are real, motivated, and priced to move.',
  },
  {
    name: 'Priya N.',
    role: 'Wholesaler — FL',
    quote:
      'Finally a source that does the qualifying for me. My assignment fees doubled this quarter.',
  },
  {
    name: 'David K.',
    role: 'Buy & Hold — OH',
    quote:
      'The nationwide coverage means I can scale into new markets without building a team in each one.',
  },
];

// US map — completed vs currently-active markets (USPS state codes).
export const marketStates = {
  completed: ['TX', 'FL', 'GA', 'NC', 'TN', 'OH', 'AZ', 'NV', 'SC', 'AL'],
  active: ['CA', 'CO', 'IL', 'PA', 'MI', 'IN', 'MO', 'VA'],
};

export const socials = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'TikTok', href: 'https://tiktok.com' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdul-moiz-awan-2969b1156' },
  { label: 'Facebook', href: 'https://facebook.com' },
];

export interface Post {
  slug: string;
  tag: string;
  title: string;
  date: string;
  read: string;
  excerpt: string;
  body: string[];
}

export const posts: Post[] = [
  {
    slug: 'reading-a-motivated-seller-lead',
    tag: 'Wholesaling',
    title: 'How to read a motivated-seller lead in 60 seconds',
    date: 'June 12, 2026',
    read: '5 min',
    excerpt:
      'The three signals that separate a deal with real margin from a tire-kicker — and how to spot them before you pick up the phone.',
    body: [
      'Most investors waste hours chasing leads that were never going to close. The fix is a fast, repeatable read on motivation before you invest any time.',
      'Signal one: timeline. A seller who needs to move in 30 days is priced differently than one "just seeing what it’s worth." Timeline is leverage.',
      'Signal two: equity. Without room between the payoff and the offer, there is no deal to assign. We pre-screen every lead for equity so you never underwrite a dead end.',
      'Signal three: condition. Distress in the property usually mirrors distress in the situation. Photos and a two-minute call tell you most of what you need.',
      'Put together, these three let you triage a fresh lead in about a minute — and spend your energy only on the ones worth closing.',
    ],
  },
  {
    slug: 'the-70-percent-rule-is-dead',
    tag: 'Flipping',
    title: 'The 70% rule is dead — here is what we use instead',
    date: 'May 28, 2026',
    read: '7 min',
    excerpt:
      'A blanket 70% of ARV leaves money on the table in soft markets and gets you outbid in hot ones. Underwrite the spread, not the rule of thumb.',
    body: [
      'The 70% rule was a useful shortcut in a stable market. In 2026’s patchwork of micro-markets, it is too blunt to trust.',
      'Instead we underwrite each deal from the exit backward: realistic ARV from true comps, honest rehab from a real scope, and holding costs for your actual timeline.',
      'What is left is the spread. If the spread clears your minimum after fees, it is a deal — whether that lands at 68% or 74% of ARV.',
      'This is why our leads come with comps and a rehab range attached. You underwrite the spread in minutes, not the guesswork.',
    ],
  },
  {
    slug: '2026-best-flip-spreads',
    tag: 'Markets',
    title: '2026 outlook: the 8 states with the best flip spreads',
    date: 'May 9, 2026',
    read: '6 min',
    excerpt:
      'Where renovation margins are widening this year — and the acquisition tactics that work in each.',
    body: [
      'Spreads are not evenly distributed. This year the widest, most repeatable flip margins are concentrated in a handful of states where inventory and buyer demand are both healthy.',
      'The pattern: secondary cities with population inflow, older housing stock, and contractor availability. That combination keeps rehab costs sane and resale strong.',
      'We are actively sourcing in these markets now. If your buy-box fits, the fastest path is to get on the buyer list and tell us your target spread.',
    ],
  },
];

export const chatbot = {
  greeting:
    "Hey 👋 I'm the deal desk assistant. Tell me your market and buy-box and I'll point you the right way.",
  systemPrompt: `You are the AI deal-desk assistant for ${brand.name}, who sources off-market real estate deals for investors, flippers, and wholesalers.
Goals, in order:
1. Be helpful and concise. Answer questions about markets, deal types, and how buyers receive deals.
2. Qualify the visitor: investor type (flipper / wholesaler / buy-and-hold), target markets/states, and budget or buy-box.
3. Capture contact info (name, email, phone) so the team can follow up. Ask for it naturally once there is interest.
Never invent specific property addresses, prices, or guarantees. If unsure, offer to connect them with the team.
Keep replies under 80 words.`,
};
