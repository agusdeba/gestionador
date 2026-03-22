"use client";

import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ProveedorRow } from "@/modules/proveedores/queries";

import { EstadoToggle } from "./estado-toggle";
import { ProveedorRowActions } from "./proveedor-row-actions";

const moneda = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

function formatContacto(p: {
  contacto_telefono: string | null;
  email: string | null;
}) {
  if (p.contacto_telefono?.trim()) return p.contacto_telefono.trim();
  if (p.email?.trim()) return p.email.trim();
  return "—";
}

type ProveedoresTablaProps = {
  proveedores: ProveedorRow[];
};

export function ProveedoresTabla({ proveedores }: ProveedoresTablaProps) {
  const [query, setQuery] = useState("");

  const filtrados = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return proveedores;
    return proveedores.filter((p) => p.nombre.toLowerCase().includes(q));
  }, [proveedores, query]);

  return (
    <div className="space-y-4">
      <Input
        type="search"
        placeholder="Buscar por nombre…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="max-w-sm"
        aria-label="Buscar proveedores por nombre"
      />
      <div className="rounded-xl border border-border bg-card shadow-sm ring-1 ring-foreground/5">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead>Contacto</TableHead>
              <TableHead>Días de visita</TableHead>
              <TableHead className="text-right">Saldo deudor</TableHead>
              <TableHead className="text-right">Estado</TableHead>
              <TableHead className="w-[52px] text-right">
                <span className="sr-only">Acciones</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtrados.map((p) => (
              <TableRow key={p.id}>
                <TableCell className="font-medium">{p.nombre}</TableCell>
                <TableCell className="text-muted-foreground">
                  {formatContacto(p)}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {p.dias_visita?.trim() ? p.dias_visita : "—"}
                </TableCell>
                <TableCell className="text-right">
                  {p.saldo_deudor === 0 ? (
                    <span className="text-sm font-medium text-emerald-600 dark:text-emerald-500">
                      Al día
                    </span>
                  ) : (
                    <span className="tabular-nums">
                      {moneda.format(p.saldo_deudor)}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <EstadoToggle id={p.id} activo={p.activo} />
                </TableCell>
                <TableCell className="text-right">
                  <ProveedorRowActions proveedor={p} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
