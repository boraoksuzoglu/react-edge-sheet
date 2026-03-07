'use client';

import dynamic from 'next/dynamic';

const LiveDemo = dynamic(() => import('./LiveDemo').then((m) => ({ default: m.LiveDemo })), {
  ssr: false,
});

export function LiveDemoLoader() {
  return <LiveDemo />;
}
