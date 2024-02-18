import {
  CardTitle,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import {ResponsiveBar} from "@nivo/bar";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import {DollarSign, User, Warehouse} from "lucide-react";
import {usePathname} from "next/navigation";

export default function StaffDashBoard() {
  const pathname = usePathname();
  return (
    <div className="flex h-screen bg-gray-100">
      <div className="flex flex-col flex-1 p-6">
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Total Sales
              </CardTitle>
              <DollarSign />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                $12,345.67
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                +15.2% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Orders Today
              </CardTitle>
              <Warehouse />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                New orders placed today
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium">
                Number of Tables
              </CardTitle>
              <User />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                12/15
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Currently available
              </p>
            </CardContent>
          </Card>
          {/* Card */}
        </div>
        <BarChart className="w-full h-[300px] mb-6" />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>ORD001</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>$25.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ORD002</TableCell>
              <TableCell>Processing</TableCell>
              <TableCell>Jane Smith</TableCell>
              <TableCell>$45.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ORD003</TableCell>
              <TableCell>Shipped</TableCell>
              <TableCell>Michael Johnson</TableCell>
              <TableCell>$60.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ORD004</TableCell>
              <TableCell>Pending</TableCell>
              <TableCell>Sarah Wilson</TableCell>
              <TableCell>$30.00</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>ORD005</TableCell>
              <TableCell>Shipped</TableCell>
              <TableCell>Emily Brown</TableCell>
              <TableCell>$55.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        N
      </div>
    </div>
  );
}

function BarChart(props: any) {
  return (
    <div {...props}>
      <ResponsiveBar
        data={[
          {name: "Jan", count: 111},
          {name: "Feb", count: 157},
          {name: "Mar", count: 129},
          {name: "Apr", count: 150},
          {name: "May", count: 119},
          {name: "Jun", count: 72},
        ]}
        keys={["count"]}
        indexBy="name"
        margin={{top: 0, right: 0, bottom: 40, left: 40}}
        padding={0.3}
        colors={["#2563eb"]}
        axisBottom={{
          tickSize: 0,
          tickPadding: 16,
        }}
        axisLeft={{
          tickSize: 0,
          tickValues: 4,
          tickPadding: 16,
        }}
        gridYValues={4}
        theme={{
          tooltip: {
            chip: {
              borderRadius: "9999px",
            },
            container: {
              fontSize: "12px",
              textTransform: "capitalize",
              borderRadius: "6px",
            },
          },
          grid: {
            line: {
              stroke: "#f3f4f6",
            },
          },
        }}
        tooltipLabel={({id}) => `${id}`}
        enableLabel={false}
        role="application"
        ariaLabel="A bar chart showing data"
      />
    </div>
  );
}
