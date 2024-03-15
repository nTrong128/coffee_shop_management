"use server";

import {prisma} from "@/lib/prisma";
import {AddOrderSchema} from "@/schemas";
import {OrderItem} from "@/types";
import * as z from "zod";

export const addOrder = async (values: z.infer<typeof AddOrderSchema>) => {
  const validatedFields = AddOrderSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const {customer_id, staff_id} = validatedFields.data;

  await prisma.order.create({
    data: {
      staff_id,
      customer_id,
    },
  });

  return {success: "Tạo hóa đơn thành công."};
};

export const addOrderWithItems = async (
  values: z.infer<typeof AddOrderSchema>,
  items: OrderItem[]
) => {
  const validatedFields = AddOrderSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }
  const order_total = items.reduce((acc, product) => acc + product.price, 0);

  const {customer_id, staff_id} = validatedFields.data;

  const order = await prisma.order.create({
    data: {
      staff_id,
      customer_id,
      order_total,
    },
  });

  await prisma.order.update({
    where: {
      order_id: order.order_id,
    },
    data: {
      Order_Detail: {
        createMany: {
          data: items,
        },
      },
    },
  });

  return {success: "Tạo hóa đơn thành công."};
};
