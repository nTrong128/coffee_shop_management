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
import {resetPassword} from "@/actions/changePassword";

export function ResetPassword(prop: {user: UserType}) {
  const [open, setOpen] = useState(false);
  const user = prop.user;
  const [isPendding, setPendding] = useState(false);
  const {toast} = useToast();

  const handleDeletePosition = async () => {
    setPendding(true);
    const res = resetPassword(user.username as string);
    const data = await res;
    if (data.success) {
      toast({
        title: "Xoá chức vụ thành công",
        description: `Tài khoản ${user.username} của ${user.name} đã được khôi phục mật khẩu mặc định`,
      });
      setOpen(false);
      setPendding(false);
      return;
    }
    toast({
      title: "Xoá chức vụ thất bại",
      description: `Đã có lỗi xảy ra khi khôi phục mật khẩu tài khoản ${user.username}`,
    });
    setPendding(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          className="rounded-full text-green-700 bg-green-100"
          variant="secondary">
          Reset Password
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Bạn có chắc muốn khôi phục mật khẩu tài khoản này?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Hành động này sẽ khôi phục mật khẩu mặc định cho tài khoản{" "}
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
              className="bg-green-700 hover:bg-green-800">
              Xác nhận
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
