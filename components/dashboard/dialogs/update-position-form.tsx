"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import {PositionType} from "@/types";
import {FileEditIcon} from "lucide-react";
import UpdatePositionForm from "../form/edit-position-form";

export function UpdatePositionDialog(prop: {position: PositionType}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full text-blue-700 bg-blue-100"
          size="icon"
          variant="secondary">
          <FileEditIcon className="w-6 h-6" />
          {/* <TrashIcon className="w-6 h-6" /> */}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-screen">
        <DialogHeader>
          <DialogTitle>Cập nhật chức vụ</DialogTitle>
        </DialogHeader>
        <UpdatePositionForm setOpen={setOpen} position={prop.position} />
      </DialogContent>
    </Dialog>
  );
}
