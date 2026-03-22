import Link from "next/link";
import { ArrowRight, BarChart3, Shield, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";

export default async function LandingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const hasSession = Boolean(user);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border/60 bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
          <span className="text-sm font-semibold tracking-tight">Gestionador</span>
          <Button
            asChild
            size="sm"
            variant="outline"
            className="rounded-[min(var(--radius-md),12px)]"
          >
            <Link href={hasSession ? "/panel" : "/login"}>
              {hasSession ? "Ir al Panel" : "Iniciar Sesión"}
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="relative overflow-hidden border-b border-border/40 bg-gradient-to-b from-muted/50 via-background to-background px-6">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.92_0_0_/_0.45),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.35_0_0_/_0.45),transparent)]" />
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 py-20 text-center">
            <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
              Control financiero para PyMEs
            </p>
            <h1 className="font-heading text-balance text-4xl font-semibold text-foreground tracking-tight sm:text-5xl">
              Gestionador: el pulso de tu negocio en un solo lugar
            </h1>
            <p className="text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Ingresos, egresos, cuentas corrientes de proveedores y automatización
              de recibos — pensado para paradores y comercios gastronómicos que
              necesitan claridad sin complicarse.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild size="lg" className="gap-2 rounded-lg px-6">
                <Link href={hasSession ? "/panel" : "/login"}>
                  {hasSession ? "Ir al Panel" : "Iniciar Sesión"}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-8 px-6 py-16 md:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm ring-1 ring-foreground/5">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Wallet className="size-5" aria-hidden />
            </div>
            <h2 className="font-heading text-base font-semibold">
              Visión macro
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Entiende de un vistazo cómo fluye el dinero en tu operación y
              anticipa decisiones.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm ring-1 ring-foreground/5">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="size-5" aria-hidden />
            </div>
            <h2 className="font-heading text-base font-semibold">
              Hecho para PyMEs
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Sin ruido: herramientas que encajan en equipos pequeños y
              procesos reales de compra y cobro.
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-card p-6 shadow-sm ring-1 ring-foreground/5">
            <div className="mb-3 flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Shield className="size-5" aria-hidden />
            </div>
            <h2 className="font-heading text-base font-semibold">
              Datos bajo control
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              Multi-tenant con aislamiento por empresa: cada cliente ve solo lo
              suyo, con seguridad en capas.
            </p>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/60 py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Gestionador
      </footer>
    </div>
  );
}
