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

  // if (request.nextUrl.pathname.startsWith('/dashboard')) {
  //   return NextResponse.rewrite(new URL('/dashboard/user', request.url))
  // }
  //
  // // Setting cookies on the response
  // const response = NextResponse.next()
  // response.cookies.set('vercel', 'fast')
  // response.cookies.set('vercel', 'fast', { path: '/test' })

  // // Getting cookies from the request
  // const cookie = request.cookies.get('vercel')
  // console.log(cookie) // => 'fast'
  // const allCookies = request.cookies.entries()
  // console.log(allCookies) // => [{ key: 'vercel', value: 'fast' }]
  // const { value, options } = response.cookies.getWithOptions('vercel')
  // console.log(value) // => 'fast'
  // console.log(options) // => { Path: '/test' }

  // // Deleting cookies
  // response.cookies.delete('vercel')
  // response.cookies.clear()
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/a/:path*', '/auth/:path*'],
}



