"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {ChangeAvatarForm} from "../form/update-avatar";
import {useState} from "react";

export function UpdateAvatar(prop: {user: any}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Cập nhật ảnh đại diện</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
        </DialogHeader>
        <ChangeAvatarForm user={prop.user} setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
