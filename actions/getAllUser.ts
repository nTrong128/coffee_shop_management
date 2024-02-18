import {prisma} from "@/lib/prisma";
import {GetStaticProps} from "next";

export async function getAllUser() {
  const users = await prisma.user.findMany();
  return users;
}
