"use client";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import {formatDateTime} from "@/lib/DateTime";
import {OrderItem, UserType} from "@/types";
import {useRouter} from "next/navigation";

type OrderType = {
  order_id: string;
  order_total: number;
  order_received: number;
  order_note: string | null;
  User: UserType | any;
  createAt: Date;
  Order_Detail: OrderItem[];
};

export function OrderTable(props: {order: OrderType[]}) {
  const router = useRouter();
  if (!props.order) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        Không có dữ liệu
      </div>
    );
  }
  return (
    <Table className="border rounded mx-auto">
      <TableHeader>
        <TableRow>
          <TableHead>Mã hóa đơn</TableHead>
          <TableHead>Thời gian</TableHead>
          <TableHead>Người lập</TableHead>
          <TableHead>Chi tiết</TableHead>
          <TableHead>Tổng cộng</TableHead>
          <TableHead>Ghi chú</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.order.map((order: OrderType) => {
          return (
            <TableRow key={order.order_id}>
              <TableCell>
                {order.order_id.substring(0, 5).toUpperCase()}
              </TableCell>
              <TableCell>{formatDateTime(order.createAt)}</TableCell>
              <TableCell>{order.User.name}</TableCell>
              <TableCell>
                {order.Order_Detail.map((item: any) => (
                  <div key={item.productId}>
                    - {item.product.product_name} x {item.quantity}
                  </div>
                ))}
              </TableCell>
              <TableCell>{order.order_total}</TableCell>
              <TableCell>{order.order_note}</TableCell>
              <TableCell>
                <Button
                  className=" bg-green-500 text-white rounded-full  hover:bg-green-600 hover:text-white"
                  onClick={() => router.push(`/order/${order.order_id}`)}>
                  {" "}
                  Xem chi tiết
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
