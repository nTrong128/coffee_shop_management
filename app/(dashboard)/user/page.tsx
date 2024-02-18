"use client";
import {UserTable} from "@/components/content/user-table";
import {useCurrentUser} from "@/hooks/use-current-user";

const Home = () => {
  const user = useCurrentUser();

  return (
    <main className=" text-slate-900 bg-cover bg-center bg-no-repeat">
      <p className="text-lg py-4">{JSON.stringify(user)}</p>

      <UserTable></UserTable>
    </main>
  );
};

export default Home;
