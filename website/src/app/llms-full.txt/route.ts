import { NextResponse } from 'next/server';
import { buildLlmsFullContent } from '@/lib/llms';

export const dynamic = 'force-static'; // pre-rendered at build time

export function GET() {
  const content = buildLlmsFullContent();
  return new NextResponse(content, {
    status: 200,
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
