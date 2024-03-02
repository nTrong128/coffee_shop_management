"use server";
import {getUserByUsername} from "@/data/account";
import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";

export async function UpdateUserImage(username: string, image: string) {
  const existingUser = await getUserByUsername(username);
  if (!existingUser) {
    return {error: "Tài khoản không tồn tại."};
  }
  await prisma.user.update({
    where: {
      username,
    },
    data: {
      image,
    },
  });
  return {success: "Cập nhật thông tin thành công."};
}
