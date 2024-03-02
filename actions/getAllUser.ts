"use server";
import {prisma} from "@/lib/prisma";
import {UserType} from "@/types";

export async function getAllUser() {
  const data = await prisma.user.findMany();
  return {
    data,
  };
}
