import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accept = request.headers.get('accept') ?? '';

  if (accept.includes('text/markdown')) {
    const url = request.nextUrl.clone();
    url.pathname = '/api/markdown/home';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/'],
};
