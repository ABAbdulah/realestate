import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { posts } from '@/lib/config';

export default function Blog() {
  return (
    <section id="blog" className="relative z-10 bg-ink-900">
      <div className="mx-auto max-w-7xl px-6 py-28">
        <Reveal className="flex items-end justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold-400">Insights</p>
            <h2 className="mt-3 text-4xl font-extrabold tracking-tightest text-sand md:text-5xl">From the deal desk</h2>
          </div>
          <Link href="/blog" className="hidden items-center gap-1 text-sm text-muted transition-colors hover:text-gold-400 md:flex">
            All articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {posts.slice(0, 3).map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.08}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-sand/10 bg-ink/60 p-6 transition-colors hover:border-gold/40"
              >
                <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-ink-800 via-ink to-ink-900" />
                <span className="mt-6 font-mono text-[10px] uppercase tracking-widest text-gold-400">{post.tag}</span>
                <h3 className="mt-2 text-xl font-bold leading-snug text-sand transition-colors group-hover:text-gold-400">
                  {post.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                <span className="mt-auto pt-6 text-sm text-muted">{post.date} · {post.read} read</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
