import {prisma} from "@/lib/prisma";

export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.account.findUnique({
      where: {
        username: username,
      },
    });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.account.findUnique({
      where: {
        account_id: id,
      },
    });
    return user;
  } catch {
    return null;
  }
};
