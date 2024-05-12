"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import AddPositionForm from "../form/add-position-form";

export function AddPositionDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Thêm chức vụ mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[80%] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle>Thêm chức vụ mới vào hệ thống</DialogTitle>
        </DialogHeader>
        <AddPositionForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
}
