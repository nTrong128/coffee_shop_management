"use server";
import {prisma} from "@/lib/prisma";
import {error} from "console";

export async function getAllCustomer() {
  const data = await prisma.customer.findMany({
    orderBy: {customer_name: "asc"},
    where: {},
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
    include: {
      Order: true,
      HistoryGiftExchange: {
        orderBy: {createAt: "desc"},
        include: {
          gift: true,
        },
      },
    },
  });
  return {
    data,
  };
}
