"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";

import { proveedorSchema, type ProveedorFormValues } from "./schemas";

export type CrearProveedorResult =
  | { ok: true }
  | { ok: false; error: string };

export async function crearProveedor(
  valores: ProveedorFormValues
): Promise<CrearProveedorResult> {
  const parsed = proveedorSchema.safeParse(valores);
  if (!parsed.success) {
    const first =
      Object.values(parsed.error.flatten().fieldErrors).flat()[0] ??
      "Datos inválidos.";
    return { ok: false, error: first };
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { ok: false, error: "No hay sesión activa." };
  }

  const { data: usuarioEmpresa, error: ueError } = await supabase
    .from("usuarios_empresa")
    .select("id_empresa")
    .eq("id_usuario_auth", user.id)
    .maybeSingle();

  if (ueError) {
    return { ok: false, error: ueError.message };
  }

  if (!usuarioEmpresa?.id_empresa) {
    return {
      ok: false,
      error: "No se encontró una empresa asociada a tu usuario.",
    };
  }

  const emailTrim = parsed.data.email;
  const { error: insertError } = await supabase.from("proveedores").insert({
    id_empresa: usuarioEmpresa.id_empresa,
    nombre: parsed.data.nombre.trim(),
    contacto_telefono: parsed.data.contacto_telefono?.trim() || null,
    email: emailTrim === "" ? null : emailTrim,
    dias_visita: parsed.data.dias_visita?.trim() || null,
    activo: true,
  });

  if (insertError) {
    return { ok: false, error: insertError.message };
  }

  revalidatePath("/panel/proveedores");
  return { ok: true };
}

export async function toggleEstadoProveedor(
  id: string,
  estadoActual: boolean
): Promise<CrearProveedorResult> {
  const supabase = await createClient();
  const { error } = await supabase
    .from("proveedores")
    .update({ activo: !estadoActual })
    .eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/panel/proveedores");
  return { ok: true };
}

export async function editarProveedor(
  id: string,
  valores: ProveedorFormValues
): Promise<CrearProveedorResult> {
  const parsed = proveedorSchema.safeParse(valores);
  if (!parsed.success) {
    const first =
      Object.values(parsed.error.flatten().fieldErrors).flat()[0] ??
      "Datos inválidos.";
    return { ok: false, error: first };
  }

  const supabase = await createClient();
  const emailTrim = parsed.data.email;
  const { error } = await supabase
    .from("proveedores")
    .update({
      nombre: parsed.data.nombre.trim(),
      contacto_telefono: parsed.data.contacto_telefono?.trim() || null,
      email: emailTrim === "" ? null : emailTrim,
      dias_visita: parsed.data.dias_visita?.trim() || null,
    })
    .eq("id", id);

  if (error) {
    return { ok: false, error: error.message };
  }

  revalidatePath("/panel/proveedores");
  return { ok: true };
}
