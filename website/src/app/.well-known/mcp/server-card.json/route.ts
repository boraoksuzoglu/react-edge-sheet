import { NextResponse } from 'next/server';

const BASE_URL = 'https://react-sheet.borao.dev';

export const dynamic = 'force-static';

export function GET() {
  const serverCard = {
    schemaVersion: '1.0',
    serverInfo: {
      name: 'react-edge-sheet',
      version: '1.0.0',
      description:
        'Documentation and resources for react-edge-sheet — a lightweight React sliding panel component.',
    },
    capabilities: {
      tools: false,
      resources: true,
      prompts: false,
    },
    resources: [
      { name: 'llms.txt', url: `${BASE_URL}/llms.txt`, type: 'text/plain' },
      { name: 'llms-full.txt', url: `${BASE_URL}/llms-full.txt`, type: 'text/plain' },
      { name: 'docs', url: `${BASE_URL}/docs/getting-started`, type: 'text/html' },
    ],
  };

  return NextResponse.json(serverCard, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
