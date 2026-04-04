import { CashFlowChart } from "./cash-flow-chart";
import { PriorityAttention } from "./priority-attention";
import { getMonthlyCashFlow, getUpcomingBills } from "./queries";

export async function DashboardCharts() {
  // Pedimos ambas consultas en paralelo para ganar velocidad
  const [chartData, upcomingBills] = await Promise.all([
    getMonthlyCashFlow(),
    getUpcomingBills()
  ]);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
      {/* Gráfico */}
      <div className="col-span-4 bg-card border border-border rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col">
        <h3 className="text-lg font-semibold text-foreground tracking-tight mb-2">Flujo de Caja</h3>
        <p className="text-sm text-muted-foreground">Comparativa de ingresos vs. egresos de los últimos 6 meses.</p>
        <div className="flex-1 mt-2">
          <CashFlowChart data={chartData} />
        </div>
      </div>

      {/* Atención Prioritaria */}
      <div className="col-span-3 bg-card border border-border rounded-xl p-6 shadow-sm min-h-[400px] flex flex-col">
        <h3 className="text-lg font-semibold text-foreground tracking-tight mb-1">Atención Prioritaria</h3>
        <p className="text-sm text-muted-foreground mb-6">Vencimientos urgentes a liquidar.</p>
        
        <PriorityAttention bills={upcomingBills} />
      </div>
    </div>
  );
}