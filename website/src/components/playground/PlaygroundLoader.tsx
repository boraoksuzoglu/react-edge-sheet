'use client';

import dynamic from 'next/dynamic';

const Playground = dynamic(() => import('./Playground').then((m) => ({ default: m.Playground })), {
  ssr: false,
});

export function PlaygroundLoader() {
  return <Playground />;
}
