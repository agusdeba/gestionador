"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

import { createClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email("Introduce un email válido."),
  password: z.string().min(1, "La contraseña es obligatoria."),
});

export type LoginState = {
  error: string | null;
} | null;

export async function loginAction(
  _prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    const fieldErrors = parsed.error.flatten().fieldErrors;
    const msg =
      fieldErrors.email?.[0] ??
      fieldErrors.password?.[0] ??
      "Revisa los datos del formulario.";
    return { error: msg };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/panel");
}
