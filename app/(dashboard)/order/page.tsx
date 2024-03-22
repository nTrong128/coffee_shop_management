import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {List} from "lucide-react";
import {SpendModal} from "@/components/dashboard/dialogs/spend-dialog";
import {SpendTable} from "@/components/dashboard/table/spend-table";
import {GetAllOrder} from "@/actions/order";
import {OrderTable} from "@/components/dashboard/table/order-table";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default async function OrderPage() {
  const res = await GetAllOrder();
  const order = res.data;
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <List />
            <CardTitle>Quản lý chi tiêu</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <Link href="/menu">
              <Button>Tạo hóa đơn mới</Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto"></CardContent>
      </Card>
      <OrderTable order={order} />
    </main>
  );
}
