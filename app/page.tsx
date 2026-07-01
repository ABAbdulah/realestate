import ScrollProvider from '@/components/scroll/ScrollProvider';
import ClientScene from '@/components/three/ClientScene';
import Nav from '@/components/sections/Nav';
import ScrollProgress from '@/components/sections/ScrollProgress';
import Hero from '@/components/sections/Hero';
import Journey from '@/components/sections/Journey';
import SocialProof from '@/components/sections/SocialProof';
import USMap from '@/components/sections/USMap';
import Blog from '@/components/sections/Blog';
import Footer from '@/components/sections/Footer';
import ChatWidget from '@/components/chatbot/ChatWidget';

export default function Home() {
  return (
    <ScrollProvider>
      {/* Fixed 3D backdrop */}
      <ClientScene />

      <ScrollProgress />
      <Nav />

      <main className="relative z-10">
        {/* The "house journey" — camera flies through this region */}
        <div id="journey-region">
          <Hero />
          <Journey />
        </div>

        <SocialProof />
        <USMap />
        <Blog />
        <Footer />
      </main>

      <ChatWidget />
    </ScrollProvider>
  );
}
