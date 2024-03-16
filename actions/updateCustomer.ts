"use server";
import {getCustomerById} from "@/actions/getCustomer";
import {prisma} from "@/lib/prisma";
import {AddCustomerSchema} from "@/schemas";
import {z} from "zod";

export async function UpdateCustomer(
  values: z.infer<typeof AddCustomerSchema>,
  customer_id: string
) {
  const validatedFields = AddCustomerSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }
  const existingUser = await getCustomerById(customer_id);
  if (!existingUser) {
    return {error: "Khánh hàng không tồn tại."};
  }
  await prisma.customer.update({
    where: {
      customer_id,
    },
    data: {
      customer_name: values.customer_name,
      customer_phone: values.customer_phone,
      customer_point: values.customer_point,
    },
  });
  return {success: "Cập nhật thông tin thành công."};
}
