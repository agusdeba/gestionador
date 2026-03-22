"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Settings,
  TrendingUp,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";

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
    </nav>
  );
}
