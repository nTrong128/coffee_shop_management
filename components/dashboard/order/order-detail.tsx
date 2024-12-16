"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { OrderType } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { printDiv } from "@/lib/print-div";
import { formatDateTime } from "@/lib/DateTime";

export default function OrderDetail(props: { invoice: OrderType }) {
  const { invoice } = props;
  const router = useRouter();
  return (
    <div className="p-4">
      <Button size={"lg"} className="my-2" onClick={() => router.back()}>
        Quay lại
      </Button>
      <div id="invoice" className="shadow-md border-t p-4">
        <div className="p-4 flex justify-between">
          <div className="space-y-4 pt-4">
            <p className="text-2xl">
              Số hóa đơn: #{invoice.order_id.substring(0, 8).toUpperCase()}
            </p>
            <p>Ngày: {formatDateTime(invoice.createAt)}</p>
            <div className="py-6">
              <span>Nhân viên: {invoice.User.name}</span>
            </div>
          </div>
          {/* Logo and address */}
          <div className="text-end items-end flex flex-col">
            <Image
              loading="lazy"
              src="/images/logo.svg"
              alt="logo"
              width={100}
              height={100}
            />
            <p className="text-3xl">Quán cà phê XYZ</p>
            <p>Địa chỉ: 123 Đường ABC, Quận XYZ, TP.HCM</p>
          </div>
        </div>
        <div>
          <div className="flex gap-x-2 mb-2">
            <p>Khách hàng:</p>
            <p className="font-semibold">
              {invoice.Customer
                ? invoice.Customer.customer_name
                : "Khách vãng lai"}
            </p>
          </div>
          {invoice.Customer && (
            <div className="space-y-2">
              <p>Điểm tích lũy lần này: {invoice.order_total / 1000}</p>
              <p>
                Tổng điểm tích lũy:{" "}
                {invoice.customer_old_point + invoice.order_total / 1000}
              </p>
            </div>
          )}
        </div>
        <div className="p-4">
          <div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="">Sản phẩm</TableHead>
                  <TableHead className="w-1/6">Số lượng</TableHead>
                  <TableHead className="w-1/6">Đơn giá</TableHead>
                  <TableHead className="text-right w-1/6">Thành tiền</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.Order_Detail.map((item: any) => (
                  <TableRow key={item.productId}>
                    <TableCell>{item.product.product_name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.price}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity * item.price}
                    </TableCell>
                  </TableRow>
                ))}
                <br />
                <br />
                <TableRow>
                  <TableCell className="font-semibold" colSpan={3}>
                    Tạm tính
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {invoice.order_total} VNĐ
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell className="font-semibold" colSpan={3}>
                    Tổng cộng
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {invoice.order_total} VNĐ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold" colSpan={3}>
                    Tiền nhận
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {invoice.order_received} VNĐ
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-semibold" colSpan={3}>
                    Trả lại
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {invoice.order_received - invoice.order_total} VNĐ
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <div className="border-t">
              <p className="p-4 italic">Ghi chú: {invoice.order_note}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end p-4">
        <Button onClick={() => printDiv("invoice")} size={"lg"}>
          In hóa đơn
        </Button>
      </div>
    </div>
  );
}
