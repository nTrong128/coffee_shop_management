import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {List} from "lucide-react";

import {ExchangeTable} from "@/components/dashboard/exchange/exchangeTable";
import {NewExchangeDialog} from "@/components/dashboard/exchange/new-exchange-dialog";
import {GetAllGift} from "@/actions/gift";
import {CustomerType, GiftType} from "@/types";
import {getAllCustomer} from "@/actions/getCustomer";

export default async function ExchangePage() {
  const res = await GetAllGift();
  const res_customer = await getAllCustomer();
  const customers = res_customer.data;
  const gifts = res.data;
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <List />
            <CardTitle>Đổi thưởng bằng điểm tích lũy</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <NewExchangeDialog />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto"></CardContent>
      </Card>
      <ExchangeTable
        gifts={gifts as GiftType[]}
        customers={customers as CustomerType[]}
      />
    </main>
  );
}
