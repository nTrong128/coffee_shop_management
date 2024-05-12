"use server";
import {prisma} from "@/lib/prisma";
import {AddGiftSchema} from "@/schemas";
import {revalidatePath} from "next/cache";
import {z} from "zod";

export async function CreateGift(values: z.infer<typeof AddGiftSchema>) {
  const validatedFields = AddGiftSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }
  const {gift_name, gift_price, gift_image, gift_desc} = validatedFields.data;

  await prisma.gift.create({
    data: {
      gift_name,
      gift_price,
      gift_desc,
      gift_image,
    },
  });
  revalidatePath("/exchange");
  return {success: "Tạo quà đổi thưởng mới thành công"};
}

export async function GetAllGift() {
  const data = await prisma.gift.findMany({
    orderBy: {
      createAt: "desc",
    },
    where: {
      gift_deleted: false,
    },
  });
  return {
    data,
  };
}

export async function GetGiftById(id: string) {
  const data = await prisma.gift.findUnique({
    where: {
      gift_id: id,
    },
  });
  return {
    data,
  };
}

export async function UpdateGiftById(
  id: string,
  values: z.infer<typeof AddGiftSchema>
) {
  const validatedFields = AddGiftSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const data = await prisma.gift.update({
    data: values,
    where: {
      gift_id: id,
    },
  });
  if (!data) {
    return {error: "Không tìm thấy thông tin quà tặng."};
  }

  revalidatePath("/exchange");
  return {
    success: "Cập nhật thành công.",
  };
}

export async function DeleteGiftById(id: string) {
  const data = await prisma.gift.update({
    data: {
      gift_deleted: true,
    },
    where: {
      gift_id: id,
    },
  });

  revalidatePath("/exchange");
  return {
    success: "Xóa thành công.",
  };
}

export async function ExchangeGift(values: {
  customer_id: string;
  gift_id: string;
  staff_id: string;
}) {
  const {customer_id, gift_id, staff_id} = values;
  const customer = await prisma.customer.findUnique({
    where: {
      customer_id,
    },
  });
  if (!customer) {
    return {error: "Không tìm thấy thông tin khách hàng"};
  }
  const gift = await prisma.gift.findUnique({
    where: {
      gift_id,
    },
  });
  if (!gift) {
    return {error: "Không tìm thấy thông tin quà tặng"};
  }

  if (customer.customer_point < gift.gift_price) {
    return {error: "Khách hàng không đủ điểm để đổi quà"};
  }
  await prisma.customer.update({
    data: {
      customer_point: {
        decrement: gift.gift_price,
      },
    },
    where: {
      customer_id,
    },
  });

  await prisma.historyGiftExchange.create({
    data: {
      customerId: customer_id,
      giftId: gift_id,
      staffId: staff_id,
      exchange_point: gift.gift_price,
    },
  });

  revalidatePath("/exchange");
  return {success: "Đổi quà thành công"};
}

export async function GetAllHistoryGiftExchange() {
  const data = await prisma.historyGiftExchange.findMany({
    orderBy: {
      createAt: "desc",
    },
    include: {
      gift: true,
      customer: true,
      staff: true,
    },
  });
  return {
    data,
  };
}

export async function GetHistoryGiftExchangeByCustomer(customer_id: string) {
  const data = await prisma.historyGiftExchange.findMany({
    where: {
      customerId: customer_id,
    },
    orderBy: {
      createAt: "desc",
    },
    include: {
      gift: true,
      staff: true,
    },
  });
  return {
    data,
  };
}
