import { Role } from "@webcampus/types/rbac";
import { Button } from "@webcampus/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@webcampus/ui/components/dialog";
import { capitalize } from "@webcampus/ui/lib/utils";
import React from "react";
import { CreateUserForm } from "./create-user-form";

interface CreateUserDialogProps {
  role: Role;
}

export const CreateUserDialog = ({ role }: CreateUserDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create {capitalize(role)}</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New {capitalize(role)}</DialogTitle>
        </DialogHeader>
        <CreateUserForm role={role}>
          <DialogFooter className="flex w-full items-center justify-between">
            <Button type="reset" variant={"outline"}>
              Reset
            </Button>
            <Button type="submit">Continue</Button>
          </DialogFooter>
        </CreateUserForm>
      </DialogContent>
    </Dialog>
  );
};
