import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import AppConfig from './models/AppConfig';

export async function middleware(request: NextRequest) {
  if (!request.cookies.get('vtcm_session'))
    return NextResponse.redirect(new URL('/login', request.url));

  let url = AppConfig.server_url + 'api/webapp/check';

  const authResponse = await fetch(url, { headers: new Headers({ 'Authorization': 'Bearer ' + atob(request.cookies.get('vtcm_session')), 'Accept': 'application/json' }) });

  if (!authResponse.ok) return NextResponse.redirect(new URL('/login', request.url));

  const authResult = await authResponse.json();

  if (!authResult["id"]) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/company/:path*', '/job/:path*', '/companies', '/dashboard', '/logbook', '/logout'],
}