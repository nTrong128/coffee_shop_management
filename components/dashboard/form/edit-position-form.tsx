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
import {UpdatePosition} from "@/actions/Position";
import {useState, useTransition} from "react";
import {z} from "zod";
import {PositionType} from "@/types";
import {useToast} from "@/components/ui/use-toast";
export default function UpdatePositionForm(prop: {
  setOpen: (open: boolean) => void;
  position: PositionType;
}) {
  const setOpen = prop.setOpen;
  const position = prop.position;
  const {toast} = useToast();
  const form = useForm<z.infer<typeof AddPositionSchema>>({
    resolver: zodResolver(AddPositionSchema),
    defaultValues: {
      position_name: position.position_name,
      position_desc: position.position_desc,
    },
  });
  const [isPendding, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");

  const onSubmit = async (values: z.infer<typeof AddPositionSchema>) => {
    console.log(values);
    setError("");

    startTransition(async () => {
      UpdatePosition(values, position.position_id).then((data) => {
        setError(data.error);
        if (data.success) {
          setError("");
          setOpen(false);
          toast({
            title: "Cập nhật chức vụ thành công",
            description: "Chức vụ đã được cập nhật thành công",
          });
        }
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
