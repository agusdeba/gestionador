import { LogOut } from "lucide-react";
import { cerrarSesion } from "@/modules/auth/actions";

export function LogoutButton() {
  return (
    <form action={cerrarSesion}>
      <button 
        type="submit" 
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-[var(--debt-red)] hover:bg-[var(--debt-red-light)] rounded-lg transition-all"
      >
        Cerrar sesión
        <LogOut className="w-4 h-4" />
      </button>
    </form>
  );
}