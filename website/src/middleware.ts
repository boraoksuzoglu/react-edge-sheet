import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') ?? '';

  // Markdown content negotiation: redirect to /llms.txt for homepage markdown requests
  if (request.nextUrl.pathname === '/' && accept.includes('text/markdown')) {
    const url = request.nextUrl.clone();
    url.pathname = '/llms-full.txt';
    const response = NextResponse.rewrite(url);
    response.headers.set('Content-Type', 'text/markdown; charset=utf-8');
    response.headers.set('Vary', 'Accept');
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
