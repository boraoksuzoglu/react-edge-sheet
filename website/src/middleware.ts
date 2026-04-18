import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') ?? '';

  // Markdown content negotiation for homepage
  if (request.nextUrl.pathname === '/' && accept.includes('text/markdown')) {
    const url = request.nextUrl.clone();
    url.pathname = '/_markdown/home';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
