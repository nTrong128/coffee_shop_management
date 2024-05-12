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
} from "@/components/ui/alert-dialog";
import {FileEditIcon, Info, TrashIcon, User as UserIcon} from "lucide-react";

import {CustomerType} from "@/types";
import {useEffect, useState, useTransition} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {AddCustomerSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {FormError} from "@/components/auth/error-form";
import {getAllCustomer} from "@/actions/getCustomer";
import {addCustomer} from "@/actions/addCustomer";
import {UpdateCustomer} from "@/actions/updateCustomer";
import {useRouter} from "next/navigation";
import {useToast} from "@/components/ui/use-toast";
import {DeleteCustomer} from "@/actions/deleteCustomer";

export default function UserPage() {
  const router = useRouter();
  const [data, setData] = useState<CustomerType[]>([]);
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);
  const {toast} = useToast();
  const getData = async () => {
    try {
      const response = await getAllCustomer();
      const data = response.data as CustomerType[];
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
  const [openAddCustomerDialog, setOpenAddCustomerDialog] = useState(false);
  const [selected, setSelected] = useState<CustomerType | null>(null);

  const [error, setError] = useState<string | undefined>("");
  const [isPendding, startTransition] = useTransition();
  const [searchText, setSearchText] = useState("");
  const filteredData = data.filter((customer) => {
    return (
      customer.customer_name.toLowerCase().includes(searchText.toLowerCase()) ||
      customer.customer_phone?.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  const form = useForm<z.infer<typeof AddCustomerSchema>>({
    resolver: zodResolver(AddCustomerSchema),
    defaultValues: {
      customer_name: "",
      customer_phone: "",
    },
  });

  const editDetailForm = useForm<z.infer<typeof AddCustomerSchema>>({
    resolver: zodResolver(AddCustomerSchema),
    defaultValues: {
      customer_name: selected?.customer_name,
      customer_phone: selected?.customer_phone,
      customer_point: selected?.customer_point,
    },
  });

  useEffect(() => {
    if (selected) {
      editDetailForm.setValue("customer_name", selected?.customer_name || "");
      editDetailForm.setValue("customer_phone", selected?.customer_phone || "");
      editDetailForm.setValue("customer_point", selected?.customer_point || 0);
    } else {
      editDetailForm.reset();
    }
  }, [editDetailForm, selected]);
  const onSubmitAddUser = (values: z.infer<typeof AddCustomerSchema>) => {
    setError("");

    startTransition(() => {
      addCustomer(values).then((data) => {
        setError(data.error);
        if (data.success) {
          form.reset();
          setOpenAddCustomerDialog(false);
          getData();
          setError("");
          toast({
            title: "Thành công",
            description: "Tạo khách hàng mới thành công.",
          });
        }
      });
    });
  };
  const onSubmitDeleteUser = (userID: string) => {
    setError("");

    startTransition(() => {
      DeleteCustomer(userID).then((data) => {
        setError(data.error);
        if (data.success) {
          form.reset();
          setOpenDeleteDialog(false);

          setError("");
          toast({
            title: "Thành công",
            description: "Xóa khách hàng thành công.",
          });
        }
      });
    });
  };
  const onSubmitEditUser = (values: z.infer<typeof AddCustomerSchema>) => {
    setError("");

    startTransition(() => {
      UpdateCustomer(values, selected?.customer_id ?? "").then((data) => {
        setError(data.error);
        if (data.success) {
          SetOpenEditDialog(false);
          getData();
          setError("");
          toast({
            title: "Thành công",
            description: "Cập nhật khách hàng thành công.",
          });
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
            <CardTitle>Quản lý khách hàng</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <Button
              onClick={() => {
                setOpenAddCustomerDialog(true);
              }}>
              Tạo khách hàng mới
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto">
          <Input
            type="text"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Tìm kiếm..."
            className="my-4 mx-2 w-full sm:w-5/12 rounded-full px-4 py-2 border border-gray-300 focus:ring-2"
          />
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[54px]">
                  <UserIcon className="scale-125" />
                </TableHead>
                <TableHead className="">Họ và Tên</TableHead>
                <TableHead className="">Số điện thoại</TableHead>
                <TableHead className="">Số điểm tích lũy</TableHead>
                <TableHead className="">Tác vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.slice(startIndex, endIndex).map((customer) => (
                <TableRow key={customer.customer_id}>
                  <TableCell className=""></TableCell>
                  <TableCell className="">{customer.customer_name}</TableCell>
                  <TableCell className="">{customer.customer_phone}</TableCell>
                  <TableCell className="">{customer.customer_point}</TableCell>

                  <TableCell className="w-[200px]">
                    <div className="flex items-center gap-x-2">
                      <Button
                        onClick={() => {
                          router.push(`/customer/${customer.customer_id}`);
                        }}
                        className="rounded-full text-green-700 bg-green-100"
                        size="icon"
                        variant="secondary">
                        <Info className="w-6 h-6" />
                      </Button>
                      <Button
                        onClick={() => {
                          setSelected(customer);
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
                          setSelected(customer);
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
      {/* DELETE  CUSTOMER DIALOG */}
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
              Bạn có chắc muốn xoá khách hàng này?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xoá vĩnh viễn người dùng{" "}
              <span className="font-bold text-stone-800 italic">
                {selected?.customer_name}
              </span>
              . Bạn có chắc chắn muốn tiếp tục?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <input type="hidden" value={selected?.customer_id} />
          <AlertDialogFooter>
            <form
              onSubmit={() => {
                onSubmitDeleteUser(selected?.customer_id ?? "");
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

      {/* ADD USER DIALOG */}
      <Dialog
        open={openAddCustomerDialog}
        onOpenChange={setOpenAddCustomerDialog}>
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
                  name="customer_name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Nguyễn Văn Tèo"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customer_phone"
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
                  Mã khách hàng:<b> {selected?.customer_id}</b>
                </div>
                <FormField
                  control={editDetailForm.control}
                  name="customer_name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Họ và Tên Khách Hàng</FormLabel>
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
                  name="customer_phone"
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
                  name="customer_point"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Số điểm tích lũy</FormLabel>
                      <FormControl>
                        <Input type="number" disabled={isPendding} {...field} />
                      </FormControl>
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
