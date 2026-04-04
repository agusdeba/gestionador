export function Footer() {
    const currentYear = new Date().getFullYear();
  
    return (
      <footer className="py-12 px-6 border-t border-border bg-background">
        <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <p className="text-sm text-muted-foreground">
                © {currentYear} GestionaPro. Todos los derechos reservados.
                </p>
            </div>
        </div>
      </footer>
    );
  }