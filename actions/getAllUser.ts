"use server";
import {prisma} from "@/lib/prisma";

export async function getAllUser() {
  const data = await prisma.user.findMany({
    orderBy: {username: "asc"},
  });
  return {
    data,
  };
}
