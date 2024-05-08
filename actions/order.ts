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
  pointValue?: number;
  staff_id: string;
  customer_id: string;
}) {
  const data = await prisma.order.create({
    data: {
      customer_id: props.customer_id ? props.customer_id : null,
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

  if (props.customer_id && props.pointValue) {
    await prisma.customer.update({
      where: {
        customer_id: props.customer_id,
      },
      data: {
        customer_point: {
          increment: props.pointValue,
        },
      },
    });
  }

  revalidatePath("/order");
  const order = await GetOrderById(data.order_id);
  return {
    order,
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
    orderBy: {
      createAt: "desc",
    },
  });
  return {
    data,
  };
}

export async function GetOrderById(id: string) {
  const data = await prisma.order.findUnique({
    where: {
      order_id: id,
    },
    include: {
      Order_Detail: {
        include: {
          product: true,
        },
      },
      Customer: true,
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
