"use server";
import {prisma} from "@/lib/prisma";

export async function getAllUser() {
  const data = await prisma.user.findMany({
    orderBy: {username: "asc"},
    where: {
      user_deleted: false,
    },
    include: {
      Position: true,
    },
  });
  return {
    data,
  };
}
