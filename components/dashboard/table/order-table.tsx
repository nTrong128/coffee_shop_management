import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import {formatDate} from "@/lib/DateTime";
import {OrderItem, UserType} from "@/types";

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
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.order.map((order: OrderType) => {
          return (
            <TableRow key={order.order_id}>
              <TableCell>
                {order.order_id.substring(0, 5).toUpperCase()}
              </TableCell>
              <TableCell>{formatDate(order.createAt)}</TableCell>
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
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
