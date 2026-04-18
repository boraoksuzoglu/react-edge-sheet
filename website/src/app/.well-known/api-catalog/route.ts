import { NextResponse } from 'next/server';

const BASE_URL = 'https://react-sheet.borao.dev';

export const dynamic = 'force-static';

export function GET() {
  const catalog = {
    linkset: [
      {
        anchor: BASE_URL,
        'service-doc': [{ href: `${BASE_URL}/docs/api`, type: 'text/html' }],
        describedby: [{ href: `${BASE_URL}/llms.txt`, type: 'text/plain' }],
      },
    ],
  };

  return NextResponse.json(catalog, {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
