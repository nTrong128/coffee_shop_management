"use server";
import {prisma} from "@/lib/prisma";
import {getCustomerById} from "./getCustomer";
import {revalidatePath} from "next/cache";
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
  revalidatePath("/customer");
  return {success: "Đã xóa thành công."};
}
