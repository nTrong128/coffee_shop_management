import {prisma} from "@/lib/prisma";

export const getStaffByEmail = async (username: string) => {
  try {
    const staff = await prisma.user.findUnique({
      where: {
        username,
      },
    });
    return staff;
  } catch {
    return null;
  }
};

export const getStaffById = async (id: string) => {
  try {
    const staff = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return staff;
  } catch {
    return null;
  }
};
