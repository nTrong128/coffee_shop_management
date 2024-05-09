"use client";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/auth/error-form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddPositionSchema} from "@/schemas";
import {AddPosition} from "@/actions/Position";
import {useState, useTransition} from "react";
import {z} from "zod";
import {useToast} from "@/components/ui/use-toast";
export default function AddPositionForm(prop: {
  setOpen: (open: boolean) => void;
}) {
  const setOpen = prop.setOpen;
  const form = useForm<z.infer<typeof AddPositionSchema>>({
    resolver: zodResolver(AddPositionSchema),
  });
  const [isPendding, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const {toast} = useToast();

  const onSubmit = async (values: z.infer<typeof AddPositionSchema>) => {
    setError("");

    startTransition(async () => {
      AddPosition(values).then((data) => {
        setError(data.error);
        if (data.success) {
          setError("");
          setOpen(false);
          toast({
            title: "Thành công",
            description: data.success,
          });
          return;
        }
        toast({
          title: "Lỗi",
          description: data.error,
        });
      });
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="position_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tên chức vụ</FormLabel>
              <FormControl>
                <Input disabled={isPendding} {...field} placeholder="Quản lý" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="position_desc"
          render={({field}) => (
            <FormItem>
              <FormLabel>Ghi chú</FormLabel>
              <FormControl>
                <Input
                  disabled={isPendding}
                  {...field}
                  placeholder="Quản lý cửa hàng"
                  type="text"
                  step="1000"
                  min="0"
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
  );
}
