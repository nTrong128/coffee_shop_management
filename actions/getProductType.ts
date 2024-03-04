import {prisma} from "@/lib/prisma";

export const getProductTypeById = async (product_type_id: string) => {
  try {
    const product_Type = await prisma.product_Type.findUnique({
      where: {
        product_type_id,
      },
    });
    return product_Type;
  } catch {
    return null;
  }
};
