"use server";

import {formatDateIntoReadable} from "@/lib/DateTime";
import {prisma} from "@/lib/prisma";
import {Prisma} from "@prisma/client";

export async function MainReport() {
  const income = await prisma.order.aggregate({
    where: {
      createAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lt: new Date(),
      },
    },
    _sum: {
      order_total: true,
    },
  });

  const order = await prisma.order.aggregate({
    where: {
      createAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lt: new Date(),
      },
    },
    _count: {
      order_id: true,
    },
  });

  const customer = await prisma.customer.aggregate({
    where: {
      createAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lt: new Date(),
      },
    },
    _count: {
      customer_id: true,
    },
  });

  const consume = await prisma.spending.aggregate({
    where: {
      createAt: {
        gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        lt: new Date(),
      },
    },
    _sum: {
      spending_price: true,
    },
  });

  return {
    data: {
      income: income._sum.order_total,
      order: order._count.order_id,
      customer: customer._count.customer_id,
      consume: consume._sum.spending_price,
    },
  };
}

export async function ProductReport() {
  const data = await prisma.order_Detail.groupBy({
    where: {
      createAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        lt: new Date(),
      },
    },
    by: ["productId"],
    _sum: {
      quantity: true,
    },
  });

  const product = await prisma.product.findMany({
    where: {
      product_id: {
        in: data.map((item) => item.productId),
      },
    },
  });

  const mappedData = data.map((item) => {
    const productItem = product.find((p) => p.product_id === item.productId);
    return {
      value: item._sum.quantity!,
      name: productItem ? productItem.product_name : "Không rõ",
    };
  });

  const sum = mappedData.reduce((acc, item) => {
    return acc + item.value;
  }, 0);

  return {mappedData, sum};
}

export async function ProductTypeReport() {
  const data = await prisma.product.groupBy({
    by: ["product_type"],
    _count: {
      product_id: true,
    },
    where: {
      product_deleted: false,
    },
  });

  const productType = await prisma.product_Type.findMany({
    where: {
      product_type_deleted: false,
      product_type_id: {
        in: data.map((item) => item.product_type!),
      },
    },
  });
  const mappedData = data.map((countItem) => {
    const typeDetails = productType.find(
      (type) => type.product_type_id === countItem.product_type
    );
    return {
      name: typeDetails ? typeDetails.product_type_name! : "",
      value: countItem._count.product_id,
    };
  });
  const returnData = mappedData.filter((item) => item.name !== "");
  return returnData;
}

type Income = {
  date: Date;
  total_price: number;
};
type Consume = {
  date: Date;
  spending_price: number;
};
export async function FinancialReport() {
  const income: Income[] = await prisma.$queryRaw`WITH date_series AS (
    SELECT generate_series(CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE, INTERVAL '1 day')::date AS date
)
SELECT
    date_series.date AS date,
    COALESCE(SUM("Order".order_total), 0) AS total_price
FROM
    date_series
LEFT JOIN
    "Order" ON date_series.date = DATE_TRUNC('day', "Order"."createAt")
WHERE
    date_series.date >= CURRENT_DATE - INTERVAL '29 days'
GROUP BY
    date_series.date
ORDER BY
    date_series.date;`;

  const consume: Consume[] = await prisma.$queryRaw`WITH date_series AS (
    SELECT generate_series(CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE, INTERVAL '1 day')::date AS date
)
SELECT
    date_series.date AS date,
    COALESCE(SUM("Spending".spending_price), 0) AS spending_price
FROM
    date_series
LEFT JOIN
    "Spending" ON date_series.date = DATE_TRUNC('day', "Spending"."createAt")
WHERE
    date_series.date >= CURRENT_DATE - INTERVAL '29 days'
GROUP BY
    date_series.date
ORDER BY
    date_series.date;`;

  const newIncome = income.map((item: any) => {
    return {
      date: formatDateIntoReadable(item.date),
      total_price: item.total_price,
    };
  });
  const newConsume = consume.map((item: any) => {
    return {
      date: formatDateIntoReadable(item.date),
      spending_price: item.spending_price,
    };
  });
  const data = newIncome.map((income) => {
    const consume = newConsume.find((c) => c.date === income.date);
    return {
      date: String(income.date),
      income: income.total_price,
      consume: consume ? consume.spending_price : 0,
    };
  });
  return data;
}

type Orders = {
  date: Date;
  order_count: number;
};

export async function OrderReport() {
  const orders: Orders[] =
    await prisma.$queryRaw`WITH date_series AS (SELECT generate_series(CURRENT_DATE - INTERVAL '29 days', CURRENT_DATE, INTERVAL '1 day')::date AS date)SELECT date_series.date AS date, COALESCE(COUNT("Order"._id), 0) AS "order_count" FROM date_series LEFT JOIN "Order" ON date_series.date = DATE_TRUNC('day', "Order"."createAt") GROUP BY date_series.date ORDER BY date_series.date;`;

  const newOrders = orders.map((item: any) => {
    return {
      date: formatDateIntoReadable(item.date),
      value: Number(item.order_count),
    };
  });

  return newOrders;
}
