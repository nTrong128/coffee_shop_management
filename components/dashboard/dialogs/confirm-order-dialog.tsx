"use client";
import { CreateOrder } from "@/actions/order";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useCurrentUser } from "@/hooks/use-current-user";
import { formatDateTime } from "@/lib/DateTime";
import { formatCurrency } from "@/lib/formatCurrency";
import { CartType, CustomerType } from "@/types";
import Image from "next/image";
import { printDiv } from "@/lib/print-div";

import { useState, useTransition } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ConfirmOrderProps {
  cart: CartType[];
  cashReceived: number;
  orderNote: string;
  customer: CustomerType | null;
  setCart: (cart: CartType[]) => void;
}

export function ConfirmOrder({
  cart,
  cashReceived,
  orderNote,
  setCart,
  customer,
}: ConfirmOrderProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const orderItem = cart.map((item) => {
    return {
      productId: item.OrderItem.product_id,
      quantity: item.quantity,
      price: item.OrderItem.product_price,
    };
  });
  const staff = useCurrentUser();
  const staff_id = staff?.id || "";

  const onSubmit = async (print: boolean) => {
    startTransition(() => {
      CreateOrder({
        customer_old_point: customer ? customer.customer_point : 0,
        customer_id: customer?.customer_id || "",
        pointValue: pointValue || 0,
        items: orderItem,
        received: cashReceived,
        total: cart.reduce(
          (acc, product) =>
            acc + product.OrderItem.product_price * product.quantity,
          0,
        ),
        order_note: orderNote,
        staff_id: staff_id,
      }).then((data) => {
        setOpen(false);
        setCart([]);
        toast({
          title: "Đã tạo đơn hàng",
          description: "Đơn hàng đã được tạo thành công",
        });
        if (print) {
          printDiv("invoice-details");
        }
      });
    });
  };
  const [open, setOpen] = useState(false);

  const pointValue =
    cart.reduce(
      (acc, product) =>
        acc + product.OrderItem.product_price * product.quantity,
      0,
    ) / 1000;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full" asChild>
        <Button
          disabled={
            cashReceived <
            cart.reduce(
              (acc, product) =>
                acc + product.OrderItem.product_price * product.quantity,
              0,
            )
          }
          className="w-full bg-green-500 text-white py-8 mt-2 text-2xl hover:bg-green-700"
        >
          Thanh toán
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-y-2 text-xl max-w-3xl overflow-y-scroll max-h-[80%] mx-4">
        <p className="text-2xl font-semibold">Xác nhận đơn hàng</p>

        <div
          id="invoice-details"
          className="shadow-md border-t p-4 overflow-y-scroll"
        >
          <div className="p-4 flex justify-between">
            <div className="space-y-4 pt-5">
              <p>Ngày: {formatDateTime(new Date())}</p>
              <div className="py-6">
                <span>Nhân viên: {staff?.name}</span>
              </div>
            </div>
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
                {customer ? customer.customer_name : "Khách vãng lai"}
              </p>
            </div>
            {customer && (
              <div className="space-y-2">
                <p>Điểm tích lũy lần này: {pointValue}</p>
                <p>Tổng điểm tích lũy: {customer.customer_point}</p>
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
                    <TableHead className="text-right w-1/6">
                      Thành tiền
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cart.map((item, id) => (
                    <TableRow key={item.OrderItem.product_id && id}>
                      <TableCell>{item.OrderItem.product_name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.OrderItem.product_price}</TableCell>
                      <TableCell className="text-right">
                        {item.quantity * item.OrderItem.product_price}
                      </TableCell>
                    </TableRow>
                  ))}

                  <br />
                  <br />
                  <br />
                  <TableRow>
                    <TableCell className="font-semibold" colSpan={3}>
                      Tạm tính
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {
                        formatCurrency(
                          cart.reduce(
                            (acc, product) =>
                              acc +
                              product.OrderItem.product_price *
                                product.quantity,
                            0,
                          ),
                        ) as string
                      }
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell className="font-semibold" colSpan={3}>
                      Tổng cộng
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {
                        formatCurrency(
                          cart.reduce(
                            (acc, product) =>
                              acc +
                              product.OrderItem.product_price *
                                product.quantity,
                            0,
                          ),
                        ) as string
                      }
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold" colSpan={3}>
                      Tiền nhận
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatCurrency(cashReceived) as string}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold" colSpan={3}>
                      Trả lại
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {
                        formatCurrency(
                          cashReceived -
                            cart.reduce(
                              (acc, product) =>
                                acc +
                                product.OrderItem.product_price *
                                  product.quantity,
                              0,
                            ),
                        ) as string
                      }
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="border-t">
                <p className="p-4 italic">Ghi chú: {orderNote}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-x-2 justify-around">
          <Button
            disabled={isPending}
            onClick={() => onSubmit(true)}
            // TODO: Add print function
            className="w-45 py-8 text-xl
              bg-zinc-700
              "
          >
            Xác nhận và in hóa đơn
          </Button>
          <Button
            disabled={isPending}
            onClick={() => onSubmit(false)}
            className="w-45 bg-green-500 text-white py-8 text-xl hover:bg-green-700"
          >
            Xác nhận đơn hàng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
