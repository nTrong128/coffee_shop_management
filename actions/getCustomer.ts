"use server";
import {prisma} from "@/lib/prisma";

export async function getAllCustomer() {
  const data = await prisma.customer.findMany({
    orderBy: {customer_name: "asc"},
    where: {
      customer_deleted: false,
    },
  });
  return {
    data,
  };
}

export async function getCustomerById(customer_id: string) {
  const data = await prisma.customer.findUnique({
    where: {
      customer_id,
    },
  });
  return {
    data,
  };
}
