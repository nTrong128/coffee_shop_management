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
  {
    success: "Xóa thành công.";
  }
}
