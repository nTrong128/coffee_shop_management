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
import {
  Pagination,
  PaginationContent,
  PaginationNext,
  PaginationPrevious,
  PaginationItem,
} from "@/components/ui/pagination";
import {useState} from "react";
import {Input} from "@/components/ui/input";

type OrderType = {
  order_id: string;
  order_total: number;
  order_received: number;
  order_note: string | null;
  User: UserType | any;
  createAt: Date;
  Order_Detail: OrderItem[];
  Customer: {
    customer_name: string;
  } | null;
};

export function OrderTable(props: {order: OrderType[]}) {
  const router = useRouter();

  const order = props.order;
  const [searchText, setSearchText] = useState("");
  const rowsPerPage = 5;
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(rowsPerPage);

  const filteredOrder = order.filter((order) => {
    return (
      order.order_id.toLowerCase().includes(searchText.toLowerCase()) ||
      order.User.name.toLowerCase().includes(searchText.toLowerCase()) ||
      order.Customer?.customer_name
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      "Khách vãng lai".toLowerCase().includes(searchText.toLowerCase())
    );
  });
  if (!order) {
    return (
      <div className="text-center p-4 bg-gray-100 rounded-lg">
        Không có dữ liệu
      </div>
    );
  }
  return (
    <main className="space-y-4 mt-4">
      <Input
        type="text"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
        }}
        placeholder="Tìm kiếm..."
        className="w-full sm:w-5/12 rounded-full px-4 py-2 border border-gray-300 focus:ring-2"
      />
      <Table className="border rounded mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Mã hóa đơn</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Người lập</TableHead>
            <TableHead>Khách hàng</TableHead>
            <TableHead>Chi tiết</TableHead>
            <TableHead>Tổng cộng</TableHead>
            <TableHead>Ghi chú</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrder.slice(startIndex, endIndex).map((order: OrderType) => {
            return (
              <TableRow key={order.order_id}>
                <TableCell>
                  {order.order_id.substring(0, 8).toUpperCase()}
                </TableCell>
                <TableCell>{formatDateTime(order.createAt)}</TableCell>
                <TableCell>{order.User.name}</TableCell>
                <TableCell>
                  {order.Customer
                    ? order.Customer.customer_name
                    : "Khách vãng lai"}
                </TableCell>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            {/* // TODO: ADD BUTTON PAGINATION{(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)} */}
            <PaginationPrevious
              className={
                startIndex === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                if (startIndex > 0) {
                  setStartIndex(startIndex - rowsPerPage);
                  setEndIndex(endIndex - rowsPerPage);
                }
              }}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={
                endIndex >= filteredOrder.length
                  ? "pointer-events-none opacity-50"
                  : undefined
              }
              onClick={() => {
                if (endIndex < filteredOrder.length) {
                  setStartIndex(startIndex + rowsPerPage);
                  setEndIndex(endIndex + rowsPerPage);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </main>
  );
}
