"use server";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {AddUserSchema} from "@/schemas";
import {getUserByUsername} from "@/data/account";

export const addNewUser = async (values: z.infer<typeof AddUserSchema>) => {
  const validatedFields = AddUserSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const {
    username,
    name,
    password,
    role,
    user_address,
    wage_rate,
    user_birth,
    user_phone,
  } = validatedFields.data;
  const hasedPassword = await bcrypt.hash(password, 10);
  const userBirthISO = new Date(user_birth).toISOString();

  const existingUser = await getUserByUsername(username);
  if (existingUser) {
    return {error: "Tên tài khoản đã được sử dụng."};
  }

  await prisma.user.create({
    data: {
      username,
      password: hasedPassword,
      role,
      name,
      user_address,
      user_birth: userBirthISO,
      user_phone,
      wage_rate,
    },
  });

  return {success: "Tạo người dùng thành công."};
};
