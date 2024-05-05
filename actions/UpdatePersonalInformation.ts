"use server";
import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {UpdatePersonalInformation} from "@/schemas";
import {getUserByUsername} from "@/data/account";
import {revalidatePath} from "next/cache";

export const UpdatePersonal = async (
  values: z.infer<typeof UpdatePersonalInformation>,
  username: string
) => {
  const validatedFields = UpdatePersonalInformation.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const {name, user_address, user_birth, user_phone, email} =
    validatedFields.data;
  const userBirthISO = new Date(user_birth).toISOString();

  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    return {error: "Tài khoản không tồn tại."};
  }

  await prisma.user.update({
    where: {
      username,
    },
    data: {
      name,
      email,
      user_address,
      user_birth: userBirthISO,
      user_phone,
    },
  });

  revalidatePath("/profile");
  return {success: "Cập nhật thông tin thành công."};
};
