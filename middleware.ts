import { cookies } from "next/headers"
import type { NextRequest } from "next/server"
import { SessionOptions, getIronSession } from "iron-session"

import { env } from "./lib/env.mjs"

export interface SessionData {
  email: string
  isLoggedIn: boolean
}

export const sessionOptions: SessionOptions = {
  cookieName: "next-starter-auth",
  password: env.AUTH_SECRET,
  cookieOptions: {
    // secure only works in `https` environments
    // if your localhost is not on `https`, then use: `secure: process.env.NODE_ENV === "production"`
    secure: env.NODE_ENV === "production",
  },
}

export const getSession = () =>
  getIronSession<SessionData>(cookies(), sessionOptions)

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions)
  if (!session.isLoggedIn) {
    return Response.redirect(`${request.nextUrl.origin}/login`, 302)
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico|login|verify).*)",
}
