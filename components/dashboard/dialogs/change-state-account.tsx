"use client";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {UserType} from "@/types";

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
import {changeStateAccount} from "@/actions/changePassword";
import {CheckCircle, XCircle} from "lucide-react";

export function ChangeStateAccount(prop: {
  user: UserType;
  getData: () => void;
}) {
  const getData = prop.getData;
  const [open, setOpen] = useState(false);
  const user = prop.user;
  const [isPendding, setPendding] = useState(false);
  const {toast} = useToast();

  const newState = user.user_status ? "KHÓA" : "MỞ KHÓA";

  const handleDeletePosition = async () => {
    setPendding(true);
    const res = changeStateAccount(user.username as string);
    const data = await res;
    if (data.success) {
      toast({
        title: "Đổi trạng thái thành công",
        description: `Tài khoản ${user.username} của ${user.name} đã được ${newState} thành công.`,
      });
      setOpen(false);
      setPendding(false);
      getData();
      return;
    }
    toast({
      title: "Thất bại",
      description: data.error || "Đã có lỗi xảy ra, vui lòng thử lại sau.",
    });
    setPendding(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="rounded-full" variant="secondary">
          {(user.user_status && <CheckCircle className="text-green-500" />) || (
            <XCircle className="text-red-500" />
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc muốn thay {newState} tài khoản này?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ {newState} tài khoản{" "}
            <span className=" font-bold text-stone-800">{user.username}</span>{" "}
            của{" "}
            <span className=" font-bold text-stone-800 italic">
              {user.name}
            </span>{" "}
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
              className="bg-blue-700 hover:bg-blue-800">
              Xác nhận
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
