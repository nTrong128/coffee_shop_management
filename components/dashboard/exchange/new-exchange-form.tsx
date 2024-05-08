"use client";
import {
  Form,
  FormField,
  FormControl,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {FormError} from "@/components/auth/error-form";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {AddGiftSchema} from "@/schemas";
import {ChangeEvent, useState, useTransition} from "react";
import {z} from "zod";
import {useToast} from "@/components/ui/use-toast";
import {CreateGift} from "@/actions/gift";
import {useEdgeStore} from "@/lib/edgestore";
import Image from "next/image";
import {Trash2} from "lucide-react";
import {Textarea} from "@/components/ui/textarea";

export default function AddGiftForm(prop: {setOpen: (open: boolean) => void}) {
  const setOpen = prop.setOpen;
  const form = useForm<z.infer<typeof AddGiftSchema>>({
    resolver: zodResolver(AddGiftSchema),
  });
  const [isPendding, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const {toast} = useToast();
  const {edgestore} = useEdgeStore();
  const [selectedImage, setSelectedImage] = useState<any | File>();

  const onSubmit = async (values: z.infer<typeof AddGiftSchema>) => {
    setError("");

    startTransition(async () => {
      if (selectedImage) {
        const res = await edgestore.publicFiles.upload({
          file: selectedImage as File,
        });
        values.gift_image = res.url;
      }

      CreateGift(values).then((data) => {
        setError(data.error);
        if (data.success) {
          setError("");
          setOpen(false);
          toast({
            title: "Thành công",
            description: data.success,
          });
          return;
        }
        toast({
          title: "Lỗi",
          description: data.error,
        });
      });
    });
  };

  const imageChange = (e: any) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="gift_name"
          render={({field}) => (
            <FormItem>
              <FormLabel>Tên quà</FormLabel>
              <FormControl>
                <Input
                  disabled={isPendding}
                  {...field}
                  placeholder="Gấu bông"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gift_price"
          render={({field}) => (
            <FormItem>
              <FormLabel>Số điểm quy đổi</FormLabel>
              <FormControl>
                <Input
                  disabled={isPendding}
                  {...field}
                  placeholder="999"
                  type="number"
                  step="1"
                  min="0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gift_desc"
          render={({field}) => (
            <FormItem>
              <FormLabel>Mô tả quà</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isPendding}
                  {...field}
                  placeholder="Gấu bông siêu toa khổng lồ..."
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gift_image"
          render={({field}) => (
            <FormItem>
              <FormLabel>Ảnh quà đổi thưởng</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/png, image/jpeg"
                  disabled={isPendding}
                  {...field}
                  onChange={imageChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedImage && (
          <div className="flex flexr-row justify-around items-center">
            <Image
              width={240}
              height={240}
              src={URL.createObjectURL(selectedImage)}
              alt="Product Image Preview"
            />
            <Button
              className="text-red-700 bg-transparent hover:text-red-800 hover:bg-red-100 rounded-full"
              onClick={() => setSelectedImage(undefined)}>
              <Trash2 />
            </Button>
          </div>
        )}

        <FormError message={error} />
        <Button
          disabled={isPendding}
          type="submit"
          size="lg"
          className=" mt-6 w-full">
          Thêm
        </Button>
      </form>
    </Form>
  );
}
