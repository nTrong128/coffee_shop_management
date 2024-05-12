import {Button} from "@/components/ui/button";

import Image from "next/image";
import {Input} from "@/components/ui/input";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container grid items-center gap-6 px-4 md:px-6">
            <div className="space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Hệ thống quản lý quán cà phê
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Ứng dụng toàn diện để quản lý nhà hàng của bạn. An toàn, tiện
                  lợi, dễ dàng triển khai và mở rộng quy mô, cung cấp trải
                  nghiệm khách hàng tốt nhất.
                </p>
              </div>
            </div>
            <Image
              alt="Image"
              className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
              width={750}
              height={750}
              src={"/images/landingpage_1.jpg"}
            />
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container grid items-center gap-6 px-4 md:px-6">
            <div className="mx-auto grid max-w-5xl items-center gap-6 lg:grid-cols-2 lg:gap-12">
              <Image
                alt="Avatar"
                className="mx-auto aspect-square rounded-full overflow-hidden object-cover object-center"
                height="100"
                src={
                  "https://files.edgestore.dev/hkry4u6qgdduv0pb/publicFiles/_public/3f0452d4-8519-4429-8d16-b053f558fabd.jpg"
                }
                width="100"
              />
              <div className="space-y-4">
                <blockquote className="text-lg italic text-gray-500/70 dark:text-gray-500/70">
                  &quot;Tôi rất hài lòng với hệ thống quản lý nhà hàng của bạn.
                  Nó giúp tôi tiết kiệm thời gian và công sức rất nhiều.&quot;
                </blockquote>
                <p className="font-semibold">- Ông Tèo, chủ nhà hàng ABC </p>
              </div>
            </div>
          </div>
        </section>
        <section
          id="contact"
          className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container flex flex-col items-center justify-center gap-2 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                Liên hệ với chúng tôi
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400"></p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="max-w-lg flex-1"
                  placeholder="Nhập địa chỉ mail của bạn"
                  type="email"
                />
                <Button type="submit">Gửi</Button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
