"use server";
import {prisma} from "@/lib/prisma";
import {getCustomerById} from "./getCustomer";
export async function DeleteCustomer(customer_id: string) {
  const existingProductType = await getCustomerById(customer_id);
  if (!existingProductType) {
    return {error: "Khách hàng không tồn tại."};
  }

  await prisma.customer.update({
    where: {
      customer_id,
    },
    data: {
      customer_deleted: true,
    },
  });
  return {success: "Đã xóa thành công."};
}
