import {
  MainReport,
  ProductReport,
  ProductTypeReport,
  FinancialReport,
  OrderReport,
} from "@/actions/report";
import {AreaChartHero} from "@/components/dashboard/chart/areaChart";
import {BarChartHero} from "@/components/dashboard/chart/barChart";
import {DonutChartHero} from "@/components/dashboard/chart/donut-chart";
import {LineChartHero} from "@/components/dashboard/chart/lineChart";
import {formatCurrency} from "@/lib/formatCurrency";
import {Landmark, ShoppingCart, Users} from "lucide-react";

export default async function Home() {
  const res = await MainReport();
  const data = res.data;
  const res_product = await ProductReport();
  const product_report = res_product.mappedData;
  const sum_order = res_product.sum;
  const financial_res = await FinancialReport();
  const res_productType = await ProductTypeReport();
  const productType = res_productType;
  const order_report = await OrderReport();

  return (
    <main>
      <section className="py-4 px-4 border rounded-md">
        <h2 className="text-lg font-bold">7 ngày gần đây</h2>
        <div className="grid lg:grid-cols-4 gap-4 rounded-md sm:grid-cols-2">
          <div className="flex justify-between p-2 py-6 bg-blue-100 rounded ">
            <Landmark className="text-blue-500" />
            <div>
              <p className="text-gray-500 text-end">Doanh thu</p>
              <p className="font-bold text-lg text-end">
                {formatCurrency(data.income as number)}
              </p>
            </div>
          </div>
          <div className="flex justify-between p-2 py-6 bg-red-100 rounded ">
            <ShoppingCart className="text-red-500" />
            <div>
              <p className="text-gray-500 text-end">Số đơn</p>
              <p className="font-bold text-lg text-end">{data.order}</p>
            </div>
          </div>
          <div className="flex justify-between p-2 py-6 bg-yellow-100 rounded ">
            <Users className="text-yellow-500" />
            <div>
              <p className="text-gray-500 text-end">Số khách mới</p>
              <p className="font-bold text-lg text-end">{data.customer}</p>
            </div>
          </div>
          <div className="flex justify-between p-2 py-6 bg-green-100 rounded ">
            <Landmark className="text-green-500" />
            <div>
              <p className="text-gray-500 text-end">Chi tiêu</p>
              <p className="font-bold text-lg text-end">
                {data.consume ? formatCurrency(data.consume) : "Không có"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Product Sumarize */}
      <section className="py-4 mx-4 border rounded-md">
        <div className="block lg:flex shadow-lg m-4 flex-wrap">
          <div className="flex-1 shadow-sm">
            <p className="text-lg text-center font-bold">
              Biểu đồ doanh số theo món gần đây
            </p>
            <AreaChartHero data={financial_res} />
          </div>
          <div className="shadow-sm mx-auto">
            <p className="text-lg text-center font-bold">
              Biểu đồ số lượng món theo loại
            </p>
            <DonutChartHero data={productType} index="name" category="value" />
          </div>
        </div>
        <div className="mt-10 flex flex-wrap">
          <div className="mx-auto">
            <p className="text-lg text-center font-bold">
              Biểu đồ số lượng mua theo món trong tháng
            </p>
            <BarChartHero data={product_report} sum={sum_order} />
          </div>
          <div className="flex-1 shadow-sm">
            <LineChartHero data={order_report} />
          </div>
        </div>
      </section>
    </main>
  );
}
