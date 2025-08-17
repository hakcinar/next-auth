import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl


  if (pathname.startsWith("/login") || pathname.startsWith("/public")) {
    return NextResponse.next()
  }

  if (!token) {
    const loginUrl = new URL("/api/auth/signin", req.url)
    loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }


  if (pathname.startsWith("/admin") && !(token.roles as string[])?.includes("Admin")) {
    return NextResponse.redirect(new URL("/403", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/admin/:path*",
  ],
}

