import {CreateOrder} from "@/actions/order";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {useCurrentUser} from "@/hooks/use-current-user";
import {formatCurrency} from "@/lib/formatCurrency";
import {CartType} from "@/types";

import {useState, useTransition} from "react";
import {set} from "zod";

interface ConfirmOrderProps {
  cart: CartType[];
  cashReceived: number;
  orderNote: string;
  setCart: (cart: CartType[]) => void;
}

export function ConfirmOrder({
  cart,
  cashReceived,
  orderNote,
  setCart,
}: ConfirmOrderProps) {
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

  const onSubmit = async () => {
    startTransition(() => {
      CreateOrder({
        items: orderItem,
        received: cashReceived,
        total: cart.reduce(
          (acc, product) =>
            acc + product.OrderItem.product_price * product.quantity,
          0
        ),
        order_note: orderNote,
        staff_id: staff_id,
      }).then(() => {
        setOpen(false);
        setCart([]);
      });
    });
  };
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="w-full">
        <Button className="w-full bg-green-500 text-white py-8 mt-2 text-2xl hover:bg-green-700">
          Thanh toán
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-y-2 text-xl max-w-3xl">
        <p className="text-2xl font-semibold">Xác nhận đơn hàng</p>
        <div className="p-4">
          <div className="grid grid-cols-3 bg-gray-300">
            <span className="px-2 border ">Sản phẩm</span>
            <span className="px-2 border text-center">Số lượng</span>
            <span className="px-2 border text-end">Giá</span>
          </div>
          <div>
            {cart.map((product) => (
              <div
                key={product.OrderItem.product_id}
                className="grid grid-cols-3">
                <span className="px-2 border">
                  {product.OrderItem.product_name}
                </span>
                <span className="px-2 text-center border">
                  {product.quantity}
                </span>
                <span className="px-2 text-end border">
                  {formatCurrency(product.OrderItem.product_price)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <h3 className="">Tổng cộng:</h3>
          <span className="">
            {
              formatCurrency(
                cart.reduce(
                  (acc, product) =>
                    acc + product.OrderItem.product_price * product.quantity,
                  0
                )
              ) as string
            }
          </span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="">Tổng tiền nhận:</h3>
          <span className="">{formatCurrency(cashReceived) as string}</span>
        </div>
        <div className="flex justify-between items-center">
          <h3 className="">Tổng tiền trả khách:</h3>
          <span className="">
            {
              formatCurrency(
                cashReceived -
                  cart.reduce(
                    (acc, product) =>
                      acc + product.OrderItem.product_price * product.quantity,
                    0
                  )
              ) as string
            }
          </span>
        </div>
        <div>
          <p className="">Ghi chú:</p>
          <div className="border-2 min-h-20">
            <p>{orderNote}</p>
          </div>
        </div>

        <div className="flex gap-x-2 justify-around">
          <Button
            disabled={isPending}
            // onClick={onSubmit}
            // TODO: Add print function
            className="w-45 py-8 text-xl
              bg-zinc-700
              ">
            Xác nhận và in hóa đơn
          </Button>
          <Button
            disabled={isPending}
            onClick={onSubmit}
            className="w-45 bg-green-500 text-white py-8 text-xl hover:bg-green-700">
            Xác nhận đơn hàng
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
