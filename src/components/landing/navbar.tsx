import Link from "next/link";
import { Building2 } from "lucide-react";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg text-white" style={{ backgroundColor: 'var(--brand-indigo)' }}>
              <Building2 className="w-5 h-5" />
            </div>
            <span className="text-xl font-semibold tracking-tight">GestionaPro</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-5 py-2.5 text-sm font-medium border border-border rounded-lg text-foreground/90 hover:bg-accent hover:border-accent/80 transition-all"
            >
              Iniciar Sesión
            </Link>
            <a
              href="#contacto"
              className="px-5 py-2.5 text-sm font-medium text-white bg-[var(--brand-indigo)] hover:bg-[var(--brand-indigo)]/90 rounded-lg transition-all shadow-sm shadow-[var(--brand-indigo)]/30"
            >
              Solicitar Demo
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}