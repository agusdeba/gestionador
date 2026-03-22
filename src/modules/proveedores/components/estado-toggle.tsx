"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toggleEstadoProveedor } from "@/modules/proveedores/actions";

type EstadoToggleProps = {
  id: string;
  activo: boolean;
};

export function EstadoToggle({ id, activo }: EstadoToggleProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    startTransition(async () => {
      const result = await toggleEstadoProveedor(id, activo);
      if (result.ok) {
        router.refresh();
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        badgeVariants({ variant: activo ? "secondary" : "outline" }),
        "inline-flex cursor-pointer items-center gap-1 disabled:pointer-events-none",
        isPending && "opacity-50"
      )}
    >
      {isPending ? (
        <Loader2 className="size-3 shrink-0 animate-spin" aria-hidden />
      ) : null}
      <span>{activo ? "Activo" : "Inactivo"}</span>
    </button>
  );
}
