"use client";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableBody,
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
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Số hóa đơn</TableHead>
                <TableHead>Giá trị hóa đơn</TableHead>
                <TableHead>Điểm tích lũy</TableHead>
                <TableHead>Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.Order.map((order: any, index: any) => (
                <TableRow key={order.order_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {String(order.order_id).substring(0, 10).toUpperCase()}
                  </TableCell>
                  <TableCell>{order.order_total}</TableCell>
                  <TableCell>{order.order_total / 1000}</TableCell>
                  <TableCell>{formatDateTime(order.createAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Exchange */}
        <div className="mx-4 px-4 space-y-4">
          <p className="text-3xl font-bold text-center mb-8 mt-2">
            Lịch sử đổi thưởng
          </p>

          <Table className="border my-4">
            <TableHeader>
              <TableRow>
                <TableHead>STT</TableHead>
                <TableHead>Mã đổi</TableHead>
                <TableHead>Tên quà</TableHead>
                <TableHead>Số điểm</TableHead>
                <TableHead>Thời gian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customer.HistoryGiftExchange.map((history: any, index: any) => (
                <TableRow key={history.history_id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {String(history.history_id).substring(0, 10).toUpperCase()}
                  </TableCell>
                  <TableCell>{history.gift.gift_name}</TableCell>
                  <TableCell>{history.exchange_point}</TableCell>
                  <TableCell>{formatDateTime(history.createAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
