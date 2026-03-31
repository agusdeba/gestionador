"use client";

import { useState } from "react";
import { Send } from "lucide-react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Más adelante conectaremos esto a tu email
    console.log("Datos del formulario:", formData);
    alert("¡Gracias! Nos pondremos en contacto contigo pronto.");
    setFormData({ name: "", company: "", email: "", phone: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2 text-foreground">
          Nombre completo <span className="text-[var(--debt-red)]">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Juan Pérez"
          className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-2 text-foreground">
          Nombre de tu empresa/negocio <span className="text-[var(--debt-red)]">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          required
          value={formData.company}
          onChange={handleChange}
          placeholder="Mi Empresa S.A."
          className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-2 text-foreground">
          Email <span className="text-[var(--debt-red)]">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="juan@miempresa.com"
          className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-transparent transition-all"
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium mb-2 text-foreground">
          Teléfono / WhatsApp <span className="text-[var(--debt-red)]">*</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
          placeholder="+54 9 11 1234-5678"
          className="w-full px-4 py-3 bg-input-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--brand-indigo)] focus:border-transparent transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full group px-6 py-4 bg-[var(--brand-indigo)] hover:bg-[var(--brand-indigo)]/90 text-white rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-[var(--brand-indigo)]/20 font-medium"
      >
        Enviar solicitud
        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </button>
    </form>
  );
}