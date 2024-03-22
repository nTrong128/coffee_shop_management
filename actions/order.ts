"use server";
import {prisma} from "@/lib/prisma";
import {revalidatePath} from "next/cache";
type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
};

export async function CreateOrder(props: {
  items: OrderItem[];
  received: number;
  total: number;
  order_note: string;
  staff_id: string;
}) {
  const data = await prisma.order.create({
    data: {
      order_total: props.total,
      order_received: props.received,
      order_note: props.order_note,
      staff_id: props.staff_id,
      Order_Detail: {
        createMany: {
          data: props.items.map((item) => ({
            productId: item.productId,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
    },
  });
  revalidatePath("/order");
  return {
    data,
  };
}

export async function GetAllOrder() {
  const data = await prisma.order.findMany({
    include: {
      Order_Detail: {
        include: {
          product: true,
        },
      },
      User: true,
    },
  });
  return {
    data,
  };
}

export async function latestOrder() {
  const data = await prisma.order.findMany({
    take: 5,

    where: {
      createAt: {
        gte: new Date(new Date().getTime() - 30 * 60 * 1000),
      },
    },
    orderBy: {
      createAt: "desc",
    },
    include: {
      Order_Detail: {
        include: {
          product: {
            select: {
              product_name: true,
              product_price: true,
            },
          },
        },
      },
      User: {
        select: {
          name: true,
        },
      },
    },
  });
  return {
    data,
  };
}
