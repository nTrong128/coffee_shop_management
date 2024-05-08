"use server";

import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {AddCustomerSchema} from "@/schemas";
import {revalidatePath} from "next/cache";

export const addCustomer = async (
  values: z.infer<typeof AddCustomerSchema>
) => {
  const validatedFields = AddCustomerSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const {customer_name, customer_phone} = validatedFields.data;

  await prisma.customer.create({
    data: {
      customer_name,
      customer_phone,
    },
  });
  revalidatePath("/menu");
  return {success: "Tạo khách hàng mới thành công."};
};
