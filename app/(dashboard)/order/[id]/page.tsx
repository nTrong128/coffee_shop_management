import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {List} from "lucide-react";

import {GetOrderById} from "@/actions/order";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import OrderDetail from "@/components/dashboard/order/order-detail";
import {OrderType} from "@/types";

export default async function OrderDetails({params}: {params: {id: string}}) {
  const res = await GetOrderById(params.id);
  const order = res.data;
  if (!order) {
    return <div className="text-center text-4xl">Đơn hàng không tồn tại</div>;
  }
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <List />
            <CardTitle>Chi tiết đơn hàng</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto"></CardContent>
      </Card>

      <OrderDetail invoice={order as any} />
    </main>
  );
}
