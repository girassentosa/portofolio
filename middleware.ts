import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get('admin_session');

  // CLEAR SESSION: Jika user akses halaman NON-admin tapi punya admin session
  // Ini auto-logout ketika keluar dari area admin
  if (!pathname.startsWith('/admin') && session) {
    const response = NextResponse.next();
    // Hapus admin session cookie
    response.cookies.delete('admin_session');
    return response;
  }

  // Protect semua route /admin/dashboard/*
  if (pathname.startsWith('/admin/dashboard')) {
    // Kalau tidak ada session, redirect ke login
    if (!session) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }

    // Validasi session cookie
    try {
      JSON.parse(session.value);
      // Session valid, lanjutkan
      return NextResponse.next();
    } catch {
      // Session invalid, redirect ke login
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Route /admin/ redirect ke /admin/login
  if (pathname === '/admin' || pathname === '/admin/') {
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Tentukan route mana yang di-protect
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};

