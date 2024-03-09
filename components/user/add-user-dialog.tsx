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

import {Role} from "@/types";
import {useForm} from "react-hook-form";
import {AddUserSchema} from "@/schemas";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import React, {useState, useTransition} from "react";
import {addNewUser} from "@/actions/addUser";
import {FormError} from "@/components/auth/error-form";
import {FormSuccess} from "@/components/auth/success-form";
const AddUserDialog = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
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
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const onSubmit = (values: z.infer<typeof AddUserSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      addNewUser(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
        if (data.success) {
          setOpenAddUserDialog(false);
        }
      });
    });
  };

  return <></>;
};
export default AddUserDialog;
