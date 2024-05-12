"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import React, {useState} from "react";
import {ChangePasswordForm} from "../form/change-password-form";
import {UserType} from "@/types";
import {ChangePersonalInformationForm} from "../form/update-personal-form";

export function ChangePersonalInformation(prop: {user: UserType}) {
  const user = prop.user;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex justify-end">
          <Button>Cập nhật thông tin cá nhân</Button>
        </div>
      </DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Cập nhật thông tin cá nhân</DialogTitle>
          <DialogDescription>
            Điền thông tin để đổi thông tin cá nhân
          </DialogDescription>
        </DialogHeader>
        <ChangePersonalInformationForm user={prop.user} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
