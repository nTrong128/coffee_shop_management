import {CardTitle, CardHeader, CardContent, Card} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import AddUserDialog from "@/components/user/add-user-dialog";
import {CheckCircle, User} from "lucide-react";
import {getAllUser} from "@/actions/getAllUser";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import UserDetail from "../user/user-detail-dialog";
import Link from "next/link";
import {Role} from "@/types";

export async function UserTable() {
  const {data: users} = await getAllUser();
  return (
    <div className="m-y-4 mx-10 flex flex-col">
      <Card className="flex-1">
        <CardHeader className="flex flex-col md:flex-row md:items-start md:gap-4 bg-gray-200 rounded-t-lg">
          <div className="flex items-center gap-2 ">
            <User></User>
            <CardTitle>Quản lý người dùng</CardTitle>
          </div>
          <div className="flex flex-1 gap-2 md:ml-auto md:justify-end md:gap-4 lg:gap-6">
            <AddUserDialog />
          </div>
        </CardHeader>
        <CardContent className="p-0 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px] text-center">Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Chức vụ</TableHead>
                <TableHead className="text-center">Trạng thái</TableHead>
                <TableHead className="text-center"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-semibold text-center">
                    {user.name}
                  </TableCell>

                  <TableCell className="text-center">{user.email}</TableCell>

                  <TableCell className="text-center">{user.role}</TableCell>
                  <TableCell className="flex justify-center">
                    <CheckCircle className="text-green-500"></CheckCircle>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-x-2 justify-center">
                      <Link href={`/user-detail/${user.id}`}>
                        <Button className="bg-emerald-500 hover:bg-lime-900">
                          Chi tiết
                        </Button>
                        {/* // TODO - Add user detail dialog */}
                      </Link>
                      <Link href={`/user-detail/${user.id}`}>
                        <Button>Chỉnh sửa</Button>
                        {/* // TODO - Add user change detail dialog */}
                      </Link>
                      <Link href={`/user-detail/${user.id}`}>
                        <Button> Deactive </Button>
                        {/* // TODO - Add user change detail dialog */}
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
