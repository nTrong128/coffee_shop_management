"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";

import {GiftType, PositionType} from "@/types";
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
import {useToast} from "@/components/ui/use-toast";
import {DeleteGiftById} from "@/actions/gift";

export function DeleteExchageDialog(prop: {gift: GiftType}) {
  const [open, setOpen] = useState(false);
  const gift = prop.gift;
  const [isPendding, setPendding] = useState(false);
  const {toast} = useToast();

  const handleDeletePosition = async () => {
    setPendding(true);
    const res = DeleteGiftById(gift.gift_id);
    const data = await res;
    if (data.success) {
      toast({
        title: "Xoá quà thành công",
        description: `Quà ${gift.gift_name} đã được xoá khỏi hệ thống`,
      });
      setOpen(false);
      return;
    }
    toast({
      title: "Xoá quà thất bại",
      description: `Đã có lỗi xảy ra khi xoá chức vụ ${gift.gift_name}`,
    });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-full text-red-700 bg-red-100"
          variant="secondary">
          Xóa
          <TrashIcon size={24} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc muốn xoá sản phẩm này?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ xoá vĩnh viễn quà{" "}
            <span className="font-bold text-stone-800 italic">
              {gift.gift_name}
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
