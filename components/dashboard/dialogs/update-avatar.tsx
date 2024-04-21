import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {ChangeAvatarForm} from "../form/update-avatar";

export function UpdateAvatar(prop: {userImg: string}) {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>Cập nhật ảnh đại diện</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cập nhật ảnh đại diện</DialogTitle>
        </DialogHeader>
        <ChangeAvatarForm userImg={prop.userImg} />
      </DialogContent>
    </Dialog>
  );
}
