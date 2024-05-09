"use client";
import {changePassword} from "@/actions/changePassword";
import {FormError} from "@/components/auth/error-form";
import {Button} from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {ChangePasswordSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useToast} from "@/components/ui/use-toast";

export function ChangePasswordForm(prop: {
  username: string;
  setOpen: (open: boolean) => void;
}) {
  const username = prop.username;
  const setOpen = prop.setOpen;

  const {toast} = useToast();
  const [isPendding, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const formChangePassword = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
  });
  const onSubmit = async (values: z.infer<typeof ChangePasswordSchema>) => {
    setError("");

    startTransition(async () => {
      changePassword(values, username).then((data) => {
        setError(data.error);
        if (data.success) {
          formChangePassword.reset();
          setError("");
          setOpen(false);
          toast({
            title: "Thành công",
            description: "Mật khẩu đã được thay đổi.",
          });
        } else {
          toast({
            title: "Lỗi",
            description: "Đã có lỗi xảy ra.",
          });
        }
      });
    });
  };

  return (
    <Form {...formChangePassword}>
      <form onSubmit={formChangePassword.handleSubmit(onSubmit)}>
        <FormField
          control={formChangePassword.control}
          name="old_password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Mật khâu cũ</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  disabled={isPendding}
                  placeholder="************"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formChangePassword.control}
          name="new_password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Mật khâu mới</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  disabled={isPendding}
                  placeholder="************"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formChangePassword.control}
          name="retype_password"
          render={({field}) => (
            <FormItem>
              <FormLabel>Nhập lại mật khẩu:</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  disabled={isPendding}
                  placeholder="************"
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
          Cập nhật
        </Button>
      </form>
    </Form>
  );
}
