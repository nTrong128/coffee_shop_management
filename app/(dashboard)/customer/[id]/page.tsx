import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {List} from "lucide-react";

import {getCustomerById} from "@/actions/getCustomer";
import {CustomerDetail} from "@/components/dashboard/customer/customer-detail";

export default async function CustomerDetailPage({
  params,
}: {
  params: {id: string};
}) {
  const res = await getCustomerById(params.id);

  const customer = res.data;

  if (!customer) {
    return <div className="text-center text-4xl">Khách hàng không tồn tại</div>;
  }
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <List />
            <CardTitle>Chi tiết khách hàng</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto"></CardContent>
      </Card>

      <CustomerDetail customer={customer} />
    </main>
  );
}
