import { createClient } from "@/lib/supabase/server";

export type ProveedorRow = {
  id: string;
  id_empresa: string;
  nombre: string;
  contacto_telefono: string | null;
  email: string | null;
  dias_visita: string | null;
  id_categoria_defecto: string | null;
  activo: boolean;
  fecha_creacion?: string | null;
  saldo_deudor: number;
};

type BoletaNested = { monto_total: number | string | null; estado: string | null };

type ProveedorRaw = Omit<ProveedorRow, "saldo_deudor"> & {
  boletas?: BoletaNested[] | null;
};

function calcularSaldoDeudor(boletas: BoletaNested[] | null | undefined): number {
  if (!boletas?.length) return 0;
  return boletas.reduce((sum, b) => {
    const estado = b.estado;
    if (estado !== "PENDIENTE" && estado !== "PAGO_PARCIAL") return sum;
    const monto = Number(b.monto_total);
    return sum + (Number.isFinite(monto) ? monto : 0);
  }, 0);
}

export async function getProveedores(): Promise<ProveedorRow[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("proveedores")
    .select("*, boletas(monto_total, estado)")
    .order("fecha_creacion", { ascending: false });

  if (error) {
    return [];
  }

  const rows = (data as ProveedorRaw[] | null) ?? [];

  return rows.map((row) => {
    const { boletas, ...rest } = row;
    return {
      ...rest,
      saldo_deudor: calcularSaldoDeudor(boletas),
    };
  });
}
