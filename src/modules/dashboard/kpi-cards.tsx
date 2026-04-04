import { TrendingUp, TrendingDown, Receipt, CalendarClock } from "lucide-react";
import { getDashboardKPIs } from "@/modules/dashboard/queries";

export async function KpiCards() {
  // Llamamos a nuestra función de base de datos
  const kpis = await getDashboardKPIs();

  // Función auxiliar para formatear los números a Moneda (Pesos Argentinos)
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      
      {/* KPI 1: Ingresos Totales */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-row items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Ingresos Totales</h3>
          <div className="w-8 h-8 rounded-full bg-[var(--success-green-light)] flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-[var(--success-green)]" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-foreground">{formatCurrency(kpis.totalIngresos)}</div>
          <p className="text-xs text-muted-foreground">
            Basado en ingresos diarios
          </p>
        </div>
      </div>

      {/* KPI 2: Egresos Totales */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-row items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Egresos (Pagos)</h3>
          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
            <TrendingDown className="w-4 h-4 text-muted-foreground" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-foreground">{formatCurrency(kpis.totalEgresos)}</div>
          <p className="text-xs text-muted-foreground">
            Pagos realizados a proveedores
          </p>
        </div>
      </div>

      {/* KPI 3: Deuda Total Activa */}
      <div className="bg-card border border-[var(--debt-red)]/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--debt-red-light)] opacity-20 blur-2xl rounded-full" />
        
        <div className="flex flex-row items-center justify-between pb-2 relative z-10">
          <h3 className="text-sm font-bold text-[var(--debt-red)]">Deuda Total Activa</h3>
          <div className="w-8 h-8 rounded-full bg-[var(--debt-red-light)] flex items-center justify-center">
            <Receipt className="w-4 h-4 text-[var(--debt-red)]" />
          </div>
        </div>
        <div className="flex flex-col gap-1 relative z-10">
          <div className="text-2xl font-bold text-foreground">{formatCurrency(kpis.deudaTotal)}</div>
          <p className="text-xs text-muted-foreground">
            Saldo pendiente en cuentas corrientes
          </p>
        </div>
      </div>

      {/* KPI 4: Próximos Vencimientos */}
      <div className="bg-card border border-[var(--warning-amber)]/30 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex flex-row items-center justify-between pb-2">
          <h3 className="text-sm font-medium text-muted-foreground">Próximos Vencimientos</h3>
          <div className="w-8 h-8 rounded-full bg-[var(--warning-amber-light)] flex items-center justify-center">
            <CalendarClock className="w-4 h-4 text-[var(--warning-amber)]" />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold text-foreground">{kpis.vencimientosCercanos} Boletas</div>
          <p className="text-xs text-[var(--warning-amber)] font-medium">
            Pendientes de pago
          </p>
        </div>
      </div>

    </div>
  );
}