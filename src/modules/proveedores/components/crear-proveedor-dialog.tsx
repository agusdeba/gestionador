"use client";

import { useState, useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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
import { crearProveedor } from "@/modules/proveedores/actions";
import {
  proveedorSchema,
  type ProveedorFormValues,
} from "@/modules/proveedores/schemas";

const defaultValues: ProveedorFormValues = {
  nombre: "",
  contacto_telefono: "",
  email: "",
  dias_visita: "",
};

type CrearProveedorDialogProps = {
  triggerClassName?: string;
};

export function CrearProveedorDialog({
  triggerClassName,
}: CrearProveedorDialogProps) {
  const [open, setOpen] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ProveedorFormValues>({
    resolver: zodResolver(proveedorSchema),
    defaultValues,
  });

  function onOpenChange(next: boolean) {
    setOpen(next);
    if (!next) {
      form.reset(defaultValues);
      setServerError(null);
    }
  }

  function onSubmit(values: ProveedorFormValues) {
    setServerError(null);
    startTransition(async () => {
      const result = await crearProveedor(values);
      if (result.ok) {
        setOpen(false);
        form.reset(defaultValues);
      } else {
        setServerError(result.error);
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className={triggerClassName} type="button">
          <Plus className="size-4" aria-hidden />
          Nuevo Proveedor
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Nuevo proveedor</DialogTitle>
          <DialogDescription>
            Completa los datos básicos. Podrás editarlos más adelante.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            id="form-crear-proveedor"
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
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            form="form-crear-proveedor"
            disabled={isPending}
          >
            {isPending ? "Guardando…" : "Guardar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
