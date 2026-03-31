import { ContactForm } from "./contact-form";

export function CTASection() {
  return (
    <section id="contacto" className="py-24 px-6 bg-[var(--brand-indigo)]/5 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              ¿Listo para ordenar las finanzas de tu negocio?
            </h2>
            <p className="text-xl text-muted-foreground mb-6 leading-relaxed">
              Únete a cientos de empresas que ya confían en GestionaPro para administrar sus proveedores y cuentas corrientes.
            </p>
            <p className="text-lg text-foreground font-medium">
              Déjanos tus datos y te mostraremos cómo el sistema se adapta a tu negocio.
            </p>
          </div>

          <div className="bg-card border border-border rounded-2xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-6 text-center lg:text-left">
              Solicitar una demostración
            </h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}