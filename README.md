# Real Estate Lead-Gen — Immersive Prototype

A premium, scroll-driven personal-brand site for a real estate **deal/lead seller** targeting investors, flippers, and wholesalers. Built as a clickable proof-of-concept for the full ~$10k build.

> Full scope, design rationale, and client questions live in [`../PROJECT_PLAN.md`](../PROJECT_PLAN.md).

## What's in here

- **Scroll-driven 3D experience** — as you scroll, the camera flies toward a house, **through the front door, and inside**, room by room. Gears turn and walls "renovate" (distressed → finished) reacting to scroll — the flip narrative.
- **Hero** with the founder's face as the brand (placeholder portrait — swap for real photo/video).
- **Value pillars** (the rooms) that slide in from alternating sides.
- **Social proof** — stats, testimonials, video-review placeholders.
- **Interactive U.S. coverage map** — tile-grid cartogram; hover a state for status (closed / active / expanding).
- **Blog** section, **all social links**, **lead-capture form**.
- **AI chatbot** — provider-swappable (free Gemini Flash for testing → GPT for production).

## Tech stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS · **react-three-fiber + drei + postprocessing** (3D) · smooth scroll via **Lenis** + a Zustand scroll store · Framer Motion · Lucide icons.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Chatbot setup (optional — works in demo mode without keys)

Copy `.env.example` to `.env.local` and set:

```bash
AI_PROVIDER=gemini          # "gemini" (free, testing) or "openai" (production)
GEMINI_API_KEY=...          # https://aistudio.google.com/apikey
# or
OPENAI_API_KEY=...          # https://platform.openai.com/api-keys
```

With no key set, the chat returns a built-in mock reply so the UI is fully demoable. The provider abstraction lives in [`app/api/chat/route.ts`](app/api/chat/route.ts).

## Art direction

Currently **Option A — Dark Cinematic + Gold** (authority/wealth). All colors and fonts are tokenized in [`tailwind.config.ts`](tailwind.config.ts) + [`app/layout.tsx`](app/layout.tsx), so switching to Option B (trust teal/blue) is a config change, not a rewrite.

## Prototype → production notes

These are intentionally stubbed for the demo and would be hardened in the full build:

- **House model** — currently procedural primitives. Production: a custom/stock GLTF (Draco-compressed) or a pre-rendered Blender fly-through for the heaviest scenes.
- **Mobile / reduced-motion** — Lenis + heavy 3D are disabled under `prefers-reduced-motion`; a true lightweight mobile fallback (image-sequence or static cinematic) is a production task.
- **U.S. map** — tile-grid stand-in; production swaps in a real geographic map (`react-simple-maps` + `us-atlas` topojson) driven by the same data in [`lib/config.ts`](lib/config.ts).
- **Lead form** — client-side success state only; production wires `/api/lead` → DB (Neon) + email (Resend) + CRM webhook (e.g. GoHighLevel).
- **Content** — copy/testimonials/posts are placeholders in `lib/config.ts`; production moves them to a CMS (Sanity).
