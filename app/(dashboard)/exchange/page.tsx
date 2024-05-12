import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {List} from "lucide-react";

import {ExchangeTable} from "@/components/dashboard/exchange/exchangeTable";
import {NewExchangeDialog} from "@/components/dashboard/exchange/new-exchange-dialog";
import {GetAllGift, GetAllHistoryGiftExchange} from "@/actions/gift";
import {CustomerType, GiftType, HistoryGiftExchangeType, Role} from "@/types";
import {getAllCustomer} from "@/actions/getCustomer";
import {ExchangeHistoryTable} from "@/components/dashboard/exchange/exchange-history-table";
import {auth} from "@/auth";

export default async function ExchangePage() {
  const res = await GetAllGift();
  const res_customer = await getAllCustomer();
  const res_history = await GetAllHistoryGiftExchange();
  const customers = res_customer.data;
  const gifts = res.data;
  const history = res_history.data;
  const user = await auth();
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <List />
            <CardTitle>Đổi thưởng bằng điểm tích lũy</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            {user?.user.role === Role.ADMIN && <NewExchangeDialog />}
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto"></CardContent>
      </Card>
      <ExchangeTable
        gifts={gifts as GiftType[]}
        customers={customers as CustomerType[]}
      />
      <ExchangeHistoryTable histories={history as any} />
    </main>
  );
}
