import {Button} from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-slate-800 text-white h-screen flex justify-center items-center align-middle">
      <div className="flex flex-col items-center justify-center space-y-4">
        <Image
          src="/images/next-uwu-logo.avif"
          width={560}
          height={560}
          alt="404"
        />
        <p className="text-center">KHÔNG TÌM THẤY TRANG</p>
        <p>Trang bạn yêu cầu không tìm thấy hoặc có lỗi xảy ra.</p>

        <Button className="mx-auto">
          <Link href="/dashboard" className="">
            Về trang chính
          </Link>
        </Button>
      </div>
    </div>
  );
}
