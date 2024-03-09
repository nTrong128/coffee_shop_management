"use client";
import {CardTitle, CardHeader, Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {FileEditIcon, List, TrashIcon} from "lucide-react";
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
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
} from "@/components/ui/table";
import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import {Checkbox} from "@/components/ui/checkbox";
import {AddProductSchema} from "@/schemas";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Textarea} from "@/components/ui/textarea";
import {addProduct} from "@/actions/addProduct";
import {EditProduct} from "@/actions/EditProduct";
import {getAllProductTypeWithProducts} from "@/actions/getProductType";
import {useEffect, useState, useTransition} from "react";
import {Product, Type_ListProduct} from "@/types";
import {DeleteProduct} from "@/actions/deleteProduct";
import {formatCurrency} from "@/lib/formatCurrency";
import Image from "next/image";
import {useEdgeStore} from "@/lib/edgestore";

const Product = () => {
  const {edgestore} = useEdgeStore();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPendding, startTransition] = useTransition();
  const [data, setData] = useState<Type_ListProduct[]>([]);
  const getData = async () => {
    try {
      const response = await getAllProductTypeWithProducts();
      const data = response.data as Type_ListProduct[];
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
  const [selectedImage, setSelectedImage] = useState<any | File>();
  const handleDeleteDialog = (ProductType: Product) => {
    setSelected(ProductType);
    setOpen(true);
  };
  const handleEditDialog = (Product: Product) => {
    setSelected(Product);
    setOpenEditDialog(true);
  };
  const handleAddProductDialog = () => {
    setOpenAddProductDialog(true);
  };
  const handleDeleteProduct = async (id: string) => {
    setError("");

    startTransition(() => {
      DeleteProduct(id).then((data) => {
        setError(data.error);
        if (data.success) {
          setOpen(false);
          getData();
          setError("");
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
      product_image: selected?.product_image,
    },
  });
  const formAddProduct = useForm<z.infer<typeof AddProductSchema>>({
    resolver: zodResolver(AddProductSchema),
    defaultValues: {
      product_name: "",
      product_price: 0,
      product_desc: "",
      product_type: "",
      product_image: "",
    },
  });
  const onSubmitAddProductDialog = async (
    values: z.infer<typeof AddProductSchema>
  ) => {
    console.log(values, selectedImage);

    setError("");

    startTransition(async () => {
      if (selectedImage) {
        const res = await edgestore.publicFiles.upload({
          file: selectedImage as File,
        });
        values.product_image = res.url;
      }

      addProduct(values).then((data) => {
        setError(data.error);
        if (data.success) {
          setOpenAddProductDialog(false);
          getData();
          setError("");
          formAddProduct.reset();
          setSelectedImage(null);
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
      console.log(selected);
    } else {
      // Clear form values when no product type is selected
      form.reset();
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

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Checkbox />
            </TableHead>
            <TableHead></TableHead>
            <TableHead className="">Sản phẩm</TableHead>
            <TableHead>Mô tả</TableHead>
            <TableHead>Loại</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead className="w-[250px]">Tác vụ</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((productType) =>
            productType.product_list.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell className="items-center">
                  <Checkbox />
                </TableCell>
                <TableCell>
                  {(product.product_image && (
                    <Image
                      src={product.product_image}
                      alt="Product Image"
                      width={160}
                      height={160}
                    />
                  )) || <p>Không có ảnh</p>}
                </TableCell>
                <TableCell>{product.product_name}</TableCell>
                <TableCell>{product.product_desc}</TableCell>
                <TableCell>{productType.product_type_name}</TableCell>
                <TableCell>{formatCurrency(product.product_price)}</TableCell>
                <TableCell>
                  <Button
                    className="rounded-full text-blue-700 bg-blue-100 mx-2"
                    size="icon"
                    variant="ghost">
                    <FileEditIcon
                      className="w-6 h-6"
                      onClick={() => handleEditDialog(product)}
                    />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    className="rounded-full text-red-700 bg-red-100"
                    size="icon"
                    variant="ghost"
                    onClick={() => handleDeleteDialog(product)}>
                    <TrashIcon className="w-6 h-6" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
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
              Bạn có chắc muốn xoá sản phẩm này?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này sẽ xoá vĩnh viễn sản phẩm{" "}
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
                  Tên món:<b>{selected?.product_name}</b>
                </div>

                <FormField
                  control={form.control}
                  name="product_name"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên món</FormLabel>
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
                      <FormLabel>Giá tiền</FormLabel>
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
            <Form {...formAddProduct}>
              <form
                onSubmit={formAddProduct.handleSubmit(
                  onSubmitAddProductDialog
                )}>
                <FormField
                  control={formAddProduct.control}
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
                  control={formAddProduct.control}
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
                            placeholder="20000"
                          />
                          <span> VND </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formAddProduct.control}
                  name="product_type"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Tên loại</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger disabled={isPendding} {...field}>
                            <SelectValue placeholder="Chọn loại món" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Loại món</SelectLabel>
                            {data.map((type) => (
                              <SelectItem
                                key={type.product_type_id}
                                value={type.product_type_id}>
                                {type.product_type_name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formAddProduct.control}
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
                <FormField
                  control={formAddProduct.control}
                  name="product_image"
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Giá tiền</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          disabled={isPendding}
                          {...field}
                          onChange={imageChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {selectedImage && (
                  <Image
                    width={240}
                    height={240}
                    src={URL.createObjectURL(selectedImage)}
                    alt="Product Image Preview"
                  />
                )}
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
