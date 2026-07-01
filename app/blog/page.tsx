import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import { posts, brand } from '@/lib/config';

export const metadata: Metadata = {
  title: `Insights — ${brand.name}`,
  description: 'Articles on wholesaling, flipping, and market strategy from the deal desk.',
};

export default function BlogIndex() {
  return (
    <>
      <Nav />
      <main className="relative z-10 min-h-screen bg-ink pt-32">
        <div className="mx-auto max-w-5xl px-6 pb-28">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold-400">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-gold-400">Insights</p>
          <h1 className="mt-3 text-5xl font-extrabold tracking-tightest text-sand">From the deal desk</h1>
          <p className="mt-4 max-w-xl text-lg text-muted">
            Field notes on sourcing, underwriting, and the markets we&apos;re active in.
          </p>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-2xl border border-sand/10 bg-ink-900/60 p-6 transition-colors hover:border-gold/40"
              >
                <div className="aspect-[16/9] rounded-xl bg-gradient-to-br from-ink-800 via-ink to-ink-900" />
                <span className="mt-6 font-mono text-[10px] uppercase tracking-widest text-gold-400">{post.tag}</span>
                <h2 className="mt-2 text-2xl font-bold leading-snug text-sand transition-colors group-hover:text-gold-400">
                  {post.title}
                </h2>
                <p className="mt-2 text-muted">{post.excerpt}</p>
                <span className="mt-4 text-sm text-muted">{post.date} · {post.read} read</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
