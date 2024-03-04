"use server";
import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {getProductTypeById} from "./getProductType";
import {AddProductTypeSchema} from "@/schemas";

export const EditProductType = async (
  values: z.infer<typeof AddProductTypeSchema>,
  id: string
) => {
  const validatedFields = AddProductTypeSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }
  const {name, desc} = validatedFields.data;

  const existingProductType = await getProductTypeById(id);
  if (!existingProductType) {
    return {error: "Loại sản phẩm không tồn tại."};
  }
  await prisma.product_Type.update({
    where: {
      product_type_id: id,
    },
    data: {
      product_type_name: name,
      product_type_desc: desc,
    },
  });
  return {success: "Cập nhật thông tin thành công."};
};
