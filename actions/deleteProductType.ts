"use server";
import {prisma} from "@/lib/prisma";
import {getProductTypeById} from "./getProductType";

export async function DeleteProdcutType(product_type_id: string) {
  const existingProductType = await getProductTypeById(product_type_id);
  if (!existingProductType) {
    return {error: "Loại sản phẩm không tồn tại."};
  }
  await prisma.product_Type.update({
    where: {
      product_type_id,
    },
    data: {
      product_deleted: true,
    },
  });
  return {success: "Đã xóa thành công."};
}
