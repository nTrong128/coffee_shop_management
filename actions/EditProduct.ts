"use server";
import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {AddProductSchema} from "@/schemas";
import {getProductById} from "./getProduct";

export const EditProduct = async (
  values: z.infer<typeof AddProductSchema>,
  product_id: string
) => {
  const validatedFields = AddProductSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }
  const {
    product_name,
    product_price,
    product_desc,
    product_type,
    product_image,
  } = validatedFields.data;

  const existingProductType = await getProductById(product_id);
  if (!existingProductType) {
    return {error: "Sản phẩm không tồn tại."};
  }
  await prisma.product.update({
    where: {
      product_id,
    },
    data: {
      product_name,
      product_price,
      product_desc,
      product_type,
      product_image,
    },
  });
  return {success: "Cập nhật thông tin thành công."};
};
