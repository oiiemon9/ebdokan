import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import { ROUTE_PERMISSIONS } from './app/lib/permissions';

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const pathname = req.nextUrl.pathname;

  const authPages = ['/login', '/register'];

  // Login user auth page এ যাবে না
  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // Guest user auth page এ যেতে পারবে
  if (authPages.includes(pathname)) {
    return NextResponse.next();
  }

  // বাকি matcher routes protected
  if (!token) {
    const loginUrl = new URL('/login', req.url);

    loginUrl.searchParams.set('callbackUrl', pathname);

    return NextResponse.redirect(loginUrl);
  }

  for (const route in ROUTE_PERMISSIONS) {
    if (pathname.startsWith(route)) {
      const allowedRoles = ROUTE_PERMISSIONS[route];

      if (!allowedRoles.includes(token.role)) {
        return NextResponse.redirect(new URL('/', req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/checkout/:path*',
    '/my-cart/:path*',
    '/login',
    '/register',
  ],
};
