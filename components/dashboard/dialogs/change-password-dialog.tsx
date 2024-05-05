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

export function ChangePasswordDialog(prop: {username: string}) {
  const username = prop.username;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Đổi mật khẩu</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Thay đổi mật khẩu</DialogTitle>
          <DialogDescription>Điền thông tin để đổi mật khẩu</DialogDescription>
        </DialogHeader>
        <ChangePasswordForm username={username} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
