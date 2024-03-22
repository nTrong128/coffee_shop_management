"use client";
import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {List} from "lucide-react";
import {SpendModal} from "@/components/dashboard/modals/spend-modal";
import {useState} from "react";
import {SpendTable} from "@/components/dashboard/table/spend-table";
import {getAllSpending} from "@/actions/spending";

export default function Spend() {
  const [modalState, setModalState] = useState(false);
  const res = getAllSpending();
  const spending = res.data;
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <List />
            <CardTitle>Quản lý chi tiêu</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <Button onClick={() => setModalState(true)}>
              Thêm chi tiêu mới
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto"></CardContent>
      </Card>
      <SpendTable spending={spending} />
      <SpendModal isOpen={modalState} setIsOpen={setModalState} />
    </main>
  );
}
