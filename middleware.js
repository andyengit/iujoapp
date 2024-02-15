import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { verifyToken } from './utils/handleToken'

// This function can be marked `async` if using `await` inside
export async function middleware(NextRequest) {

  const token = NextRequest.cookies.get('sessionJWT')
  const verify = await verifyToken(token)

  if (NextRequest.nextUrl.pathname.startsWith('/auth/login')) {
    if (verify) return NextResponse.redirect(new URL('/a/dashboard', NextRequest.url))
    return NextResponse.next()
  }

  if (!verify){
    return NextResponse.redirect(new URL('/auth/login', NextRequest.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/a/:path*', '/auth/:path*'],
}



