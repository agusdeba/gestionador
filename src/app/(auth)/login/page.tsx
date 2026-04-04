import type { Metadata } from "next";

import { LoginForm } from "@/modules/auth/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión · Gestionador",
  description: "Accede a tu panel de Gestionador",
};

export default function LoginPage() {
  return <LoginForm />;
}
