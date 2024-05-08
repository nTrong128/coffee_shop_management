"use client";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {formatDateTime} from "@/lib/DateTime";
import {useRouter} from "next/navigation";

export function CustomerDetail(prop: {customer: any}) {
  const router = useRouter();
  const customer = prop.customer;
  return (
    <div className="p-4 m-4 space-y-4">
      <Button size={"lg"} onClick={() => router.back()}>
        Quay lại
      </Button>
      <p>{JSON.stringify(customer)}</p>

      <div className="shadow-md border-t">
        <div className="mx-4 px-4 space-y-4 border-b">
          <p className="text-3xl font-bold text-center mb-8 mt-2">
            Thông tin cá nhân
          </p>

          <div className="flex gap-x-6">
            <span className="text-lg">Tên khách hàng:</span>
            <span className="text-lg  font-semibold">
              {customer.customer_name}
            </span>
          </div>
          <div className="flex gap-x-6">
            <span className="text-lg">Số điện thoại:</span>
            <span className="text-lg  font-semibold">
              {customer.customer_phone}
            </span>
          </div>
          <div className="flex gap-x-6">
            <span className="text-lg">Điểm tích lũy:</span>
            <span className="text-lg  font-semibold">
              {customer.customer_point}
            </span>
          </div>
          <div className="flex gap-x-6">
            <span className="text-lg">Ngày tạo:</span>
            <span className="text-lg  font-semibold">
              {formatDateTime(customer.createAt)}
            </span>
          </div>
        </div>
        <div className="mx-4 px-4 space-y-4 border-b">
          <p className="text-3xl font-bold text-center mb-8 mt-2">
            Lịch sử giao dịch
          </p>

          <Table className="border my-4">
            <TableHeader>
              <TableHead>STT</TableHead>
              <TableHead>Số hóa đơn</TableHead>
              <TableHead>Giá trị hóa đơn</TableHead>
              <TableHead>Thời gian</TableHead>
            </TableHeader>
            {customer.Order.map((order: any, index: any) => (
              <TableRow key={order.order_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.order_total}</TableCell>
                <TableCell>{formatDateTime(order.createAt)}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>

        {/* Exchange */}
        <div className="mx-4 px-4 space-y-4">
          <p className="text-3xl font-bold text-center mb-8 mt-2">
            Lịch sử đổi thưởng
          </p>

          <Table className="border my-4">
            <TableHeader>
              <TableHead>STT</TableHead>
              <TableHead>Số hóa đơn</TableHead>
              <TableHead>Giá trị hóa đơn</TableHead>
              <TableHead>Thời gian</TableHead>
            </TableHeader>
            {customer.Order.map((order: any, index: any) => (
              <TableRow key={order.order_id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{order.order_id}</TableCell>
                <TableCell>{order.order_total}</TableCell>
                <TableCell>{formatDateTime(order.createAt)}</TableCell>
              </TableRow>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
