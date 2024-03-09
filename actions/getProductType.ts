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

export async function getAllProductTypeWithProducts() {
  const data = await prisma.product_Type.findMany({
    select: {
      product_type_id: true,
      product_type_name: true,
      product_list: {
        select: {
          product_id: true,
          product_name: true,
          product_price: true,
          product_image: true,
          product_desc: true,
        },
        where: {
          product_deleted: false,
        },
      },
    },
    orderBy: {product_type_name: "asc"},
    where: {
      product_type_deleted: false,
    },
  });
  return {
    data,
  };
}
