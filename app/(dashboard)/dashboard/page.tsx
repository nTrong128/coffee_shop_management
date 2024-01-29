import {Button} from "@/components/ui/button";
import {auth, signOut} from "@/lib/auth";

const Home = async () => {
  const session = await auth();
  return (
    <main className="text-center flex  flex-col text-slate-100 items-center justify-center bg-cover bg-center bg-no-repeat w-screen h-screen">
      <h1 className="text-4xl py-4">Chào mừng bạn đến với Hệ Thống Quản Lý Cửa Hàng Cà Phê</h1>
      <p className="text-lg py-4">Quản lý cửa hàng của bạn một cách dễ dàng, nhanh chóng!</p>
      <p className="text-lg py-4">{JSON.stringify(session)}</p>
      <h1 className="text-9xl py-4">LOGGED IN</h1>

      <form
        action={async () => {
          "use server";
          // TODO: change to use client Login Signout
          await signOut();
        }}>
        <Button type="submit" className="m-5 text-xl hover:bg-cyan-950 p-4">
          ĐĂNG XUẤT
        </Button>
      </form>
    </main>
  );
};

export default Home;
