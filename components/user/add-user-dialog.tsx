"use client";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
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

import {useForm} from "react-hook-form";
import {AddUserSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import React, {useState, useTransition} from "react";
import {addNewUser} from "@/actions/addUser";
import {FormError} from "@/components/auth/error-form";
import {FormSuccess} from "@/components/auth/success-form";
const AddUserDialog = () => {
  const [error, setError] = useState<string | undefined>(
    ""
  );
  const [success, setSuccess] = useState<
    string | undefined
  >("");
  const [isPendding, startTransition] = useTransition();

  const form = useForm<z.infer<typeof AddUserSchema>>({
    resolver: zodResolver(AddUserSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      wage_rate: 1.0,
      role: "USER",
      user_address: "",
      user_birth: "",
      user_phone: "",
      password: "123ABCxyz@",
    },
  });
  const [open, setOpen] = useState(false);
  const onSubmit = (
    values: z.infer<typeof AddUserSchema>
  ) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addNewUser(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setOpen(false);
        }
      });
    });
  };
  enum Role {
    ADMIN = "ADMIN",
    USER = "USER",
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Tạo người dùng mới</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Thêm nhân viên mới</DialogTitle>
          <DialogDescription>
            Nhập thông tin người dùng để thêm họ vào hệ
            thống
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({field}) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPendding}
                        {...field}
                        placeholder="username123444"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        placeholder="Nguyễn Văn A"
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
                    <FormLabel>
                      Ngày tháng năm sinh
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        disabled={isPendding}
                        {...field}
                        placeholder="01/01/2000"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="hidden">
                      Mật khẩu
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="hidden"
                        type="password"
                        disabled={isPendding}
                        {...field}
                        placeholder="********"
                      />
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
                name="wage_rate"
                render={({field}) => (
                  <FormItem>
                    <FormLabel className="hidden">
                      Hệ số lương
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="hidden"
                        type="number"
                        disabled={isPendding}
                        {...field}
                        placeholder="1.0"
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
                        <SelectTrigger
                          disabled={isPendding}
                          {...field}>
                          <SelectValue placeholder="Chọn chức vụ" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Chức vụ</SelectLabel>
                          <SelectItem value={Role.ADMIN}>
                            Quản lý
                          </SelectItem>
                          <SelectItem value={Role.USER}>
                            Nhân viên
                          </SelectItem>
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
                Thêm
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
export default AddUserDialog;
