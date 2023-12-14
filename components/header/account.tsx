"use client"

import { logout } from "@/lib/actions"

import { Icons } from "../icons"
import { Button } from "../ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"

type Props = {
  email?: string
}

export function Account({ email }: Props) {
  if (!email) {
    return null
  }

  return (
    <Popover>
      <PopoverTrigger>
        <Icons.account className="stroke-muted-foreground" strokeWidth={1.5} />
      </PopoverTrigger>
      <PopoverContent align="end">
        <div className="grid gap-4">
          <p className="text-sm text-center text-muted-foreground">
            Logged in as {email}
          </p>
          <form action={logout} className="w-full">
            <Button
              size="sm"
              variant="outline"
              type="submit"
              className="w-full"
            >
              Logout
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  )
}
