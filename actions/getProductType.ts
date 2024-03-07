"use server";
import {prisma} from "@/lib/prisma";

export const getProductTypeById = async (product_type_id: string) => {
  try {
    const product_Type = await prisma.product_Type.findUnique({
      where: {
        product_type_id,
        product_type_deleted: false,
      },
    });
    return product_Type;
  } catch {
    return null;
  }
};

export async function getAllProductTypes() {
  const data = await prisma.product_Type.findMany({
    orderBy: {product_type_name: "asc"},
    where: {
      product_type_deleted: false,
    },
  });
  return {
    data,
  };
}
