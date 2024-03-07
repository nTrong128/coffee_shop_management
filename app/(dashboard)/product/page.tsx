"use client";
import {CardTitle, CardHeader, Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";

import {List} from "lucide-react";
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
import {Product, ProductType_Type} from "@/types";
import {DeleteProduct} from "@/actions/deleteProduct";
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
import {AddProductSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Textarea} from "@/components/ui/textarea";
import {CoffeeCard} from "@/components/content/coffee-card";
import {getAllProducts} from "@/actions/getProduct";
import {addProduct} from "@/actions/addProduct";
import {EditProduct} from "@/actions/EditProduct";
import {getAllProductTypes} from "@/actions/getProductType";
const Product = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPendding, startTransition] = useTransition();
  const [data, setData] = useState<Product[]>([]);
  const [data_type, setData_type] = useState<ProductType_Type[]>([]);
  const getData = async () => {
    try {
      const response = await getAllProducts();
      const data = response.data as Product[];
      const response_type = await getAllProductTypes();
      const data_type = response_type.data;
      setData(data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const [open, setOpen] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [selected, setSelected] = useState<Product | null>(null);
  const handleDeleteDialog = (ProductType: Product) => {
    setSelected(ProductType);
    setOpen(true);
  };
  const handleEditDialog = (ProductType: Product) => {
    setSelected(ProductType);
    setOpenEditDialog(true);
  };
  const handleAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };
  const handleDeleteProduct = async (id: string) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      DeleteProduct(id).then((data) => {
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

  const form = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      product_name: selected?.product_name,
      product_desc: selected?.product_desc,
      product_price: selected?.product_price,
      product_type: selected?.product_type,
    },
  });
  const formAddType = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      product_name: "",
      product_price: 0,
      product_desc: "",
      product_type: "",
    },
  });
  const onSubmitAddTypeDialog = (values: z.infer<typeof AddProductSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addProduct(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setOpenAddProductDialog(false);
          getData();
          setError("");
          setSuccess("");
          formAddType.reset({
            product_name: "",
            product_desc: "",
            product_price: 0,
            product_type: "",
          });
        }
      });
    });
  };
  useEffect(() => {
    if (selected) {
      // Update form values only when selected product is available
      form.setValue("product_name", selected.product_name || "");
      form.setValue("product_desc", selected.product_desc || "");
      form.setValue("product_price", selected.product_price || 0);
      form.setValue("product_type", selected.product_type || "");
    } else {
      // Clear form values when no product type is selected
      form.reset({
        product_name: "",
        product_desc: "",
        product_price: 0,
        product_type: "",
      });
    }
  }, [form, selected]);
  const onsubmit = (values: z.infer<typeof AddProductSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      EditProduct(values, selected?.product_id as string).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setOpenEditDialog(false);
          getData();
          setError("");
          setSuccess("");
        }
      });
    });
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <List />
            <CardTitle>Quản lý món</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <Button onClick={handleAddProductDialog}>Thêm món</Button>
          </div>
        </CardHeader>
      </Card>
      <div className="flex gap-2 flex-wrap ">
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
        <CoffeeCard />
      </div>

      <AlertDialog
        open={open}
        onOpenChange={(isOpen) => {
          if (isOpen === true) return;
          setSelected(null);
          setOpen(false);
        }}>
        {/* DELETE PRODUCT DIALOG */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Bạn có chắc muốn xoá loại sản phẩm này?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xoá vĩnh viễn loại{" "}
              <span className="font-bold text-stone-800 italic">
                {selected?.product_name}
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
                  handleDeleteProduct(selected?.product_id as string)
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
      {/* EDIT PRODUCT DIALOG */}
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
                  Tên loại:<b>{selected?.product_name}</b>
                </div>

                <FormField
                  control={form.control}
                  name="product_name"
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
                  name="product_price"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên loại</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          disabled={isPendding}
                          {...field}
                          placeholder="20.000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product_type"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên loại</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Cà phê"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product_desc"
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
      {/* ADD PRODUCT DIALOG */}
      <Dialog
        open={openAddProductDialog}
        onOpenChange={setOpenAddProductDialog}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Thêm món mới</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Form {...formAddType}>
              <form onSubmit={formAddType.handleSubmit(onSubmitAddTypeDialog)}>
                <FormField
                  control={form.control}
                  name="product_name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên sản phẩm</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Cà Phê đen"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product_price"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Giá tiền</FormLabel>
                      <FormControl>
                        <div className="flex text-center justify-center items-center">
                          <Input
                            className="mr-4"
                            type="number"
                            step="1000"
                            disabled={isPendding}
                            {...field}
                            placeholder="20.000"
                          />
                          <span> VND </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="product_type"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên loại</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPendding}
                          {...field}
                          placeholder="Cà phê"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formAddType.control}
                  name="product_desc"
                  render={({field}) => (
                    <FormItem className="mt-4">
                      <FormLabel>Mô tả món</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPendding}
                          {...field}
                          placeholder="Mô tả món"
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
