import {UserTable} from "@/components/content/user-table";
import {NavBar} from "@/components/dashboard/navbar";
import {useCurrentUser} from "@/hooks/use-current-user";

const Home = () => {
  return (
    <main className=" text-slate-900 bg-cover bg-center bg-no-repeat">
      <UserTable></UserTable>
    </main>
  );
};

export default Home;
