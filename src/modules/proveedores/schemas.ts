import { z } from "zod";

export const proveedorSchema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio."),
  contacto_telefono: z.string().optional(),
  email: z
    .string()
    .transform((v) => v.trim())
    .refine(
      (v) => v === "" || z.string().email().safeParse(v).success,
      "Introduce un email válido o déjalo vacío."
    ),
  dias_visita: z.string().optional(),
});

export type ProveedorFormValues = z.infer<typeof proveedorSchema>;
