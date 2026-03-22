"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editarProveedor } from "@/modules/proveedores/actions";
import {
  proveedorSchema,
  type ProveedorFormValues,
} from "@/modules/proveedores/schemas";

type ProveedorEditar = {
  id: string;
  nombre: string;
  contacto_telefono: string | null;
  email: string | null;
  dias_visita: string | null;
};

type EditarProveedorDialogProps = {
  proveedor: ProveedorEditar;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

function valoresDesdeProveedor(p: ProveedorEditar): ProveedorFormValues {
  return {
    nombre: p.nombre,
    contacto_telefono: p.contacto_telefono ?? "",
    email: p.email ?? "",
    dias_visita: p.dias_visita ?? "",
  };
}

export function EditarProveedorDialog({
  proveedor,
  open,
  onOpenChange,
}: EditarProveedorDialogProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProveedorFormValues>({
    resolver: zodResolver(proveedorSchema),
    defaultValues: valoresDesdeProveedor(proveedor),
  });

  useEffect(() => {
    if (open) {
      form.reset(valoresDesdeProveedor(proveedor));
    }
  }, [open, proveedor, form]);

  function handleOpenChange(next: boolean) {
    setServerError(null);
    onOpenChange(next);
  }

  function onSubmit(values: ProveedorFormValues) {
    setServerError(null);
    startTransition(async () => {
      const result = await editarProveedor(proveedor.id, values);
      if (result.ok) {
        router.refresh();
        handleOpenChange(false);
      } else {
        setServerError(result.error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar proveedor</DialogTitle>
          <DialogDescription>
            Modifica los datos y guarda los cambios.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-editar-proveedor"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Distribuidora Norte"
                      autoComplete="organization"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contacto_telefono"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contacto (teléfono)</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Opcional"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Opcional"
                      autoComplete="email"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dias_visita"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Días de visita</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ej. Lun, Mié, Vie"
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {serverError ? (
              <p className="text-sm font-medium text-destructive" role="alert">
                {serverError}
              </p>
            ) : null}
          </form>
        </Form>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            disabled={isPending}
            onClick={() => handleOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="form-editar-proveedor"
            disabled={isPending}
          >
            {isPending ? "Guardando…" : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
