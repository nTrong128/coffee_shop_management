import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import {formatDate} from "@/lib/formatDate";

export function SpendTable(props: {spending: any}) {
  if (!props.spending) {
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
          <TableHead>Tên chi tiêu</TableHead>
          <TableHead>Đơn giá</TableHead>
          <TableHead>Nội dung</TableHead>
          <TableHead>Ngày lập</TableHead>
          <TableHead>Người lập</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.spending.map((spend: any) => {
          return (
            <TableRow key={spend.spending_id}>
              <TableCell>{spend.spending_name}</TableCell>
              <TableCell>{spend.spending_price}</TableCell>
              <TableCell>{spend.spending_desc}</TableCell>
              <TableCell>{formatDate(spend.createAt)}</TableCell>
              <TableCell>{spend.staff.name}</TableCell>
            </TableRow>
          );
        })}
        {/* <TableRow className="bg-gray-200 text-xl">
          <TableCell>{props.spending.length} Chi tiêu. </TableCell>
          <TableCell colSpan={3}>
            Tổng cộng:{" "}
            {props.spending.reduce(
              (acc: any, spend: {spending_price: any}) =>
                acc + spend.spending_price,
              0
            )}
          </TableCell>
        </TableRow> */}
        {/* //TODO CREATE SUMMARIZE HERE */}
      </TableBody>
    </Table>
  );
}
