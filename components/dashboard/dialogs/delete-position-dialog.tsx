"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import {PositionType} from "@/types";
import EditPositionForm from "../form/edit-position-form";
import {TrashIcon} from "lucide-react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {DeletePosition} from "@/actions/Position";
import {useToast} from "@/components/ui/use-toast";
export function DeletePositionDialog(prop: {position: PositionType}) {
  const [open, setOpen] = useState(false);
  const position = prop.position;
  const [isPendding, setPendding] = useState(false);
  const {toast} = useToast();

  const handleDeletePosition = async () => {
    setPendding(true);
    const res = DeletePosition(position.position_id);
    const data = await res;
    if (data.success) {
      toast({
        title: "Xoá chức vụ thành công",
        description: `Chức vụ ${position.position_name} đã được xoá khỏi hệ thống`,
      });
      setOpen(false);
      setPendding(false);
      return;
    }
    toast({
      title: "Xoá chức vụ thất bại",
      description:
        data.error ||
        ` Đã có lỗi xảy ra khi xoá chức vụ ${position.position_name}`,
    });
    setPendding(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-full text-red-700 bg-red-100"
          size="icon"
          variant="secondary">
          <TrashIcon size={24} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc muốn xoá sản phẩm này?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xoá vĩnh viễn chức vụ{" "}
            <span className="font-bold text-stone-800 italic">
              {position.position_name}
            </span>
            . Bạn có chắc chắn muốn tiếp tục?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="hover:bg-gray-700 hover:text-gray-50">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              disabled={isPendding}
              onClick={handleDeletePosition}
              className="bg-red-700 hover:bg-red-800">
              Xác nhận
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
