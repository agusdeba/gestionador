"use client";

import { useActionState, startTransition, useEffect, useState, useRef } from "react";
import { Send, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { enviarMailContacto } from "./actions";

export function ContactForm() {
    const [state, formAction, isPending] = useActionState(enviarMailContacto, null);

    const [showSuccess, setShowSuccess] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        if (state?.success) {
          setShowSuccess(true);
          formRef.current?.reset(); 
          const timer = setTimeout(() => {
            setShowSuccess(false);
          }, 4000);
          return () => clearTimeout(timer);
        }
      }, [state]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        
        startTransition(() => {
          formAction(formData);
        });
    };    
    
    if (showSuccess) {
        return (
          <div className="text-center p-8 bg-[var(--success-green-light)] border border-[var(--success-green)] rounded-xl flex flex-col items-center gap-4 shadow-inner shadow-[var(--success-green)]/10 animate-in fade-in zoom-in duration-500">
            <CheckCircle2 className="w-16 h-16 text-[var(--success-green)]" />
            <h4 className="text-2xl font-semibold text-foreground">¡Solicitud enviada!</h4>
            <p className="text-muted-foreground leading-relaxed">
              Gracias por tu interés. Revisaremos tus datos y nos pondremos en contacto contigo lo antes posible para coordinar la demostración del sistema.
            </p>
          </div>
        );
    }   

      return (
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-5 animate-in fade-in duration-500">
      
            {state?.error && !showSuccess && (
                <div className="flex items-center gap-2 rounded-lg border border-[var(--debt-red)] bg-[var(--debt-red-light)] p-3 text-sm font-medium text-[var(--debt-red)]">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <p>{state.error}</p>
                </div>
            )}
    
            <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
                Nombre completo <span className="text-[var(--debt-red)]">*</span>
                </label>
                <input
                type="text" id="name" name="name" required
                placeholder="Juan Pérez"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-transparent transition-all"
                />
            </div>
        
            <div>
                <label htmlFor="company" className="block text-sm font-medium mb-2 text-foreground">
                Nombre de tu empresa/negocio <span className="text-[var(--debt-red)]">*</span>
                </label>
                <input
                type="text" id="company" name="company" required
                placeholder="Mi empresa"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-transparent transition-all"
                />
            </div>
        
            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
                Email <span className="text-[var(--debt-red)]">*</span>
                </label>
                <input
                type="email" id="email" name="email" required
                placeholder="juan@ejemplo.com"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-transparent transition-all"
                />
            </div>
        
            <div>
                <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
                Teléfono / WhatsApp <span className="text-[var(--debt-red)]">*</span>
                </label>
                <input
                type="tel" id="phone" name="phone" required
                placeholder="+54 9 291 123 4567"
                className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-transparent transition-all"
                />
            </div>
        
            <button
                type="submit"
                disabled={isPending}
                className="w-full group px-6 py-4 bg-[var(--brand-indigo)] hover:bg-[var(--brand-indigo)]/90 text-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--brand-indigo)]/20 font-medium disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Enviando solicitud...
                </>
                ) : (
                <>
                    Enviar solicitud
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
                )}
            </button>
            </form>
        );
}