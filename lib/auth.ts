import {auth} from "@/auth";

export const CurrentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const isAdmin = async () => {
  const isAdmin = (await CurrentUser())?.role === "ADMIN";
  return isAdmin;
};
