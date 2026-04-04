import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { DashboardHeader } from "@/modules/dashboard/dashboard-header";
import { KpiCards } from "@/modules/dashboard/kpi-cards";
import { DashboardCharts } from "@/modules/dashboard/dashboard-charts";

function KpiLoadingFallback() {
  return (
    <div className="flex flex-col items-center justify-center py-16 w-full border border-border rounded-xl bg-card/50">
      <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-indigo)] mb-4" />
      <p className="text-sm font-medium text-muted-foreground">Calculando estado de cuentas...</p>
    </div>
  );
}

// Creamos un fallback para los gráficos también
function ChartsLoadingFallback() {
  return (
    <div className="h-[400px] w-full flex flex-col items-center justify-center border border-border rounded-xl bg-card/50">
      <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-indigo)] mb-4" />
      <p className="text-sm font-medium text-muted-foreground">Cargando módulos interactivos...</p>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <DashboardHeader />
      
      <Suspense fallback={<KpiLoadingFallback />}>
        <KpiCards />
      </Suspense>
      
      {/* Envolvemos los gráficos en Suspense */}
      <Suspense fallback={<ChartsLoadingFallback />}>
        <DashboardCharts />
      </Suspense>
    </div>
  );
}