import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/landing/Hero';
import { Features } from '@/components/landing/Features';
import { Stats } from '@/components/landing/Stats';
import { CodeShowcaseServer } from '@/components/landing/CodeShowcaseServer';
import { CTA } from '@/components/landing/CTA';
import { LiveDemoLoader } from '@/components/landing/LiveDemoLoader';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Stats />
        <CodeShowcaseServer />
        <LiveDemoLoader />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
