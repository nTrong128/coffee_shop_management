"use client";
import {addSpending} from "@/actions/spending";
import {auth} from "@/auth";
import {FormError} from "@/components/auth/error-form";
import {Button} from "@/components/ui/button";
import {Dialog, DialogHeader, DialogTrigger} from "@/components/ui/dialog";
import {DialogContent, DialogTitle} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {useCurrentUser} from "@/hooks/use-current-user";
import {AddSpendingSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

export function SpendModal() {
  const [open, setOpen] = useState(false);
  const user = useCurrentUser();
  const [isPendding, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const formAddSpending = useForm<z.infer<typeof AddSpendingSchema>>({
    resolver: zodResolver(AddSpendingSchema),
  });
  const onSubmit = async (values: z.infer<typeof AddSpendingSchema>) => {
    console.log(values);
    setError("");
    if (user) {
      values.spending_creator = user.id;
    }
    startTransition(async () => {
      addSpending(values).then((data) => {
        setError(data.error);
        if (data.success) {
          formAddSpending.reset();
          setError("");
          setOpen(false);
        }
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button>Thêm chi tiêu mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-screen">
        <DialogHeader>
          <DialogTitle>Thêm chi tiêu mới vào hệ thống</DialogTitle>
        </DialogHeader>
        <Form {...formAddSpending}>
          <form onSubmit={formAddSpending.handleSubmit(onSubmit)}>
            <FormField
              control={formAddSpending.control}
              name="spending_name"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPendding}
                      {...field}
                      placeholder="Chi mua cà phê"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formAddSpending.control}
              name="spending_price"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Đơn giá</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isPendding}
                      {...field}
                      placeholder="10000đ"
                      type="number"
                      step="1000"
                      min="0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formAddSpending.control}
              name="spending_desc"
              render={({field}) => (
                <FormItem>
                  <FormLabel>Nội dung</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isPendding}
                      {...field}
                      placeholder="Chi tiêu cho cà phê sáng"
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
      </DialogContent>
    </Dialog>
  );
}
