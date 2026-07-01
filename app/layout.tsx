import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { brand } from '@/lib/config';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic', 'normal'],
  weight: ['400', '500', '600'],
  variable: '--font-playfair',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.role}`,
  description: brand.intro,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-theme="gold"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${mono.variable}`}
    >
      <head>
        {/* Apply saved theme before paint to avoid a flash of the wrong colors. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='gold'&&t!=='teal')t='gold';document.documentElement.setAttribute('data-theme',t);}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-ink text-sand">{children}</body>
    </html>
  );
}
