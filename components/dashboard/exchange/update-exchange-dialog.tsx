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
import {GiftType} from "@/types";
import {Edit, Edit2} from "lucide-react";
import UpdateExchangeGiftForm from "./update-exchange-form";

export function UpdateExchangeGift(prop: {gift: GiftType}) {
  const {gift} = prop;
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full text-blue-700 bg-blue-100"
          variant="secondary">
          Chỉnh sửa
          <Edit size={24} />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Thêm quà đổi thưởng</DialogTitle>
          <DialogDescription>
            Nhập thông tin để thêm quà đổi thưởng mới vào hệ thống.
          </DialogDescription>
        </DialogHeader>
        <UpdateExchangeGiftForm setOpen={setOpen} gift={gift} />
      </DialogContent>
    </Dialog>
  );
}
