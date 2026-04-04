"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Loader2 } from "lucide-react";

// Le decimos a TypeScript qué forma tienen los datos que va a recibir
type CashFlowChartProps = {
  data: {
    mes: string;
    ingresos: number;
    egresos: number;
  }[];
};

// Ahora el componente recibe 'data' desde afuera
export function CashFlowChart({ data }: CashFlowChartProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="h-[300px] w-full mt-6 flex flex-col items-center justify-center bg-muted/10 border border-dashed border-border rounded-xl animate-pulse">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--brand-indigo)] mb-3 opacity-50" />
        <p className="text-sm font-medium text-muted-foreground">Cargando flujo de caja...</p>
      </div>
    );
  }

  return (
    <div className="h-[300px] w-full mt-6">
      <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
          
          <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 13, fontWeight: 500 }} dy={10} />
          <YAxis width={60} axisLine={false} tickLine={false} tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
          
          <Tooltip
            cursor={{ fill: 'rgba(0, 0, 0, 0.04)' }}
            contentStyle={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.95)', // Blanco puro y sólido
              borderRadius: '8px', 
              boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.05)', // Sombra bien definida
              padding: '12px 16px',
              opacity: 1, // Opacidad al máximo, cero transparencia
            }}
            itemStyle={{
              paddingTop: '6px',
              fontWeight: 600, // Letra un poco más gruesa
            }}
            labelStyle={{
              color: '#0f172a', // Color oscuro para el texto del mes
              fontWeight: 'bold',
              marginBottom: '4px',
              borderBottom: '1px solid #f1f5f9',
              paddingBottom: '4px'
            }}
            formatter={(value: any, name: any) => [
              `$${Number(value).toLocaleString('es-AR')}`, 
              name === "ingresos" ? "Ingresos" : "Egresos"
            ]}
          />
          
          <Bar dataKey="ingresos" name="ingresos" fill="var(--success-green)" radius={[4, 4, 0, 0]} barSize={24} />
          <Bar dataKey="egresos" name="egresos" fill="var(--debt-red)" radius={[4, 4, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}