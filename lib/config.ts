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
