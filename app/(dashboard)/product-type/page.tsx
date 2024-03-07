"use client";
import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {FileEditIcon, List, TrashIcon} from "lucide-react";
import {getAllProductTypes} from "@/actions/getProductType";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {useEffect, useRef, useState, useTransition} from "react";
import {ProductType_Type} from "@/types";
import {DeleteProdcutType} from "@/actions/deleteProductType";
import {FormError} from "@/components/auth/error-form";
import {FormSuccess} from "@/components/auth/success-form";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {AddProductTypeSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {set, z} from "zod";
import {EditProductType} from "@/actions/editProductType";
import {Textarea} from "@/components/ui/textarea";
import {addProductType} from "@/actions/addProductType";
const Product = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPendding, startTransition] = useTransition();
  const [data, setData] = useState<ProductType_Type[]>([]);
  const getData = async () => {
    try {
      const response = await getAllProductTypes();
      const data = response.data as ProductType_Type[];
      setData(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddTypeDialog, setOpenAddTypeDialog] = useState(false);
  const [selected, setSelected] = useState<ProductType_Type | null>(null);
  const handleDeleteDialog = (ProductType: ProductType_Type) => {
    setSelected(ProductType);
    setOpen(true);
  };
  const handleEditDialog = (ProductType: ProductType_Type) => {
    setSelected(ProductType);
    setOpenEditDialog(true);
  };
  const handleAddTypeDialog = () => {
    setOpenAddTypeDialog(true);
  };
  const handleDeleteProductType = async (id: string) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      DeleteProdcutType(id).then((data) => {
        setError(data.error);
        setSuccess(data.success);

        if (data.success) {
          setOpen(false);
          getData();

          setError("");
          setSuccess("");
        }
      });
    });
  };

  const form = useForm<z.infer<typeof AddProductTypeSchema>>({
    resolver: zodResolver(AddProductTypeSchema),
    defaultValues: {
      name: selected?.product_type_name,
      desc: selected?.product_type_desc,
    },
  });
  const formAddType = useForm<z.infer<typeof AddProductTypeSchema>>({
    resolver: zodResolver(AddProductTypeSchema),
    defaultValues: {
      name: "",
      desc: "",
    },
  });
  const onSubmitAddTypeDialog = (
    values: z.infer<typeof AddProductTypeSchema>
  ) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addProductType(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setOpenAddTypeDialog(false);
          getData();
          formAddType.reset({name: "", desc: ""});
          setError("");
          setSuccess("");
        }
      });
    });
  };
  useEffect(() => {
    if (selected) {
      // Update form values only when selected product type is available
      form.setValue("name", selected.product_type_name || "");
      form.setValue("desc", selected.product_type_desc || "");
    } else {
      // Clear form values when no product type is selected
      form.reset({name: "", desc: ""});
    }
  }, [form, selected]);
  const onsubmit = (values: z.infer<typeof AddProductTypeSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      EditProductType(values, selected?.product_type_id as string).then(
        (data) => {
          setError(data.error);
          setSuccess(data.success);
          if (data.success) {
            setOpenEditDialog(false);
            getData();
            setError("");
            setSuccess("");
          }
        }
      );
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <List />
            <CardTitle>Quản lý loại món</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            {/* <AddProductTypeDialog /> */}
            <Button onClick={handleAddTypeDialog}>Thêm loại món</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Tên Loại</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead className="w-[250px]">Tác Vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((product_type) => (
                <TableRow key={product_type.product_type_id}>
                  <TableCell>{product_type.product_type_name}</TableCell>
                  <TableCell>{product_type.product_type_desc}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      className="rounded-full text-blue-700 bg-blue-100"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        handleEditDialog(product_type);
                      }}>
                      <FileEditIcon className="w-6 h-6" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      className="rounded-full text-red-700 bg-red-100"
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        handleDeleteDialog(product_type);
                      }}>
                      <TrashIcon className="w-6 h-6" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

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
              Bạn có chắc muốn xoá loại sản phẩm này?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xoá vĩnh viễn loại{" "}
              <span className="font-bold text-stone-800 italic">
                {selected?.product_type_name}
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
                onClick={() =>
                  handleDeleteProductType(selected?.product_type_id as string)
                }
                className="bg-red-700 hover:bg-red-800">
                Xác nhận
              </Button>
            </AlertDialogAction>
            <FormError message={error} />
            <FormSuccess message={success} />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Dialog
        open={openEditDialog}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return;
          setSelected(null);
          setOpenEditDialog(false);
        }}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onsubmit)}>
                <div className="my-4">
                  Tên loại:<b>{selected?.product_type_name}</b>
                </div>

                <FormField
                  control={form.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên loại</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Cà Phê"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="desc"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Mô tả loại</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPendding}
                          {...field}
                          placeholder="Mô tả loại sản phẩm"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
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
      <Dialog open={openAddTypeDialog} onOpenChange={setOpenAddTypeDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Thêm loại món mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Form {...formAddType}>
              <form onSubmit={formAddType.handleSubmit(onSubmitAddTypeDialog)}>
                <FormField
                  control={formAddType.control}
                  name="name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên loại món</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Tên loại món"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formAddType.control}
                  name="desc"
                  render={({field}) => (
                    <FormItem className="mt-4">
                      <FormLabel>Mô tả loại món</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPendding}
                          {...field}
                          placeholder="Mô tả loại món"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormError message={error} />
                <FormSuccess message={success} />
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
    </main>
  );
};

export default Product;
