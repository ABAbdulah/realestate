import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';

const posts = [
  { tag: 'Wholesaling', title: 'How to read a motivated-seller lead in 60 seconds', read: '5 min' },
  { tag: 'Flipping', title: 'The 70% rule is dead — here is what we use instead', read: '7 min' },
  { tag: 'Markets', title: '2026 outlook: the 8 states with the best flip spreads', read: '6 min' },
];

export default function Blog() {
  return (
    <section id="blog" className="relative z-10 bg-ink-900">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">Insights</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tightest text-sand md:text-5xl">From the deal desk</h2>
          </div>
          <a href="#" className="hidden items-center gap-1 text-sm text-muted transition-colors hover:text-gold-400 md:flex">
            All articles <ArrowUpRight className="h-4 w-4" />
          </a>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <Reveal key={post.title} delay={i * 0.08}>
              <a
                href="#"
                className="group flex h-full flex-col rounded-2xl border border-white/10 bg-ink/60 p-6 transition-colors hover:border-gold/40"
              >
                <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-ink-800 via-ink to-black" />
                <span className="mt-6 font-mono text-[10px] uppercase tracking-widest text-gold-400">{post.tag}</span>
                <h3 className="mt-2 text-xl font-bold leading-snug text-sand transition-colors group-hover:text-gold-400">
                  {post.title}
                </h3>
                <span className="mt-auto pt-6 text-sm text-muted">{post.read} read</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
