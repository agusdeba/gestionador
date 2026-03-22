"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { ProveedorRow } from "@/modules/proveedores/queries";

import { EditarProveedorDialog } from "./editar-proveedor-dialog";

type ProveedorRowActionsProps = {
  proveedor: ProveedorRow;
};

export function ProveedorRowActions({ proveedor }: ProveedorRowActionsProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="rounded-[min(var(--radius-md),12px)]"
            aria-label={`Acciones para ${proveedor.nombre}`}
          >
            <MoreHorizontal className="size-4" aria-hidden />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/panel/proveedores/${proveedor.id}`}>
              Ver Cuenta Corriente
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault();
              setEditOpen(true);
            }}
          >
            Editar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <EditarProveedorDialog
        proveedor={proveedor}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </>
  );
}
