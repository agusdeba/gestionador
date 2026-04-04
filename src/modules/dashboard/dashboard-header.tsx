import { MapPin, Calendar as CalendarIcon } from "lucide-react";

export function DashboardHeader() {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">Panel de Control</h2>
        <p className="text-muted-foreground mt-1">
          Resumen financiero y estado de cuentas corrientes.
        </p>
      </div>
      
      {/* Filtros Globales (Mock visual) */}
      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-accent transition-colors">
          <CalendarIcon className="w-4 h-4 text-muted-foreground" />
          Este mes
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[var(--brand-indigo)] text-white rounded-lg text-sm font-medium hover:bg-[var(--brand-indigo)]/90 transition-colors shadow-sm shadow-[var(--brand-indigo)]/20">
          <MapPin className="w-4 h-4" />
          Todas las sucursales
        </button>
      </div>
    </div>
  );
}