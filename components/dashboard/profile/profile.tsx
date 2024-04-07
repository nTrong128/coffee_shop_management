import {Button} from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {formatDate} from "@/lib/DateTime";
import {UserType} from "@/types";
import Image from "next/image";
export function Profile(prop: {user: any}) {
  const user = prop.user;
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="pb-0">
        <CardTitle>Thông tin cá nhân</CardTitle>
        <CardDescription>Xem thông tin cá nhân của bản.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="name">
            Tên:
          </Label>
          <div className="flex items-center space-x-4">
            <div className="font-semibold">{user?.name}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="username">
            Tên tài khoản
          </Label>
          <div className="flex items-center space-x-4">
            <div className="font-semibold">{user?.username}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="email">
            Địa chỉ Email
          </Label>
          <div className="flex items-center space-x-4">
            <div>{user?.email}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="avatar">
            Avatar
          </Label>
          <div>
            <Button>Thay đổi ảnh đại diện</Button>
          </div>
          {/* <div className="flex items-center space-x-4">
            (user?.avatar ? (
            <Image
              alt="Avatar"
              className="rounded-full"
              height="96"
              src={user?.image}
              style={{
                aspectRatio: "96/96",
                objectFit: "cover",
              }}
              width="96"
            />
            ):
            <Image
              alt="Avatar"
              className="rounded-full"
              height="96"
              src="/placeholder.svg"
              style={{
                aspectRatio: "96/96",
                objectFit: "cover",
              }}
              width="96"
            />
            )
          </div> */}
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="password">
            Password
          </Label>
          <div className="flex items-center space-x-4">
            <Button>Đổi mật khẩu?</Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="role">
            Role
          </Label>
          <div className="flex items-center space-x-4">
            <div className="font-semibold bg-green-400 rounded-3xl p-2">
              {user.role}
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="phone">
            Phone
          </Label>
          <div className="flex items-center space-x-4">
            <div>{user.user_phone}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="address">
            Địa chỉ
          </Label>
          <div className="flex items-center space-x-4">
            <div>{user.user_address}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="dob">
            Ngày sinh
          </Label>
          <div className="flex items-center space-x-4">
            <div>{formatDate(user.user_birth)}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="wage">
            Hệ số lương
          </Label>
          <div className="flex items-center space-x-4">
            <div>{user.wage_rate}</div>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Label className="w-36" htmlFor="status">
            Trạng thái tài khoản
          </Label>
          <div className="flex items-center space-x-4">
            <div className="font-semibold text-green-500">
              {user.user_status && "Đang hoạt động"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
