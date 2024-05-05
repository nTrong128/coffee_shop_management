"use client";

import {useForm} from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {ChangeEvent, useState} from "react";
import {Button} from "@/components/ui/button";
import {User} from "lucide-react";
import {useEdgeStore} from "@/lib/edgestore";
import {UserType} from "@/types";
import {UpdateUserImage} from "@/actions/updateUserAvatar";
import {useToast} from "@/components/ui/use-toast";

function getImageData(event: ChangeEvent<HTMLInputElement>) {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return {files, displayUrl};
}

export function ChangeAvatarForm(prop: {
  user: UserType;
  setOpen: (open: boolean) => void;
}) {
  const user = prop.user;
  const setOpen = prop.setOpen;
  const [preview, setPreview] = useState(user.image);
  const form = useForm();
  const {edgestore} = useEdgeStore();
  const {toast} = useToast();
  const [pending, setPending] = useState(false);

  async function submitCircleRegistration(value: any) {
    setPending(true);

    const res = await edgestore.publicFiles.upload({
      file: value.circle_image[0] as File,
    });
    console.log(res.url);

    UpdateUserImage(user.username!, res.url).then((res) => {
      if (res.success) {
        toast({
          title: "Thành công",
          description: "Cập nhật ảnh đại diện thành công",
        });
        setOpen(false);
        setPending(false);
        return;
      }
      toast({
        title: "Thất bại",
        description: "Cập nhật ảnh đại diện thất bại",
      });
      setPending(false);
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          className="space-y-8"
          onSubmit={form.handleSubmit(submitCircleRegistration)}>
          <Avatar className="w-24 h-24 mx-auto">
            <AvatarImage src={preview} />
            <AvatarFallback>
              <User size={32} />
            </AvatarFallback>
          </Avatar>
          <FormField
            control={form.control}
            name="circle_image"
            render={({field: {onChange, value, ...rest}}) => (
              <>
                <FormItem>
                  <FormLabel>Chọn ảnh(png/jpeg):</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/png, image/jpeg"
                      {...rest}
                      onChange={(event) => {
                        const {files, displayUrl} = getImageData(event);
                        setPreview(displayUrl);
                        onChange(files);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Chọn ảnh để cập nhật ảnh đại diện của bạn
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              </>
            )}
          />
          <Button className="w-full" type="submit" disabled={pending}>
            Cập nhật
          </Button>
        </form>
      </Form>
    </>
  );
}
