import type { Metadata } from 'next';
import { Header } from '@/components/layout/Header';
import { PlaygroundLoader } from '@/components/playground/PlaygroundLoader';

export const metadata: Metadata = {
  title: 'Playground — react-edge-sheet',
  description:
    'Interactive studio to configure react-edge-sheet props in real-time. Tweak edge, animation, size, gestures, and more — then copy the generated code.',
};

export default function PlaygroundPage() {
  return (
    <>
      <Header />
      <main>
        <PlaygroundLoader />
      </main>
    </>
  );
}
