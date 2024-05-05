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
import {
  CheckCircle,
  FileEditIcon,
  Info,
  TrashIcon,
  User as UserIcon,
  XCircle,
} from "lucide-react";
import {getAllUser} from "@/actions/getAllUser";
import {PositionType, Role, UserType} from "@/types";
import {useEffect, useState, useTransition} from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {Label} from "@/components/ui/label";
import {Badge} from "@/components/ui/badge";
import Image from "next/image";
import {formatDate, formatDateISO} from "@/lib/DateTime";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {FaUser} from "react-icons/fa";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import UpdateAvatarForm from "@/components/shared/AvatarUpdateForm";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {AddUserSchema, UpdateUserSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {addNewUser} from "@/actions/addUser";
import {FormError} from "@/components/auth/error-form";
import {DeleteUser} from "@/actions/deleteUser";
import {UpdateUser} from "@/actions/editUser";
import {getAllPosition} from "@/actions/Position";

export default function UserPage() {
  const rowsPerPage = 4;
  const [data, setData] = useState<UserType[]>([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const [position, setPosition] = useState<PositionType[]>([]);

  const getData = async () => {
    try {
      const response = await getAllUser();
      const data = response.data as UserType[];

      const position = await getAllPosition();
      const positionData = position.data;

      setPosition(positionData as PositionType[]);
      setData(data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, SetOpenEditDialog] = useState(false);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [selected, setSelected] = useState<UserType | null>(null);

  const [error, setError] = useState<string | undefined>("");
  const [isPendding, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddUserSchema>>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      wage_rate: 1.0,
      role: "USER",
      user_address: "",
      user_birth: "",
      user_phone: "",
      password: "123ABCxyz@",
    },
  });

  const editDetailForm = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: selected?.name,
      user_phone: selected?.user_phone,
      user_address: selected?.user_address,
      user_birth: formatDate(selected?.user_birth?.toISOString()),
      email: selected?.email,
      role: selected?.role,
    },
  });

  useEffect(() => {
    if (selected) {
      // Update form values only when selected product is available
      editDetailForm.setValue("name", selected?.name || "");
      editDetailForm.setValue("user_phone", selected?.user_phone || "");
      editDetailForm.setValue("user_address", selected?.user_address || "");
      editDetailForm.setValue(
        "user_birth",
        formatDateISO(selected?.user_birth) || ""
      );
      editDetailForm.setValue("email", selected?.email || "");
      editDetailForm.setValue("role", selected?.role || undefined);
      editDetailForm.setValue("position_id", selected?.Position.position_id);
      editDetailForm.setValue("wage_rate", selected?.wage_rate || 1.0);
    } else {
      // Clear form values when no product type is selected
      editDetailForm.reset();
    }
  }, [editDetailForm, selected]);
  const onSubmitAddUser = (values: z.infer<typeof AddUserSchema>) => {
    setError("");

    startTransition(() => {
      addNewUser(values).then((data) => {
        setError(data.error);
        if (data.success) {
          form.reset();
          setOpenAddUserDialog(false);
          getData();
          setError("");
        }
      });
    });
  };
  const onSubmitDeleteUser = (userID: string) => {
    setError("");

    startTransition(() => {
      DeleteUser(userID).then((data) => {
        setError(data.error);
        if (data.success) {
          form.reset();
          setOpenDeleteDialog(false);
          getData();
          setError("");
        }
      });
    });
  };
  const onSubmitEditUser = (values: z.infer<typeof UpdateUserSchema>) => {
    setError("");

    startTransition(() => {
      UpdateUser(values, selected?.username ?? "").then((data) => {
        setError(data.error);
        if (data.success) {
          SetOpenEditDialog(false);
          getData();
          setError("");
        }
      });
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <UserIcon></UserIcon>
            <CardTitle>Quản lý người dùng</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <Button
              onClick={() => {
                setOpenAddUserDialog(true);
              }}>
              Tạo người dùng mới
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead></TableHead>
                <TableHead>Họ và Tên</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Chức Vụ</TableHead>
                <TableHead>Loại tài khoản</TableHead>
                <TableHead>Trạng Thái</TableHead>
                <TableHead>Tác Vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.slice(startIndex, endIndex).map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>
                        <FaUser />
                      </AvatarFallback>
                    </Avatar>
                  </TableCell>
                  <TableCell className="">{user.name}</TableCell>
                  <TableCell className="">{user.email}</TableCell>
                  <TableCell className="">
                    {user.Position ? user.Position.position_name : "Chưa có"}
                  </TableCell>
                  <TableCell className="">{user.role}</TableCell>
                  <TableCell className="pl-10">
                    {(user.user_status && (
                      <CheckCircle className="text-green-500" />
                    )) || <XCircle className="text-red-500" />}
                  </TableCell>
                  <TableCell className="w-[100px]">
                    <div className="flex items-center gap-x-2">
                      <Button
                        className="rounded-full text-blue-700 bg-blue-100"
                        size="icon"
                        variant="secondary"
                        onClick={() => {
                          setSelected(user);
                          setOpenDetailDialog(true);
                        }}>
                        <Info className="w-6 h-6" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelected(user);
                          SetOpenEditDialog(true);
                        }}
                        className="rounded-full text-blue-700 bg-blue-100"
                        size="icon"
                        variant="secondary">
                        <FileEditIcon className="w-6 h-6" />
                      </Button>

                      <Button
                        className="rounded-full text-red-700 bg-red-100"
                        size="icon"
                        variant="secondary"
                        onClick={() => {
                          setSelected(user);
                          setOpenDeleteDialog(true);
                        }}>
                        <TrashIcon className="w-6 h-6" />
                      </Button>
                      {/* //TODO Add revalidate data */}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
      {/* DELETE  USER DIALOG */}
      <AlertDialog
        open={openDeleteDialog}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return;
          setSelected(null);
          setOpenDeleteDialog(false);
          getData();
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
          <input type="hidden" value={selected?.id} />
          <AlertDialogFooter>
            <form
              onSubmit={() => {
                onSubmitDeleteUser(selected?.id ?? "");
              }}>
              <AlertDialogCancel className="hover:bg-gray-700 hover:text-gray-50">
                Hủy
              </AlertDialogCancel>
              <Button
                disabled={isPendding}
                type="submit"
                className="bg-red-700 hover:bg-red-800">
                Xác nhận
              </Button>
            </form>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {/*USER's DETAIL DIALOG */}
      <Dialog
        open={openDetailDialog}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return;
          setSelected(null);
          setOpenDetailDialog(false);
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
              src={selected?.image || "/images/placeholderAvatar.jpg"}
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
                <Label className="text-sm" htmlFor="birthday">
                  Chức vụ
                </Label>

                <p>
                  {selected?.Position
                    ? selected?.Position.position_name
                    : "Chưa có"}
                </p>
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
      {/* ADD USER DIALOG */}
      <Dialog open={openAddUserDialog} onOpenChange={setOpenAddUserDialog}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Thêm nhân viên mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin người dùng để thêm họ vào hệ thống
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmitAddUser)}>
                <FormField
                  control={form.control}
                  name="username"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="username123444"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Họ và Tên</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Nguyễn Văn A"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user_phone"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="0987654321"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user_address"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Cầu Giấy, Hà Nội"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="user_birth"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Ngày tháng năm sinh</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          disabled={isPendding}
                          {...field}
                          placeholder="01/01/2000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="hidden">Mật khẩu</FormLabel>
                      <FormControl>
                        <Input
                          className="hidden"
                          type="password"
                          disabled={isPendding}
                          {...field}
                          placeholder="********"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isPendding}
                          {...field}
                          placeholder="nguyen123@gmail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="wage_rate"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel className="hidden">Hệ số lương</FormLabel>
                      <FormControl>
                        <Input
                          className="hidden"
                          type="number"
                          disabled={isPendding}
                          {...field}
                          placeholder="1.0"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Loại tài khoản</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={isPendding} {...field}>
                            <SelectValue placeholder="Chọn chức vụ" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Chọn loại</SelectLabel>
                            <SelectItem value={Role.ADMIN}>Quản lý</SelectItem>
                            <SelectItem value={Role.USER}>Nhân viên</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="italic p-2">**Mật khẩu mặc định là: 123ABCxyz@</p>
                <FormError message={error} />
                <Button
                  disabled={isPendding}
                  type="submit"
                  size="lg"
                  className=" mt-6 w-full">
                  Thêm
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
      {/* EDIT USER DIALOG */}
      <Dialog open={openEditDialog} onOpenChange={SetOpenEditDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
            <DialogDescription>
              Nhập thông tin người dùng cần chỉnh sửa
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Form {...editDetailForm}>
              <form onSubmit={editDetailForm.handleSubmit(onSubmitEditUser)}>
                <div className="my-4">
                  Tên tài khoản:<b> {selected?.username}</b>
                </div>
                <FormField
                  control={editDetailForm.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Họ và Tên</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Lê Nhật Trọng"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editDetailForm.control}
                  name="user_phone"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="0987654321"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editDetailForm.control}
                  name="user_address"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Địa chỉ</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Cầu Giấy, Hà Nội"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editDetailForm.control}
                  name="wage_rate"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Hệ số lương</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          type="number"
                          step={0.1}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editDetailForm.control}
                  name="user_birth"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Ngày tháng năm sinh</FormLabel>
                      <FormControl>
                        <Input type="date" disabled={isPendding} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editDetailForm.control}
                  name="email"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          disabled={isPendding}
                          {...field}
                          placeholder="nguyen123@gmail.com"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={editDetailForm.control}
                  name="role"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Quyền tài khoản</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={isPendding} {...field}>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Chọn quyền</SelectLabel>
                            <SelectItem value={Role.ADMIN}>ADMIN</SelectItem>
                            <SelectItem value={Role.USER}>USER</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editDetailForm.control}
                  name="position_id"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Chức vụ</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={isPendding} {...field}>
                            <SelectValue />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Chon chức vụ</SelectLabel>
                            {position.map((position: PositionType) => (
                              <SelectItem
                                key={position.position_id}
                                value={position.position_id}>
                                {position.position_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <Button
                  disabled={isPendding}
                  type="submit"
                  size="lg"
                  className=" mt-6 w-full">
                  Cập nhật
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
