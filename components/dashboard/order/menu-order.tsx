"use client";
import {Button} from "@/components/ui/button";
import {Card, CardContent} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {formatCurrency} from "@/lib/formatCurrency";
import {CartType, CustomerType, Product, Type_ListProduct} from "@/types";
import Image from "next/image";
import {useState} from "react";
import {ConfirmOrder} from "../dialogs/confirm-order-dialog";
import {ShoppingBag} from "lucide-react";
import {ChooseCustomer} from "./choose-customer";

export function MenuAndOrder(props: {
  data: Type_ListProduct[];
  customer: CustomerType[];
}) {
  const customer = props.customer;
  const [cart, setCart] = useState<CartType[]>([]);
  const [cashReceived, setCashReceived] = useState<number>(0);
  const [orderNote, setOrderNote] = useState<string>("");
  const [customerOrder, setCustomerOrder] = useState<CustomerType | null>(null);

  const handleAddToCart = (product: Product) => {
    if (cart.some((item) => item.OrderItem.product_id === product.product_id)) {
      setCart((cart) =>
        cart.map((item) =>
          item.OrderItem.product_id === product.product_id
            ? {...item, quantity: item.quantity + 1}
            : item
        )
      );
      return;
    }

    setCart((cart) => [
      ...cart,
      {
        OrderItem: product,
        quantity: 1,
      },
    ]);
  };

  const [filter, setFilter] = useState<String>("All");
  const [active, setActive] = useState<String>("All" as String);
  const handleFilterChange = (productType: String | "All") => {
    if (productType === "All") {
      setFilter("All");
      setActive("All");
      return;
    }
    setFilter(productType);
    setActive(productType);
  };

  const data = props.data;
  const filteredProducts =
    filter === "All"
      ? data
      : data.filter((product) => product.product_type_name === filter);

  const [openConfirmOrder, setopenConfirmOrder] = useState(false);
  const AddItem = (product: Product) => {
    setCart((cart) =>
      cart.map((item) =>
        item.OrderItem.product_id === product.product_id
          ? {...item, quantity: item.quantity + 1}
          : item
      )
    );
  };
  const DeleteItem = (product: Product) => {
    if (
      cart.some(
        (item) =>
          item.OrderItem.product_id === product.product_id &&
          item.quantity === 1
      )
    ) {
      setCart((cart) =>
        cart.filter((item) => item.OrderItem.product_id !== product.product_id)
      );
      return;
    }

    setCart((cart) =>
      cart.map((item) =>
        item.OrderItem.product_id === product.product_id
          ? {...item, quantity: item.quantity - 1}
          : item
      )
    );
  };

  return (
    <>
      <section className="col-span-6 bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold mb-6 flex items-center">
          <ShoppingBag className="scale-150" /> <p className="px-2">Tạo đơn</p>
        </h1>
        <div className="flex mb-8 justify-between">
          <div className="flex gap-x-4">
            <Button
              variant={"ghost"}
              className={
                active === "All"
                  ? "bg-green-500 text-white rounded-full  hover:bg-green-600 hover:text-white"
                  : "" + "rounded-full"
              }
              onClick={() => handleFilterChange("All")}>
              Tất cả
            </Button>
            {data.map((productType) => (
              <Button
                className={
                  active === productType.product_type_name
                    ? "bg-green-500 text-white rounded-full  hover:bg-green-600 hover:text-white"
                    : "" + "rounded-full"
                }
                key={productType.product_type_id}
                onClick={() => {
                  handleFilterChange(productType.product_type_name as String);
                }}
                variant="ghost">
                {productType.product_type_name}
              </Button>
            ))}
          </div>
          <Input
            type="text"
            placeholder="Tìm kiếm..."
            className="w-5/12 rounded-full px-4 py-2 border border-gray-300 focus:ring-2"
          />
        </div>
        <div className="grid grid-cols-4 gap-2">
          {filteredProducts.map((productType) =>
            productType.product_list.map((product) => (
              <Card key={product.product_id}>
                <CardContent
                  onClick={() => {
                    handleAddToCart(product);
                  }}>
                  <div>
                    <Image
                      alt="Product Image"
                      className="mt-6 mx-auto aspect-square object-cover border border-gray-200 rounded-lg dark:border-gray-800"
                      height={220}
                      priority
                      src={product.product_image || "/placeholder.svg"}
                      width={220}
                    />
                    <p className="font-semibold text-xl sm:text-2xl my-2">
                      {product.product_name}
                    </p>
                    <p className="text-sm leading-none my-2">
                      {product.product_desc}
                    </p>
                    <p className="text-lg">
                      {formatCurrency(product.product_price) as string}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </section>
      <aside className="bg-white col-span-4 p-8 rounded-xl shadow">
        <div className="flex justify-between">
          <span className="text-2xl font-semibold mb-4">Đơn hàng</span>
          {cart.length > 0 && (
            <Button
              className="bg-green-500 text-white rounded-full  hover:bg-green-600 hover:text-white"
              onClick={() => {
                setCart([]);
                setOrderNote("");
              }}>
              Hủy, tạo đơn mới
            </Button>
          )}
        </div>

        <div className="space-y-4 mb-8">
          {cart.length === 0 ? (
            <p className="text-gray-500">Trống</p>
          ) : (
            cart.map((product) => (
              <div
                key={product.OrderItem.product_id}
                className="grid grid-cols-3">
                <span className="">{product.OrderItem.product_name}</span>
                <div className="flex flex-row justify-evenly items-center">
                  <Button
                    onClick={() => DeleteItem(product.OrderItem)}
                    variant={"ghost"}
                    className="bg-gray-200 hover:bg-gray-400 rounded-full">
                    -
                  </Button>
                  <Input
                    readOnly
                    className="w-1/3 mx-2 text-center"
                    value={product.quantity}
                  />
                  <Button
                    onClick={() => AddItem(product.OrderItem)}
                    variant={"ghost"}
                    className="bg-gray-200 hover:bg-gray-400 rounded-full">
                    +
                  </Button>
                </div>

                <span className="text-end">
                  {formatCurrency(product.OrderItem.product_price)}
                </span>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <>
            {/* //TODO ADD CUSTOMER HERE */}
            <div className="flex justify-between my-2">
              <span className="text-xl font-semibold">Khách hàng:</span>
              <ChooseCustomer
                customer={customer}
                setCustomerOrder={setCustomerOrder}
              />
            </div>

            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Tổng tiền nhận:</h3>

              <Input
                className="text-xl text-right font-semibold w-1/3"
                type="number"
                onKeyUp={(e: any) => {
                  setCashReceived(e.target.value * 1000);
                }}
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold">Tổng cộng:</h3>
              <span className="text-xl font-bold">
                {
                  formatCurrency(
                    cart.reduce(
                      (acc, product) =>
                        acc +
                        product.OrderItem.product_price * product.quantity,
                      0
                    )
                  ) as string
                }
              </span>
            </div>

            {cashReceived > 0 && (
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold">Tổng trả khách:</h3>
                <span className="text-xl font-bold">
                  {
                    formatCurrency(
                      cashReceived -
                        cart.reduce(
                          (acc, product) =>
                            acc +
                            product.OrderItem.product_price * product.quantity,
                          0
                        )
                    ) as string
                  }
                </span>
              </div>
            )}
            <div>
              <Textarea
                className="w-full text-lg"
                placeholder="Ghi chú"
                onChange={(e) => setOrderNote(e.target.value)}
              />
            </div>
            <ConfirmOrder
              cart={cart}
              setCart={setCart}
              cashReceived={cashReceived}
              orderNote={orderNote}
              customer={customerOrder}
            />
          </>
        )}
      </aside>
    </>
  );
}
