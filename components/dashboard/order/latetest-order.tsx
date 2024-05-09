"use client";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {formatDateTime, calculateMinutes} from "@/lib/DateTime";
import {Info, Timer} from "lucide-react";
import {useRouter} from "next/navigation";

type Order = {
  order_id: string;
  User: {
    name: string | null;
  } | null;
  Order_Detail: {
    product: any;
    quantity: number;
  }[];
  order_received: number | null;
  order_total: number | null;
  createAt: Date;
  order_note: string | null;
};

export function LateLyOrder(props: {data: Order[]}) {
  const router = useRouter();
  if (props.data.length <= 0) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        Tạm thời không có dữ liệu
      </div>
    );
  }
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <Timer className="mx-auto" />
            </TableHead>
            <TableHead className="w-[100px]">Mã hóa đơn</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead className="w-[200px]">Chi tiết</TableHead>
            <TableHead>Người nhận đơn</TableHead>
            <TableHead>Giá trị hóa đơn</TableHead>
            <TableHead>Ghi chú</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.data.map((order) => (
            <TableRow key={order.order_id}>
              <TableHead>
                {calculateMinutes(order.createAt)} phút trước
              </TableHead>
              <TableCell>
                {order.order_id.substring(0, 9).toUpperCase()}
              </TableCell>
              <TableCell>{formatDateTime(order.createAt)}</TableCell>
              <TableCell>
                {order.Order_Detail.map((item) => (
                  <div key={item.product.product_id}>
                    - {item.product.product_name} x {item.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>{order.User?.name}</TableCell>
              <TableCell>{order.order_total}</TableCell>
              <TableCell>{order.order_note}</TableCell>
              <TableCell>
                <Button
                  className="mx-auto rounded-full text-green-700 bg-green-100"
                  size="icon"
                  variant="secondary"
                  onClick={() => router.push(`/order/${order.order_id}`)}>
                  <Info className="w-6 h-6" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
