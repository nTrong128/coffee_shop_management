"use server";
import {prisma} from "@/lib/prisma";
import {AddPositionSchema} from "@/schemas";
import {revalidatePath} from "next/cache";
import {z} from "zod";

export async function getAllPosition() {
  const data = await prisma.position.findMany({
    orderBy: {position_name: "asc"},
    where: {
      position_deleted: false,
    },
  });
  return {
    data,
  };
}
export async function getPositionById(position_id: string) {
  const data = await prisma.position.findUnique({
    where: {
      position_id,
    },
  });
  return {
    data,
  };
}

export const AddPosition = async (
  values: z.infer<typeof AddPositionSchema>
) => {
  const validatedFields = AddPositionSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }

  const {position_name, position_desc} = validatedFields.data;

  await prisma.position.create({
    data: {
      position_name,
      position_desc,
    },
  });
  revalidatePath("/position");
  return {success: "Tạo chức vụ thành công."};
};

export const UpdatePosition = async (
  values: z.infer<typeof AddPositionSchema>,
  position_id: string
) => {
  const validatedFields = AddPositionSchema.safeParse(values);
  if (!validatedFields.success) {
    return {error: "Thông tin không hợp lệ."};
  }
  const {position_name, position_desc} = validatedFields.data;

  await prisma.position.update({
    where: {position_id: position_id},
    data: {
      position_name,
      position_desc,
    },
  });
  revalidatePath("/position");
  return {success: "Cập nhật chức vụ thành công."};
};

export const DeletePosition = async (position_id: string) => {
  const existingPosition = await getPositionById(position_id);

  if (existingPosition.data?.position_name === "Quản lý") {
    return {error: "Không thể xóa chức vụ Admin."};
  }

  await prisma.position.update({
    where: {position_id},
    data: {
      position_deleted: true,
    },
  });
  revalidatePath("/position");
  return {success: "Xóa chức vụ thành công."};
};
