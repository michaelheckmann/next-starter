export default async function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pt-6 pb-8 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
          Welcome to the Next Starter
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          This is a starter template for Next.js projects. It includes a
          TypeScript setup, components from shadcn/ui, authentication with iron
          session and magic links and more.
        </p>
      </div>
    </section>
  )
}
