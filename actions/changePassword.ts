"use server";
import bcrypt from "bcryptjs";
import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {ChangePasswordSchema} from "@/schemas";
import {getUserByUsername} from "@/data/account";

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
