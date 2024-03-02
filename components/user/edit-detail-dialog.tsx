"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {Input} from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {Role, UserType} from "@/types";
import {useForm} from "react-hook-form";
import {UpdateUserSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import React, {useState, useTransition} from "react";
import {addNewUser} from "@/actions/addUser";
import {FormError} from "@/components/auth/error-form";
import {FormSuccess} from "@/components/auth/success-form";
import formatDate from "@/lib/formatDate";
import {UpdateUser} from "@/actions/updateUser";
const EditUserDialog = ({user}: {user: UserType}) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPendding, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UpdateUserSchema>>({
    resolver: zodResolver(UpdateUserSchema),
    defaultValues: {
      name: user.name,
      user_phone: user.user_phone,
      user_address: user.user_address,
      user_birth: user.user_birth?.toISOString(),
      email: user.email,
      role: user.role,
    },
  });
  const [open, setOpen] = useState(false);
  const onSubmit = (values: z.infer<typeof UpdateUserSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      UpdateUser(values, user.username ?? "").then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setOpen(false);
        }
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Chỉnh sửa</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Chỉnh sửa thông tin</DialogTitle>
          <DialogDescription>
            Nhập thông tin người dùng cần chỉnh sửa
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="my-4">
                Tên tài khoản:<b> {user.username}</b>
              </div>
              <FormField
                control={form.control}
                name="name"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Họ và Tên</FormLabel>
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
                control={form.control}
                name="user_phone"
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
                control={form.control}
                name="user_address"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Địa chỉ</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPendding}
                        {...field}
                        placeholder="Cầu Giấy, Hà Nội"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="user_birth"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Ngày tháng năm sinh</FormLabel>
                    <FormControl>
                      <Input type="date" disabled={isPendding} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        disabled={isPendding}
                        {...field}
                        placeholder="nguyen123@gmail.com"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Chức vụ</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger disabled={isPendding} {...field}>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Chức vụ</SelectLabel>
                          <SelectItem value={Role.ADMIN}>Quản lý</SelectItem>
                          <SelectItem value={Role.USER}>Nhân viên</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
  );
};
export default EditUserDialog;
