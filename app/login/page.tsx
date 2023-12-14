import Balancer from "react-wrap-balancer"

import { login } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Icons } from "@/components/icons"

export default function LogInPage() {
  return (
    <section className="container min-h-[calc(100vh-4rem-1px)] flex flex-col items-center justify-center flex-1 gap-8 pb-16">
      <div className="flex flex-col items-center justify-center gap-3">
        <Icons.logo className="w-10" />
        <h1 className="flex flex-col items-center text-2xl font-medium text-center text-primary w-80">
          <Balancer>Sign into the Next Starter</Balancer>
        </h1>
      </div>
      <form action={login} className="flex flex-col w-full max-w-xs gap-4">
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          autoComplete="email"
          autoCapitalize="off"
          autoCorrect="off"
          autoFocus
          spellCheck="false"
          data-1p-ignore
        />
        <Button type="submit">Sign In</Button>
      </form>
    </section>
  )
}
