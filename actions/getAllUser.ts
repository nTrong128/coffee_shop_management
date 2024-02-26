"use server";
import {prisma} from "@/lib/prisma";

export async function getAllUser() {
  const data = await prisma.user.findMany();
  return {
    data,
    message: "users fetched successfully",
  };
}
