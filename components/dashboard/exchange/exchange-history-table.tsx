"use client";
import {
  Table,
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
          <TableHead>STT</TableHead>
          <TableHead>Khách hàng</TableHead>
          <TableHead>Tên quà</TableHead>
          <TableHead>Nhân viên đổi</TableHead>
          <TableHead>Số điểm</TableHead>
          <TableHead>Thời gian đổi</TableHead>
        </TableHeader>
        {histories.map((history, index) => (
          <TableRow key={history.history_id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{history.customer.customer_name}</TableCell>
            <TableCell>{history.gift.gift_name}</TableCell>
            <TableCell>{history.staff.name}</TableCell>
            <TableCell>{history.exchange_point}</TableCell>
            <TableCell>{formatDateTime(history.createAt)}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
}
