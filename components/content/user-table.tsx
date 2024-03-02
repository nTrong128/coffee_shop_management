"use client";
import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import AddUserDialog from "@/components/user/add-user-dialog";
import {CheckCircle, User as UserIcon} from "lucide-react";
import {getAllUser} from "@/actions/getAllUser";
import {UserType} from "@/types";
import {useEffect, useState} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import formatDate from "@/lib/formatDate";

export function UserTable() {
  const rowsPerPage = 4;
  const [data, setData] = useState<UserType[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const getData = async () => {
    try {
      const response = await getAllUser();
      const data = response.data as UserType[];
      console.log(38, data);
      setData(data);
    } catch (error) {
      console.log("Error fetcghing data", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<UserType | null>(null);
  const handleDeleteDialog = (User: UserType) => {
    setSelected(User);
    setOpen(true);
  };
  const [openDialog, setOpenDialog] = useState(false);
  const handleDetailDialog = (User: UserType) => {
    setSelected(User);
    setOpenDialog(true);
  };
  return (
    <div className="m-y-4 mx-10 flex flex-col">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <UserIcon></UserIcon>
            <CardTitle>Quản lý người dùng</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <AddUserDialog />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className=" text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Chức vụ</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(startIndex, endIndex).map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="text-center">{user.name}</TableCell>

                  <TableCell className="text-center">{user.email}</TableCell>

                  <TableCell className="text-center">{user.role}</TableCell>
                  <TableCell className="text-center flex justify-center">
                    <CheckCircle className="text-green-500"></CheckCircle>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-x-2">
                      <Button
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={() => {
                          handleDeleteDialog(user);
                        }}>
                        Xóa
                      </Button>
                      <Button
                        className=""
                        onClick={() => {
                          handleDetailDialog(user);
                        }}>
                        Chi tiết
                      </Button>
                      <Button>Chỉnh sửa</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <AlertDialog
            open={open}
            onOpenChange={(isOpen) => {
              if (isOpen === true) return;
              setSelected(null);
              setOpen(false);
            }}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Bạn có chắc muốn xoá người dùng này?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Hành động này sẽ xoá vĩnh viễn người dùng{" "}
                  <span className="font-bold text-stone-800 italic">
                    {selected?.name}
                  </span>
                  . Bạn có chắc chắn muốn tiếp tục?
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="hover:bg-gray-700 hover:text-gray-50">
                  Hủy
                </AlertDialogCancel>
                <AlertDialogAction className="bg-red-700 hover:bg-red-800">
                  Xác nhận
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Dialog
            open={openDialog}
            onOpenChange={(isOpen) => {
              if (isOpen === true) return;
              setSelected(null);
              setOpenDialog(false);
            }}>
            <DialogContent className="sm:max-w-3xl">
              <DialogHeader>
                <div />
                <DialogTitle className="text-2xl">{selected?.name}</DialogTitle>
                <DialogDescription>
                  Thông tin chi tiết của {selected?.name}.
                </DialogDescription>
              </DialogHeader>
              <div className="flex items-center gap-4 py-2">
                <Image
                  alt="User profile image"
                  className="rounded-full"
                  height="96"
                  src={
                    selected?.image || "/public/images/placeholderAvatar.jpg"
                  }
                  style={{
                    aspectRatio: "96/96",
                    objectFit: "cover",
                  }}
                  width="96"
                />
                <div className="grid gap-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-medium">{selected?.name}</h3>
                    <Badge>{selected?.role}</Badge>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {selected?.username}
                  </p>
                </div>
              </div>
              <div className="border-t border-b border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-2 gap-6 p-6">
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="name">
                      Họ và Tên
                    </Label>
                    <p>{selected?.name}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="username">
                      Tên tài khoản
                    </Label>
                    <p>{selected?.username}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="role">
                      Chức vụ
                    </Label>
                    <p>{selected?.role}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="address">
                      Địa chỉ
                    </Label>
                    <p>{selected?.user_address}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="phone">
                      Số điện thoại
                    </Label>
                    <p>{selected?.user_phone}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="birthday">
                      Ngày tháng năm sinh
                    </Label>
                    <p>{formatDate(selected?.user_birth)}</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm" htmlFor="wage-rate">
                      Hệ số lương
                    </Label>
                    <p>{selected?.wage_rate}</p>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button>Đóng</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          {/* DIALOG  */}

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                {/* // TODO: ADD BUTTON PAGINATION{(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)} */}
                <PaginationPrevious
                  className={
                    startIndex === 0
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                  onClick={() => {
                    if (startIndex > 0) {
                      setStartIndex(startIndex - rowsPerPage);
                      setEndIndex(endIndex - rowsPerPage);
                    }
                  }}
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className={
                    endIndex >= data.length
                      ? "pointer-events-none opacity-50"
                      : undefined
                  }
                  onClick={() => {
                    if (endIndex < data.length) {
                      setStartIndex(startIndex + rowsPerPage);
                      setEndIndex(endIndex + rowsPerPage);
                    }
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardContent>
      </Card>
    </div>
  );
}
