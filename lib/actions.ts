"use server"

import { cookies, headers } from "next/headers"
import { redirect } from "next/navigation"
import { getSession } from "@/middleware"

import { env } from "./env.mjs"

export const fetchData = async (url: string, options: RequestInit) => {
  const host = headers().get("host")
  const protocol = process?.env.NODE_ENV === "development" ? "http" : "https"
  return await fetch(`${protocol}://${host}${url}`, options)
}

export const logout = async () => {
  const session = await getSession()
  session.destroy()
  redirect("/login")
}

type LoginResponse =
  | {
      success: true
      seal: string
    }
  | {
      success: false
      error: string
    }

export const login = async (formData: FormData) => {
  const email = formData.get("email")
  const res = await fetchData("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  })
  const data = (await res.json()) as LoginResponse

  if (data.success) {
    cookies().set("next-starter-seal", data.seal, {
      httpOnly: true,
      secure: env.NODE_ENV !== "development",
      sameSite: "strict",
    })
    redirect("/verify")
  } else {
    console.log("error logging in", data.error)
  }
}

type VerifyResponse =
  | {
      success: true
      email: string
    }
  | {
      success: false
      error: string
    }

export const verify = async (formData: FormData) => {
  const token = formData.get("token")
  const seal = cookies().get("next-starter-seal")

  const res = await fetchData("/api/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token, seal: seal?.value }),
  })
  const data = (await res.json()) as VerifyResponse

  if (data.success) {
    const session = await getSession()
    session.email = data.email
    session.isLoggedIn = true
    await session.save()
    redirect("/")
  } else {
    console.log("error verifying token", data.error)
  }
}
