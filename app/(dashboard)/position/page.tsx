import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {CircleDollarSign} from "lucide-react";
import {SpendModal} from "@/components/dashboard/dialogs/spend-dialog";
import {getAllPosition} from "@/actions/Position";
import {PositionTable} from "@/components/dashboard/table/position-table";
import {PositionType} from "@/types";
import {AddPositionDialog} from "@/components/dashboard/dialogs/add-position-dialog";

export default async function PositionPage() {
  const res = await getAllPosition();
  const position = res.data;
  return (
    <main className="flex flex-1 flex-col p-4 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <CircleDollarSign />
            <CardTitle>Quản lý chức vụ</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <AddPositionDialog />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto"></CardContent>
      </Card>
      <PositionTable position={position as PositionType[]} />
    </main>
  );
}
