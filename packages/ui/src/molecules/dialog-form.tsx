"use client";

import { Button } from "@webcampus/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@webcampus/ui/components/dialog";
import { Form } from "@webcampus/ui/components/form";
import { useIsMobile } from "@webcampus/ui/hooks/use-mobile";
import { Plus } from "lucide-react";
import React from "react";
import { FieldValues, UseFormReturn } from "react-hook-form";

interface DialogFormProps<T extends FieldValues> {
  trigger: string | React.ReactNode;
  icon?: React.ReactNode;
  title: string;
  children: React.ReactNode;
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
}

export const DialogForm = <T extends FieldValues>({
  trigger,
  icon,
  title,
  children,
  form,
  onSubmit,
}: DialogFormProps<T>) => {
  const [open, setOpen] = React.useState(false);
  const isMobile = useIsMobile();

  const handleSubmit = (data: T) => {
    onSubmit(data);
    form.reset();
    setOpen(false);
  };

  const renderTrigger = () => {
    if (typeof trigger === "string") {
      return (
        <Button>
          {isMobile ? icon || <Plus className="h-4 w-4" /> : trigger}
        </Button>
      );
    }
    return trigger;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{renderTrigger()}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            {children}
            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="reset"
                  onClick={() => form.reset()}
                  variant="outline"
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button disabled={form.formState.isSubmitting} type="submit">
                Continue
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
