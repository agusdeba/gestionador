import { createClient } from "@/lib/supabase/server";

export async function getDashboardKPIs() {
  const supabase = await createClient();

  try {
    // 1. Ingresos Totales (Sumamos la columna monto)
    const { data: ingresosData } = await supabase
      .from('ingresos_diarios')
      .select('monto');
    
    const totalIngresos = ingresosData?.reduce((acc, row) => acc + Number(row.monto || 0), 0) || 0;

    // 2. Egresos Totales (Sumamos la columna monto de los pagos)
    const { data: pagosData } = await supabase
      .from('pagos_proveedores')
      .select('monto');
      
    const totalEgresos = pagosData?.reduce((acc, row) => acc + Number(row.monto || 0), 0) || 0;

    // 3. Deuda Total Activa (Sumamos saldo_deudor solo de proveedores activos)
    const { data: proveedoresData } = await supabase
      .from('proveedores')
      .select('saldo_deudor')
      .is('activo', true);
      
    const deudaTotal = proveedoresData?.reduce((acc, row) => acc + Number(row.saldo_deudor || 0), 0) || 0;

    // 4. Próximos Vencimientos (Contamos las boletas que tengas cargadas)
    // Usamos { count: 'exact', head: true } para que Supabase solo nos devuelva el número
    // y no nos traiga todos los datos de las boletas (optimización de red)
    const { count: vencimientosCercanos } = await supabase
      .from('boletas')
      .select('*', { count: 'exact', head: true });

    return {
      totalIngresos,
      totalEgresos,
      deudaTotal,
      vencimientosCercanos: vencimientosCercanos || 0
    };

  } catch (error) {
    console.error("Error obteniendo KPIs del dashboard:", error);
    // Si algo falla, devolvemos todo en cero para que la página cargue igual
    return {
      totalIngresos: 0,
      totalEgresos: 0,
      deudaTotal: 0,
      vencimientosCercanos: 0
    };
  }
}

export async function getMonthlyCashFlow() {
    const supabase = await createClient();
  
    // 1. Calculamos la fecha de hace 6 meses para no traer todo el historial
    const date6MonthsAgo = new Date();
    date6MonthsAgo.setMonth(date6MonthsAgo.getMonth() - 5); 
    date6MonthsAgo.setDate(1); 
    date6MonthsAgo.setHours(0, 0, 0, 0);
    const startDateString = date6MonthsAgo.toISOString();
  
    try {
      // 2. Traemos ingresos y egresos desde esa fecha
      const { data: ingresos } = await supabase
        .from('ingresos_diarios')
        .select('monto, fecha')
        .gte('fecha', startDateString);
  
      const { data: egresos } = await supabase
        .from('pagos_proveedores')
        .select('monto, fecha_pago')
        .gte('fecha_pago', startDateString);
  
      const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
      const last6Months: { mes: string; monthIndex: number; year: number; ingresos: number; egresos: number }[] = [];
      
      // Armamos el array de atrás para adelante (Ej: Nov, Dic, Ene, Feb, Mar, Abr)
      for (let i = 5; i >= 0; i--) {
        const d = new Date();
        d.setMonth(d.getMonth() - i);
        last6Months.push({
          mes: monthNames[d.getMonth()],
          monthIndex: d.getMonth(),
          year: d.getFullYear(),
          ingresos: 0,
          egresos: 0
        });
      }
  
      // 4. Transformación: Sumamos los ingresos en el mes que corresponde
      ingresos?.forEach(ingreso => {
        const date = new Date(ingreso.fecha);
        const monthData = last6Months.find(m => m.monthIndex === date.getMonth() && m.year === date.getFullYear());
        if (monthData) monthData.ingresos += Number(ingreso.monto || 0);
      });
  
      // 5. Transformación: Sumamos los egresos en el mes que corresponde
      egresos?.forEach(egreso => {
        const date = new Date(egreso.fecha_pago);
        const monthData = last6Months.find(m => m.monthIndex === date.getMonth() && m.year === date.getFullYear());
        if (monthData) monthData.egresos += Number(egreso.monto || 0);
      });
  
      return last6Months;
  
    } catch (error) {
      console.error("Error armando flujo de caja:", error);
      return []; 
    }
  }

  export async function getUpcomingBills() {
    const supabase = await createClient();
  
    const { data, error } = await supabase
      .from('boletas')
      .select(`
        id,
        nro_comprobante,
        monto_total,
        fecha_vencimiento,
        estado,
        proveedores (
          nombre
        )
      `)
      .or('estado.eq.PENDIENTE,estado.eq.PAGO_PARCIAL') 
      .order('fecha_vencimiento', { ascending: true }) 
      .limit(5);
  
    if (error) {
      console.error("Error obteniendo boletas prioritarias:", error);
      return [];
    }
  
    return data;
  }