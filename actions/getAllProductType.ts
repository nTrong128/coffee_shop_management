"use server";
import {prisma} from "@/lib/prisma";

export async function getAllProductTypes() {
  const data = await prisma.product_Type.findMany({
    orderBy: {product_type_name: "asc"},
  });
  return {
    data,
  };
}
