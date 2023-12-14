import Balancer from "react-wrap-balancer"

import { verify } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

type Params = {
  searchParams: {
    token?: string
  }
}

export default function VerifyPage({ searchParams }: Params) {
  return (
    <main className="container min-h-[calc(100vh-4rem-1px)] flex flex-col items-center justify-center flex-1 gap-8 pb-16">
      <div className="flex flex-col items-center justify-center gap-3">
        <Icons.logo className="w-10" />
        <h1 className="flex flex-col items-center text-2xl font-medium text-center text-primary w-80">
          <Balancer>Check your email</Balancer>
        </h1>
      </div>
      <h2 className="flex flex-col items-center max-w-md text-center text-muted-foreground">
        <Balancer>
          A sign in link has been sent to your email address. Click the link in
          the email or enter the token below.
        </Balancer>
      </h2>
      <form
        action={verify}
        className="flex flex-col items-stretch w-full max-w-sm gap-4 mb-8 sm:flex-row"
      >
        <Input
          type="text"
          id="token"
          name="token"
          placeholder="Enter the token ..."
          required
          defaultValue={searchParams.token}
          autoFocus
          autoComplete="one-time-code"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          data-1p-ignore
        />
        <Button type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.75}
            stroke="currentColor"
            className="hidden w-6 h-6 sm:block"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
          <span className="block sm:hidden">Sign In</span>
        </Button>
      </form>
    </main>
  )
}
