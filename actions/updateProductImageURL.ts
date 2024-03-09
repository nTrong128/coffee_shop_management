import {prisma} from "@/lib/prisma";
import {getProductById} from "./getProduct";

export async function UpdateProductImageURL({
  product_id,
  url,
}: {
  product_id: string;
  url: string;
}) {
  const product = await getProductById(product_id);
  if (!product) {
    return {error: "Sản phẩm không tồn tại."};
  }
  await prisma.product.update({
    where: {
      product_id,
    },
    data: {
      product_image: url,
    },
  });
  return {success: "Cập nhật ảnh sản phẩm thành công."};
}
