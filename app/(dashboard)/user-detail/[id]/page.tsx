import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {AvatarImage, AvatarFallback, Avatar} from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {Button} from "@/components/ui/button";

import {Role, User} from "@/types";
import {getUserById} from "@/data/account";

export default async function Post({params}: {params: {id: string}}) {
  const user = await getUserById(params.id);
  if (!user) {
    return <p>User not found</p>;
  }
  const user_detail = user as User;
  // return <p>{JSON.stringify(user)}</p>;
  return (
    <Card className="m-10">
      <CardHeader>
        <CardTitle>User Information</CardTitle>
        <CardDescription>You can edit your information here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={user_detail.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input id="username" value={user_detail.username} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input id="image" placeholder="Image" />
            <Avatar className="h-16 w-16">
              <AvatarImage src={user_detail?.image || ""} />
              <AvatarFallback className="h-16 w-16 flex items-center justify-center rounded-lg bg-gray-300 text-gray-600 font-bold"></AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Chọn chức vụ" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Chức vụ</SelectLabel>
                  <SelectItem value={Role.ADMIN}>Quản lý</SelectItem>
                  <SelectItem value={Role.USER}>Nhân viên</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              placeholder="Address"
              value={user_detail?.user_address}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              placeholder="Phone Number"
              value={user_detail?.user_phone}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="birthday">Birthday</Label>
            <Input
              id="birthday"
              value={user_detail?.user_birth?.toLocaleDateString()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="wage">Wage Rate</Label>
            <Input
              id="wage"
              placeholder="Wage Rate"
              value={user_detail?.wage_rate}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 items-center">
        <Button variant="outline">Cancel</Button>
        <Button>Save</Button>
      </CardFooter>
    </Card>
  );
}
