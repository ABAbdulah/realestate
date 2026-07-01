import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Nav from '@/components/sections/Nav';
import Footer from '@/components/sections/Footer';
import { posts, brand } from '@/lib/config';

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) return { title: `Article — ${brand.name}` };
  return { title: `${post.title} — ${brand.name}`, description: post.excerpt };
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const post = posts.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[(idx + 1) % posts.length];

  return (
    <>
      <Nav />
      <main className="relative z-10 min-h-screen bg-ink pt-32">
        <article className="mx-auto max-w-4xl px-6 pb-28">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold-400">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>

          <span className="mt-8 block font-mono text-[10px] uppercase tracking-widest text-gold-400">{post.tag}</span>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.05] tracking-tightest text-sand md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-4 text-sm text-muted">{post.date} · {post.read} read</div>

          <div className="mt-8 h-56 rounded-2xl bg-gradient-to-br from-ink-800 via-ink to-ink-900" />

          <div className="mt-10 space-y-6 text-lg leading-relaxed text-muted">
            {post.body.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>

          {next.slug !== post.slug && (
            <div className="mt-16 rounded-2xl border border-gold/20 bg-ink-900/60 p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-gold-400">Keep reading</p>
              <Link href={`/blog/${next.slug}`} className="mt-2 block text-2xl font-bold text-sand transition-colors hover:text-gold-400">
                {next.title}
              </Link>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
