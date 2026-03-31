"use client";

import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  const handleScrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const featuresSection = document.getElementById('caracteristicas');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  const handleScrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative pt-32 pb-24 px-6 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-r from-[var(--brand-indigo-light)] via-[var(--success-green-light)] to-[var(--warning-amber-light)] opacity-30 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[400px] bg-gradient-to-l from-[var(--debt-red-light)] to-transparent opacity-20 blur-3xl rounded-full" />
      </div>

      <div className="container mx-auto max-w-6xl">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 leading-tight font-bold">
            El control de tus proveedores y cuentas corrientes, por fin en un solo lugar.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Olvídate de los papeles y los Excel desactualizados. Registra boletas, controla saldos deudores y genera comprobantes en PDF al instante.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contacto"
              onClick={handleScrollToContact}
              className="group px-8 py-4 bg-[var(--brand-indigo)] hover:bg-[var(--brand-indigo)]/90 text-white rounded-lg transition-all flex items-center gap-2 text-lg shadow-lg shadow-[var(--brand-indigo)]/20 font-medium cursor-pointer"
            >
              Solicitar Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            
            <a
              href="#caracteristicas"
              onClick={handleScrollToFeatures}
              className="px-8 py-4 border-2 border-border hover:bg-accent rounded-lg transition-colors flex items-center gap-2 text-lg font-medium"
            >
              <Play className="w-5 h-5" />
              Ver características
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}