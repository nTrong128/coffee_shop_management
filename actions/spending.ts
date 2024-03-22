"use server";
import {prisma} from "@/lib/prisma";
import * as z from "zod";
import {AddSpendingSchema} from "@/schemas";
import {revalidatePath} from "next/cache";

export const addSpending = async (
  values: z.infer<typeof AddSpendingSchema>
) => {
  const validatedFields = AddSpendingSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const {spending_creator, spending_desc, spending_price, spending_name} =
    validatedFields.data;

  await prisma.spending.create({
    data: {
      spending_staff: spending_creator,
      spending_desc,
      spending_price,
      spending_name,
    },
  });
  revalidatePath("/spend");
  return {success: "Tạo chi tiêu mới thành công."};
};

export const getAllSpending = async () => {
  const data = await prisma.spending.findMany({
    select: {
      spending_id: true,
      spending_name: true,
      spending_price: true,
      spending_desc: true,
      spending_staff: true,
      createAt: true,
      staff: {
        select: {
          name: true,
        },
      },
    },
    orderBy: {createAt: "desc"},
    where: {
      spending_deleted: false,
    },
  });
  return {
    data,
  };
};
