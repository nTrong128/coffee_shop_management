"use server";

import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {AddProductSchema} from "@/schemas";

export const addProduct = async (values: z.infer<typeof AddProductSchema>) => {
  const validatedFields = AddProductSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const {
    product_name,
    product_desc,
    product_price,
    product_type,
    product_image,
  } = validatedFields.data;

  await prisma.product.create({
    data: {
      product_name,
      product_desc,
      product_price,
      product_type,
      product_image,
    },
  });

  return {success: "Tạo món thành công."};
};
