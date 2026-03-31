import { Quote } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Antes perdíamos horas buscando los remitos de los proveedores y calculando la deuda a mano. Desde que implementamos el sistema, tenemos el saldo exacto en la pantalla al instante. Nos cambió el día a día.",
    author: "Carlos M.",
    role: "Gerente de Distribuidora de Bebidas"
  },
  {
    quote: "Lo que más valoro es poder registrar un pago a cuenta y que le llegue el recibo en PDF directo por WhatsApp al proveedor. Queda todo registrado y se terminaron las discusiones por la plata.",
    author: "Roberto",
    role: "Dueño de Carnicería"
  },
  {
    quote: "Súper fácil de usar. Cargamos a todos los proveedores de harina y descartables en una tarde. Ahora sabemos exactamente a quién le debemos y tenemos el control total del negocio.",
    author: "María",
    role: "Dueña de Panadería en Bahía Blanca"
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl tracking-tight mb-4 font-bold">
            Empresarios que ya ordenaron sus finanzas
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Historias reales de negocios que transformaron su gestión con GestionaPro.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl p-8 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 relative mt-4"
            >
              <div className="absolute -top-6 left-8 bg-[var(--brand-indigo)] text-white p-3 rounded-lg shadow-lg">
                <Quote className="w-5 h-5" />
              </div>
              
              <p className="text-muted-foreground leading-relaxed mb-6 mt-4 italic">
                "{testimonial.quote}"
              </p>
              
              <div className="border-t border-border pt-4">
                <p className="font-semibold text-foreground">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground mt-1">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}