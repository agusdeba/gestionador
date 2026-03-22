type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProveedorCuentaCorrientePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <div className="space-y-2">
      <h1 className="text-2xl font-semibold tracking-tight">
        Cuenta corriente
      </h1>
      <p className="text-sm text-muted-foreground">
        Proveedor <span className="font-mono text-xs">{id}</span> — pendiente de
        implementación.
      </p>
    </div>
  );
}
