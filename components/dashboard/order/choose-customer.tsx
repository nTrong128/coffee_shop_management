import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {CustomerType} from "@/types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Input} from "@/components/ui/input";
import {useState, useTransition} from "react";
import {Table, TableCell, TableRow} from "@/components/ui/table";
import {FormError} from "@/components/auth/error-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {z} from "zod";
import {useForm} from "react-hook-form";
import {AddCustomerSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {addCustomer} from "@/actions/addCustomer";
import {FormSuccess} from "@/components/auth/success-form";

export function ChooseCustomer(prop: {
  customer: CustomerType[];
  customerOrder: CustomerType | null;
  setCustomerOrder: (customer: CustomerType) => void;
}) {
  const customers = prop.customer;
  const customer = prop.customerOrder;
  const setCustomer = prop.setCustomerOrder;
  // const [customer, setCustomer] = useState<CustomerType | null>(null);
  const [searchText, setSearchText] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setSuccess("");
      setError("");
      form.reset();
      setSearchText("");
    }
    setOpen(newOpen);
  };

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.customer_name.includes(searchText) ||
      (customer.customer_phone && customer.customer_phone.includes(searchText))
  );

  const form = useForm<z.infer<typeof AddCustomerSchema>>({
    resolver: zodResolver(AddCustomerSchema),
    defaultValues: {
      customer_name: "",
      customer_phone: "",
    },
  });
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPendding, startTransition] = useTransition();

  const onSubmitAddUser = (values: z.infer<typeof AddCustomerSchema>) => {
    setError("");

    startTransition(() => {
      addCustomer(values).then((data) => {
        setError(data.error);
        if (data.success) {
          form.reset();
          setError("");
          setSuccess("Tạo khách hàng mới thành công.");
        }
      });
    });
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-green-950 text-white rounded-full  hover:bg-green-700 hover:text-white">
          {customer
            ? `${customer.customer_name} - ${customer.customer_phone}`
            : "Chọn khách hàng"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Chọn khách hàng</DialogTitle>
        <DialogDescription>Chọn hoặc tạo mới khách hàng</DialogDescription>
        <Tabs defaultValue="choose">
          <TabsList className="w-100 block justify-between">
            <TabsTrigger className="w-1/2" value="choose">
              Tìm khách hàng
            </TabsTrigger>
            <TabsTrigger className="w-1/2" value="create">
              Tạo mới
            </TabsTrigger>
          </TabsList>
          <TabsContent
            className="min-h-80 max-h-80 overflow-y-scroll"
            value="choose">
            <Input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
              type="text"
              placeholder="Tìm kiếm..."
              className="my-4 mx-auto w-5/6 rounded-2xl py-2 border border-gray-300 focus:ring-2"
            />
            <Table className="">
              {filteredCustomers.map((customer, index) => (
                <TableRow
                  key={customer.customer_id}
                  onClick={() => {
                    setCustomer(customer);
                    handleOpenChange(false);
                  }}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{customer.customer_name}</TableCell>
                  <TableCell>{customer.customer_phone}</TableCell>
                  <TableCell>{customer.customer_point}</TableCell>
                </TableRow>
              ))}
            </Table>
          </TabsContent>
          <TabsContent className="min-h-80" value="create">
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
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
