import {prisma} from "@/lib/prisma";

export const getUserByUsername = async (username: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    return {
      data: user,
      message: "users fetched by username successfully",
    };
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });
    return {
      data: user,
      message: "users fetched by id successfully",
    };
  } catch {
    return {
      data: null,
      message: "users fetched by id failed",
    };
  }
};
