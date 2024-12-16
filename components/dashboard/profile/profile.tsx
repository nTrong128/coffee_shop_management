import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { formatDate } from "@/lib/DateTime";
import Image from "next/image";
import { ChangePasswordDialog } from "../dialogs/change-password-dialog";
import { UpdateAvatar } from "../dialogs/update-avatar";
import { ChangePersonalInformation } from "../dialogs/change-personal-information";

export function Profile(prop: { user: any }) {
  const user = prop.user;
  return (
    <Card className="w-full mx-auto">
      <CardHeader className="pb-0 mb-12 border-b">
        <CardTitle>Thông tin cá nhân</CardTitle>
        <CardDescription>Xem thông tin cá nhân của bản.</CardDescription>
      </CardHeader>
      <CardContent className="block gap-x-12 md:flex">
        <div className="mb-8">
          <div className="text-center space-y-4 flex flex-col items-center">
            <Image
              loading="lazy"
              src={user.image || "/images/placeholderAvatar.jpg"}
              alt="avatar"
              width={120}
              height={120}
            />
            <div className="font-semibold text-lg">{user?.name}</div>
            <div className="text-lg">{user?.username}</div>
            <div className="flex items-center space-x-4">
              <ChangePasswordDialog username={user.username} />
            </div>
            <div className="flex items-center space-x-4">
              <UpdateAvatar user={user} />
            </div>
          </div>
        </div>
        <div className="shrink space-y-4">
          <div className="flex items-center space-x-4">
            <Label className="w-36" htmlFor="email">
              Địa chỉ Email
            </Label>
            <div className="flex items-center space-x-4">
              <div>{user?.email}</div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Label className="w-36" htmlFor="role">
              Loại tài khoản
            </Label>
            <div className="flex items-center space-x-4">
              <div className="font-semibold bg-green-400 rounded-3xl px-2 py-1">
                {user.role}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Label className="w-36" htmlFor="phone">
              Số điện thoại
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
              Chức vụ
            </Label>
            <div className="flex items-center space-x-4">
              <div>{user.Position ? user.Position.position_name : ""}</div>
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
          <ChangePersonalInformation user={user} />
        </div>
      </CardContent>
    </Card>
  );
}
