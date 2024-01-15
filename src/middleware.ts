import { getToken } from 'next-auth/jwt';
import { NextResponse, NextRequest } from 'next/server';

export const config = {
  matcher: [
    '/',
    '/checkout/:path*',
    '/search',
    '/add-car',
    '/profile/:path*',
    '/auth/:path*',
  ],
};

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const token = await getToken({
    req: request,
  });

  if (!token) {
    if (url.pathname.includes('/auth')) {
      return NextResponse.next();
    }
    if (url.pathname !== '/') {
      url.pathname = '/api/auth/signin';
      return NextResponse.redirect(url);
    }
    url.pathname = '/how-it-works';
    return NextResponse.redirect(url);
  } else {
    if (url.pathname.includes('/auth')) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }
}
