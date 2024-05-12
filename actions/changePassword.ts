"use server";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {ChangePasswordSchema} from "@/schemas";
import {getUserByUsername} from "@/data/account";
import {Role} from "@/types";
import {revalidatePath} from "next/cache";

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>,
  username: string
) => {
  const validatedFields = ChangePasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Vui lòng nhập đầy đủ thông tin."};
  }

  const {old_password, new_password, retype_password} = validatedFields.data;
  const hasedPassword = await bcrypt.hash(new_password, 10);

  if (new_password !== retype_password) {
    return {error: "Mật khẩu không khớp."};
  }

  const user = await getUserByUsername(username);
  if (!user) {
    return {error: "Người dùng không tồn tại."};
  }

  const checkOldPassword = user.password
    ? await bcrypt.compare(old_password, user.password)
    : false;

  if (!checkOldPassword) {
    return {error: "Mật khẩu cũ không đúng."};
  }

  await prisma.user.update({
    data: {
      password: hasedPassword,
    },
    where: {
      username,
    },
  });

  return {success: "Tạo người dùng thành công."};
};

export const resetPassword = async (username: string) => {
  const hasedPassword = await bcrypt.hash("123ABCxyz@", 10);

  const user = await getUserByUsername(username);
  if (!user) {
    return {error: "Người dùng không tồn tại."};
  }

  await prisma.user.update({
    data: {
      password: hasedPassword,
    },
    where: {
      username,
    },
  });

  return {success: "Reset mật khẩu thành công."};
};

export const changeStateAccount = async (username: string) => {
  const user = await getUserByUsername(username);
  if (!user) {
    return {error: "Người dùng không tồn tại."};
  }
  if (user.role === Role.ADMIN)
    return {error: "Không thể thay đổi trạng thái tài khoản admin (Quản lý)."};

  await prisma.user.update({
    data: {
      user_status: !user.user_status,
    },
    where: {
      username,
    },
  });
  revalidatePath("/user");
  return {success: "Đổi trạng thái tài khoản thành công."};
};
