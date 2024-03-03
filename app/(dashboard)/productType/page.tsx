import {CoffeeCard} from "@/components/content/coffee-card";
import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import {FileEditIcon, List, TrashIcon} from "lucide-react";
import {getAllProductTypes} from "@/actions/getAllProductType";
import AddProductTypeDialog from "@/components/product/add_type_modals";

const Transaction = async () => {
  const product_types = await getAllProductTypes();

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <List />
            <CardTitle>Quản lý loại món</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <Button>Thêm loại</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Tên Loại</TableHead>
                <TableHead>Mô tả</TableHead>
                <TableHead className="w-[250px]">Tác Vụ</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {product_types.data.map((product_type) => (
                <TableRow key={product_type.product_type_id}>
                  <TableCell>{product_type.product_type_name}</TableCell>
                  <TableCell>{product_type.product_type_desc}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button
                      className="rounded-full text-blue-700 bg-blue-100"
                      size="icon"
                      variant="ghost">
                      <FileEditIcon className="w-6 h-6" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      className="rounded-full text-red-700 bg-red-100"
                      size="icon"
                      variant="ghost">
                      <TrashIcon className="w-6 h-6" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </main>
  );
};

export default Transaction;
