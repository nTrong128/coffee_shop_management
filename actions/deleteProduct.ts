"use server";
import {prisma} from "@/lib/prisma";
import {getProductById} from "@/actions/getProduct";

export async function DeleteProduct(product_id: string) {
  const existingProductType = await getProductById(product_id);
  if (!existingProductType) {
    return {error: "Sản phẩm không tồn tại."};
  }
  await prisma.product.update({
    where: {
      product_id,
    },
    data: {
      product_deleted: true,
    },
  });
  return {success: "Đã xóa thành công."};
}
