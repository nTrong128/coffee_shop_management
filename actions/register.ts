"use server";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {RegisterSchema} from "@/schemas";
import {getUserByUsername} from "@/data/account";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin đăng ký không hợp lệ."};
  }

  const {username, name, email, password} = validatedFields.data;
  const hasedPassword = await bcrypt.hash(password, 10);
  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return {error: "Tên tài khoản đã được sử dụng."};
  }

  await prisma.user.create({
    data: {
      username,
      password: hasedPassword,
      email, // TODO: Change this to a real email
      name,
    },
  });

  // TODO: Send email to user
  return {success: "Đăng ký thành công."};
};
