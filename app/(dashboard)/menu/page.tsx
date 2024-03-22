import {getAllProductTypeWithProducts} from "@/actions/getProductType";
import {Type_ListProduct} from "@/types";

import {MenuAndOrder} from "@/components/dashboard/order/menu-order";
import {LateLyOrder} from "@/components/dashboard/order/latetest-order";
import {latestOrder} from "@/actions/order";

export default async function MenuPage() {
  const response = await getAllProductTypeWithProducts();
  const data = response.data as Type_ListProduct[];
  const lastestOrder = await latestOrder();
  const latestOrder_data = lastestOrder.data;
  return (
    <>
      <div className="grid grid-cols-10 gap-8">
        <MenuAndOrder data={data} />
      </div>
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
