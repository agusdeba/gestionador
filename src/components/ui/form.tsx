"use client";

import * as React from "react";
import { Slot } from "radix-ui";
import {
  Controller,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
  FormProvider,
  useFormContext,
} from "react-hook-form";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const FormItemContext = React.createContext<string | undefined>(undefined);

const FormItem = ({
  className,
  ref,
  ...props
}: React.ComponentProps<"div"> & { ref?: React.Ref<HTMLDivElement> }) => {
  const id = React.useId();
  return (
    <FormItemContext.Provider value={id}>
      <div
        ref={ref}
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error("useFormField debe usarse dentro de FormField");
  }

  if (!itemContext) {
    throw new Error("useFormField debe usarse dentro de FormItem");
  }

  const fieldState = getFieldState(fieldContext.name, formState);

  return {
    id: itemContext,
    name: fieldContext.name,
    formItemId: `${itemContext}-form-item`,
    formDescriptionId: `${itemContext}-form-item-description`,
    formMessageId: `${itemContext}-form-item-message`,
    ...fieldState,
  };
};

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      className={cn(error && "text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

const FormControl = ({
  ref,
  ...props
}: React.ComponentProps<typeof Slot.Root> & {
  ref?: React.Ref<React.ComponentRef<typeof Slot.Root>>;
}) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot.Root
      ref={ref}
      id={formItemId}
      aria-describedby={
        error ? `${formDescriptionId} ${formMessageId}` : `${formDescriptionId}`
      }
      aria-invalid={!!error}
      data-slot="form-control"
      {...props}
    />
  );
};

function FormDescription({
  className,
  ref,
  ...props
}: React.ComponentProps<"p"> & { ref?: React.Ref<HTMLParagraphElement> }) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      data-slot="form-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

function FormMessage({
  className,
  ref,
  children,
  ...props
}: React.ComponentProps<"p"> & { ref?: React.Ref<HTMLParagraphElement> }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error.message ?? "") : children;

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      data-slot="form-message"
      className={cn("text-sm font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  );
}

export {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useFormField,
};
