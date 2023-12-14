import { NextRequest } from "next/server"
import { unsealData } from "iron-session"
import { generate } from "random-words"

import { env } from "@/lib/env.mjs"
import { hmac } from "@/lib/hash"

export async function POST(request: NextRequest) {
  const { seal, token } = (await request.json()) as {
    seal: string
    token: string
  }

  const seed = await hmac(seal, env.AUTH_SECRET)
  const ref = generate({
    maxLength: 5,
    exactly: 3,
    join: "-",
    seed,
  })

  if (ref !== token) {
    return Response.json(
      { success: false, error: "Invalid token" },
      { status: 401 }
    )
  }

  try {
    const { email } = await unsealData<{ email: string }>(seal, {
      password: env.AUTH_SECRET,
      ttl: 60 * 15, // 15 minutes
    })
    return Response.json({ success: true, email })
  } catch (error: any) {
    return Response.json({ success: false, error }, { status: 401 })
  }
}
