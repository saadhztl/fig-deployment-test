// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;
const DEFAULT_LOCALE = 'en-us';
const SUPPORTED_LOCALES = ['en', 'es', 'fr', 'en-us'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore public files, API routes, or Next.js internals
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const segments = pathname.split('/');
  const firstSegment = segments[1];

  // If first segment is a supported locale, allow
  if (SUPPORTED_LOCALES.includes(firstSegment)) {
    return NextResponse.next();
  }

  // For paths without locale, internally rewrite to default locale
  // This keeps the URL clean while serving the default locale content
  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next/static|_next/image|favicon.ico).*)',
    // Optional: only run on root (/) URL
    // '/'
  ],
};
