"use client";

import { Building2, TrendingUp, Receipt, MessageSquare } from "lucide-react";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const features: Feature[] = [
  {
    icon: <Building2 className="w-8 h-8" />,
    title: "Control Multi-Sucursal",
    description: "Administra múltiples sucursales desde un único panel centralizado.",
    color: "var(--brand-indigo)",
    bgColor: "var(--brand-indigo-light)"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Métricas en Tiempo Real (KPIs)",
    description: "Visualiza al instante tus ingresos totales, egresos y tu deuda total activa.",
    color: "var(--success-green)",
    bgColor: "var(--success-green-light)"
  },
  {
    icon: <Receipt className="w-8 h-8" />,
    title: "Gestión de Proveedores",
    description: "Controla las cuentas por pagar, carga boletas y visualiza el saldo deudor actual de inmediato.",
    color: "var(--debt-red)",
    bgColor: "var(--debt-red-light)"
  },
  {
    icon: <MessageSquare className="w-8 h-8" />,
    title: "Automatización por WhatsApp",
    description: "Al registrar un pago, el sistema calcula el nuevo saldo y genera un PDF para enviarlo por WhatsApp al proveedor.",
    color: "var(--warning-amber)",
    bgColor: "var(--warning-amber-light)"
  }
];

export function FeaturesSection() {
  return (
    <section id="caracteristicas" className="py-24 px-6 bg-muted border-y border-border/50">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4 font-bold">
            Todo lo que necesitas para gestionar tu negocio
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Funciones diseñadas para ahorrarte tiempo y darte control total sobre tus finanzas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{
                boxShadow: `0 0 0 0 ${feature.color}20`,
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 10px 40px -10px ${feature.color}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = `0 0 0 0 ${feature.color}20`;
              }}
            >
              <div 
                className="w-16 h-16 rounded-lg flex items-center justify-center mb-5 group-hover:scale-110 transition-transform"
                style={{
                  backgroundColor: feature.bgColor,
                  color: feature.color
                }}
              >
                {feature.icon}
              </div>
              <h3 className="text-2xl mb-3 tracking-tight font-semibold">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}