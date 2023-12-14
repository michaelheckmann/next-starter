import { getSession } from "@/middleware"

import { siteConfig } from "@/config/site"
import { MainNav } from "@/components/header/main-nav"

import { Account } from "./account"

export async function SiteHeader() {
  const session = await getSession()
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex items-center justify-between h-16 space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <Account email={session.email} />
      </div>
    </header>
  )
}
