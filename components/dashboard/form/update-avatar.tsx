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

export function ChangeAvatarForm(prop: {userImg: string}) {
  const [preview, setPreview] = useState(prop.userImg);
  const form = useForm();

  function submitCircleRegistration(value: any) {
    console.log({value});
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
          <Button className="w-full" type="submit">
            Cập nhật
          </Button>
        </form>
      </Form>
    </>
  );
}
