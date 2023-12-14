import { NextRequest } from "next/server"
import { sealData } from "iron-session"
import { generate } from "random-words"

import { env } from "@/lib/env.mjs"
import { hmac } from "@/lib/hash"
import { sendEmail } from "@/lib/send-email"

const checkAuth = (email: string) => email.includes("@")

export async function POST(request: NextRequest) {
  const { email } = (await request.json()) as { email: string }

  const isAuthorized = checkAuth(email)
  if (!isAuthorized) {
    return Response.json(
      { success: false, error: "Invalid email" },
      { status: 401 }
    )
  }

  const seal = await sealData(
    { email },
    {
      password: env.AUTH_SECRET,
      ttl: 60 * 15, // 15 minutes
    }
  )

  const seed = await hmac(seal, env.AUTH_SECRET)
  const token = generate({
    maxLength: 5,
    exactly: 3,
    join: "-",
    seed,
  })

  const url = `${request.nextUrl.origin}/verify?token=${token}`
  const response = await sendEmail({
    url,
    email,
    server: env.EMAIL_SERVER,
    from: env.EMAIL_FROM,
  })

  if (response.success) {
    return Response.json({ success: true, seal })
  } else {
    return Response.json({ error: response.error }, { status: 500 })
  }
}
