"use client";
import {Button} from "@/components/ui/button";
import {CardContent, Card} from "@/components/ui/card";
import Image from "next/image";
import {getAllProductTypeWithProducts} from "@/actions/getProductType";
import {CartType, Product, Type_ListProduct} from "@/types";
import {useEffect, useState} from "react";
import {formatCurrency} from "@/lib/formatCurrency";
import {Input} from "@/components/ui/input";

export default function OrderMenu() {
  const [data, setData] = useState<Type_ListProduct[]>([]);

  const getData = async () => {
    try {
      const response = await getAllProductTypeWithProducts();
      const data = response.data as Type_ListProduct[];
      setData(data);
    } catch (error) {
      console.log("Error fetching data", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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
  const filteredProducts =
    filter === "All"
      ? data
      : data.filter((product) => product.product_type_name === filter);

  const [cart, setCart] = useState<CartType[]>([]);

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
  const orderItem = cart.map((item) => {
    return {
      productId: item.OrderItem.product_id,
      quantity: item.quantity,
      price: item.OrderItem.product_price,
    };
  });

  return (
    <main className="grid grid-cols-3 gap-8">
      <section className="col-span-2 bg-white p-8 rounded-xl shadow">
        <h1 className="text-4xl font-bold mb-6">Tạo đơn</h1>
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
        <div className="grid grid-cols-3 gap-2">
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
                      className="mt-6 aspect-square object-cover border border-gray-200 rounded-lg dark:border-gray-800"
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
      <aside className="bg-white p-8 rounded-xl shadow">
        <h2 className="text-2xl font-semibold mb-4">Đơn hàng</h2>
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

            <div className="flex justify-between items-center mb-8">
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

            <Button
              onClick={() => console.table(cart)}
              className="w-full bg-green-500 text-white">
              Checkout
            </Button>
          </>
        )}
      </aside>
    </main>
  );
}
