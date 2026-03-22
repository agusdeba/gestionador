import { Building2 } from "lucide-react";

import { CrearProveedorDialog } from "@/modules/proveedores/components/crear-proveedor-dialog";
import { ProveedoresTabla } from "@/modules/proveedores/components/proveedores-tabla";
import { getProveedores } from "@/modules/proveedores/queries";

export default async function ProveedoresPage() {
  const proveedores = await getProveedores();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Proveedores</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestiona tus proveedores y el seguimiento de visitas.
          </p>
        </div>
        <CrearProveedorDialog triggerClassName="w-full gap-2 sm:w-auto" />
      </div>

      {proveedores.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 px-6 py-16 text-center">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-muted">
            <Building2 className="size-6 text-muted-foreground" aria-hidden />
          </div>
          <h2 className="text-lg font-semibold tracking-tight">
            Aún no hay proveedores
          </h2>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Carga tu primer proveedor para empezar a registrar boletas, pagos y
            cuentas corrientes en un solo lugar.
          </p>
          <CrearProveedorDialog triggerClassName="mt-6 w-full gap-2 sm:max-w-xs" />
        </div>
      ) : (
        <ProveedoresTabla proveedores={proveedores} />
      )}
    </div>
  );
}
