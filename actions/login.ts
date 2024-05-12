"use server";
import {DEFAULT_LOGIN_REDIRECT} from "@/routes";
import * as z from "zod";
import {signIn} from "@/auth";
import {LoginSchema} from "@/schemas";
import {AuthError} from "next-auth";
import {getUserByUsername} from "@/data/account";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin đăng nhâp không hợp lệ."};
  }
  // return {success: "Đăng nhập thành công."}
  const {username, password} = validatedFields.data;
  const user = await getUserByUsername(username);
  if (!user) {
    return {error: "Tài khoản không tồn tại."};
  }
  if (!user.user_status) {
    return {error: "Tài khoản đã bị khóa."};
  }

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {error: "Thông tin đăng nhập không hợp lệ!!"};
        default:
          return {error: "Something went wrong!!"};
      }
    }
    throw error;
  }
  return {success: "Đăng nhập thành công."};
};
