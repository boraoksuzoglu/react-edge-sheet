import { NextResponse } from 'next/server';
import { buildLlmsFullContent } from '@/lib/llms';

export const dynamic = 'force-dynamic';

export function GET() {
  const content = buildLlmsFullContent();
  const tokens = Math.ceil(content.length / 4); // rough token estimate

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'x-markdown-tokens': String(tokens),
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
