"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { cerrarSesion } from "@/modules/auth/actions";
import { Button } from "@/components/ui/button";

const items = [
  { href: "/panel", label: "Dashboard", icon: LayoutDashboard },
  { href: "/panel/proveedores", label: "Proveedores", icon: Users },
  { href: "/panel/ingresos", label: "Ingresos", icon: TrendingUp },
  { href: "/panel/configuracion", label: "Configuración", icon: Settings },
] as const;

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-1 flex-col gap-1 px-3 py-4" aria-label="Principal">
      {items.map(({ href, label, icon: Icon }) => {
        const active =
          href === "/panel"
            ? pathname === "/panel"
            : pathname === href || pathname.startsWith(`${href}/`);

        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/80 hover:bg-sidebar-accent/80 hover:text-sidebar-accent-foreground"
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden />
            {label}
          </Link>
        );
      })}

      <div className="mt-auto pt-4 border-t border-border">
        <form action={cerrarSesion}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start text-sidebar-foreground/80 hover:text-red-600 hover:bg-red-100/50 dark:hover:bg-red-900/20 transition-colors"
          >
            <LogOut className="mr-2 h-4 w-4" aria-hidden />
            Cerrar Sesión
          </Button>
        </form>
      </div>
      
    </nav>
  );
}
