"use client";
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
import {UpdatePersonalInformation} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import {useState, useTransition} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useToast} from "@/components/ui/use-toast";
import {UserType} from "@/types";
import {UpdatePersonal} from "@/actions/UpdatePersonalInformation";
import {Textarea} from "@/components/ui/textarea";
import {formatDateISO} from "@/lib/DateTime";

export function ChangePersonalInformationForm(prop: {
  user: UserType;
  setOpen: (open: boolean) => void;
}) {
  const user = prop.user;
  const setOpen = prop.setOpen;

  const {toast} = useToast();
  const [isPendding, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const formUpdatePersonal = useForm<z.infer<typeof UpdatePersonalInformation>>(
    {
      resolver: zodResolver(UpdatePersonalInformation),
      defaultValues: {
        name: user.name,
        email: user.email,
        user_address: user.user_address,
        user_birth: formatDateISO(user.user_birth),
        user_phone: user.user_phone,
      },
    }
  );
  const onSubmit = async (
    values: z.infer<typeof UpdatePersonalInformation>
  ) => {
    console.log(values);
    setError("");

    startTransition(async () => {
      UpdatePersonal(values, user.username as string).then((data) => {
        setError(data.error);
        if (data.success) {
          setError("");
          setOpen(false);
          toast({
            title: "Thành công",
            description: "Cập nhật thông tin cá nhân thành công.",
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
    <Form {...formUpdatePersonal}>
      <form onSubmit={formUpdatePersonal.handleSubmit(onSubmit)}>
        <FormField
          control={formUpdatePersonal.control}
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Họ và Tên</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  {...field}
                  disabled={isPendding}
                  placeholder="Lê Nhật Trọng"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formUpdatePersonal.control}
          name="email"
          render={({field}) => (
            <FormItem>
              <FormLabel>Địa chỉ Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  {...field}
                  disabled={isPendding}
                  placeholder="lenhattrong12_08@gmail.com"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formUpdatePersonal.control}
          name="user_address"
          render={({field}) => (
            <FormItem>
              <FormLabel>Địa chỉ</FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  disabled={isPendding}
                  placeholder="Ninh Kiều, Cần Thơ"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={formUpdatePersonal.control}
          name="user_birth"
          render={({field}) => (
            <FormItem>
              <FormLabel>Ngày sinh</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  disabled={isPendding}
                  placeholder="12/08/2000"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={formUpdatePersonal.control}
          name="user_phone"
          render={({field}) => (
            <FormItem>
              <FormLabel>Số điện thoại</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  disabled={isPendding}
                  placeholder="0939706130"
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
