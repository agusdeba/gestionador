import { format } from "date-fns";
import { es } from "date-fns/locale";
import { AlertCircle, Clock } from "lucide-react";

type Bill = {
  id: string;
  nro_comprobante: string;
  monto_total: number;
  fecha_vencimiento: string;
  estado: string;
  proveedores: { nombre: string } | any;
};

export function PriorityAttention({ bills }: { bills: Bill[] }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="flex flex-col gap-4">
      {bills.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">No hay vencimientos próximos.</p>
      ) : (
        <div className="space-y-4">
          {bills.map((bill) => {
            const isOverdue = new Date(bill.fecha_vencimiento) < new Date();
            
            return (
              <div key={bill.id} className="flex items-center justify-between p-3 rounded-lg border border-border bg-background hover:bg-accent/50 transition-colors cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${isOverdue ? 'bg-[var(--debt-red-light)]' : 'bg-orange-100'}`}>
                    {isOverdue ? <AlertCircle className="w-4 h-4 text-[var(--debt-red)]" /> : <Clock className="w-4 h-4 text-orange-600" />}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{bill.proveedores?.nombre}</p>
                    <p className="text-xs text-muted-foreground">{bill.nro_comprobante}</p>
                  </div>
                </div>
                
                <div className="text-right shrink-0 pl-4">
                  <p className="text-sm font-bold text-foreground">{formatCurrency(bill.monto_total)}</p>
                  <p className={`text-[10px] font-medium uppercase tracking-wider whitespace-nowrap ${isOverdue ? 'text-[var(--debt-red)]' : 'text-muted-foreground'}`}>
                    {isOverdue ? 'Vencida' : 'Vence'}: {format(new Date(bill.fecha_vencimiento), "dd MMM", { locale: es })}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      <button className="w-full py-2 text-xs font-semibold text-[var(--brand-indigo)] hover:underline">
        Ver todas las cuentas corrientes
      </button>
    </div>
  );
}