import {Landmark, ShoppingCart, Users} from "lucide-react";

export default function Home() {
  return (
    <main>
      {/* General Information */}

      <section className="py-4 px-4 border rounded-md">
        <h2 className="text-lg font-bold">7 ngày gần đây</h2>
        <div className="grid lg:grid-cols-4 gap-4 rounded-md sm:grid-cols-2">
          <div className="flex justify-between p-2 py-6 bg-blue-100 rounded ">
            <Landmark className="text-blue-500" />
            <div>
              <p className="font-bold text-lg">9.245.000 VND</p>
              <p className="text-gray-500">Doanh thu</p>
            </div>
          </div>
          <div className="flex justify-between p-2 py-6 bg-red-100 rounded ">
            <ShoppingCart className="text-red-500" />
            <div>
              <p className="font-bold text-lg">344</p>
              <p className="text-gray-500">Orders</p>
            </div>
          </div>
          <div className="flex justify-between p-2 py-6 bg-yellow-100 rounded ">
            <Users className="text-yellow-500" />
            <div>
              <p className="font-bold text-lg">178</p>
              <p className="text-gray-500">Khách hàng</p>
            </div>
          </div>
          <div className="flex justify-between p-2 py-6 bg-green-100 rounded ">
            <Landmark className="text-green-500" />
            <div>
              <p className="font-bold text-lg">2.105.000 VND</p>
              <p className="text-gray-500">Chi tiêu</p>
            </div>
          </div>
        </div>
      </section>

      {/* Chart Revenue */}
      <section className="py-4 px-4 border rounded-md">
        <h2 className="text-lg font-bold">Biểu đồ doanh thu</h2>
      </section>
    </main>
  );
}
