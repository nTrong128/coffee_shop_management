"use server";

import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {AddProductTypeSchema} from "@/schemas";

export const addProductType = async (
  values: z.infer<typeof AddProductTypeSchema>
) => {
  const validatedFields = AddProductTypeSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const {name, desc} = validatedFields.data;

  await prisma.product_Type.create({
    data: {
      product_type_name: name,
      product_type_desc: desc,
    },
  });

  return {success: "Tạo loại món thành công."};
};
