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
import AddGiftForm from "./new-exchange-form";

export function NewExchangeDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Thêm quà đổi thưởng</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Thêm quà đổi thưởng</DialogTitle>
          <DialogDescription>
            Nhập thông tin để thêm quà đổi thưởng mới vào hệ thống.
          </DialogDescription>
        </DialogHeader>
        <AddGiftForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
