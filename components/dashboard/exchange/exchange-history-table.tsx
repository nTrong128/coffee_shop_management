"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {formatDateTime} from "@/lib/DateTime";
import {HistoryGiftExchangeType} from "@/types";

export function ExchangeHistoryTable(prop: {
  histories: HistoryGiftExchangeType[];
}) {
  const {histories} = prop;
  console.log(histories);
  return (
    <div className="m-4 p-4">
      <p className="text-3xl text-center my-2 font-semibold">Lịch sử đổi quà</p>
      <Table className=" border">
        <TableHeader>
          <TableRow>
            <TableHead>STT</TableHead>
            <TableHead>Mã đổi</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Tên quà</TableHead>
            <TableHead>Nhân viên đổi</TableHead>
            <TableHead>Số điểm</TableHead>
            <TableHead>Thời gian đổi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {histories.map((history, index) => (
            <TableRow key={history.history_id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                {history.history_id.substring(0, 10).toUpperCase()}
              </TableCell>
              <TableCell>{history.customer.customer_name}</TableCell>
              <TableCell>{history.gift.gift_name}</TableCell>
              <TableCell>{history.staff.name}</TableCell>
              <TableCell>{history.exchange_point}</TableCell>
              <TableCell>{formatDateTime(history.createAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
