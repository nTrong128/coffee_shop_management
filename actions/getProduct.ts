"use server";
import {prisma} from "@/lib/prisma";

export async function getAllProducts() {
  const data = await prisma.product.findMany({
    orderBy: {product_name: "asc"},
    where: {
      product_deleted: false,
    },
  });
  return {
    data,
  };
}
export async function getProductById(product_id: string) {
  const data = await prisma.product.findUnique({
    where: {
      product_id,
    },
  });
  return {
    data,
  };
}
