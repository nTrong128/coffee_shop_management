"use server";
import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {UpdateUserSchema} from "@/schemas";
import {getUserByUsername} from "@/data/account";

export const UpdateUser = async (
  values: z.infer<typeof UpdateUserSchema>,
  username: string
) => {
  const validatedFields = UpdateUserSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const {
    name,
    role,
    user_address,
    user_birth,
    user_phone,
    position_id,
    email,
    wage_rate,
  } = validatedFields.data;
  const userBirthISO = new Date(user_birth).toISOString();

  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    return {error: "Tài khoản không tồn tại."};
  }

  const existedEmail = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });
  if (existedEmail && existedEmail.username !== username) {
    return {error: "Email đã được sử dụng."};
  }

  await prisma.user.update({
    where: {
      username,
    },
    data: {
      email,
      position: position_id,
      role,
      name,
      wage_rate,
      user_address,
      user_birth: userBirthISO,
      user_phone,
    },
  });

  return {success: "Cập nhật thông tin thành công."};
};
