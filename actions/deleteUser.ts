"use server";
import {prisma} from "@/lib/prisma";
import {getUserById} from "@/data/account";
import {Role} from "@/types";
import {revalidatePath} from "next/cache";

export const DeleteUser = async (id: string) => {
  const existingUser = await getUserById(id);
  if (!existingUser) {
    return {error: "Tài khoản không tồn tại."};
  }
  if (existingUser.role === Role.ADMIN) {
    return {error: "Không thể xóa tài khoản ADMIN."};
  }

  await prisma.user.update({
    where: {
      id,
    },
    data: {
      user_deleted: true,
    },
  });
  return {success: "Cập nhật thông tin thành công."};
};
