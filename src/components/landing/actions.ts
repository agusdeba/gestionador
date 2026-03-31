"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarMailContacto(prevState: any, formData: FormData) {
  const name = formData.get("name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;

  try {
    const { error } = await resend.emails.send({
      from: "GestionaPro Web <onboarding@resend.dev>",
      to: ["agusdebattista@gmail.com"], 
      subject: `Nueva solicitud de Demo: ${company}`,
      html: `
        <h2>¡Nuevo prospecto desde la Landing Page!</h2>
        <p><strong>Nombre:</strong> ${name}</p>
        <p><strong>Empresa:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Teléfono:</strong> ${phone}</p>
      `,
    });

    if (error) {
      return { success: false, error: "Hubo un error al enviar el email. Intenta de nuevo." };
    }

    return { success: true, error: null };
  } catch (e) {
    return { success: false, error: "Error de red interno." };
  }
}