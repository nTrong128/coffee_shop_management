import {getAllProductTypeWithProducts} from "@/actions/getProductType";
import {CustomerType, Type_ListProduct} from "@/types";

import {MenuAndOrder} from "@/components/dashboard/order/menu-order";
import {LateLyOrder} from "@/components/dashboard/order/latetest-order";
import {latestOrder} from "@/actions/order";
import {getAllCustomer} from "@/actions/getCustomer";

export default async function MenuPage() {
  const response = await getAllProductTypeWithProducts();
  const data = response.data as Type_ListProduct[];
  const lastestOrder = await latestOrder();
  const latestOrder_data = lastestOrder.data;

  const customer = await getAllCustomer();
  const customer_data = customer.data;
  return (
    <>
      <MenuAndOrder data={data} customer={customer_data as CustomerType[]} />

      <p
        className="text-3xl font-bold text-center w-full  my-4
      
      ">
        Đơn 30 phút vừa qua
      </p>
      <div className="max-w-6xl mx-auto pb-10">
        <LateLyOrder data={latestOrder_data} />
      </div>
    </>
  );
}
