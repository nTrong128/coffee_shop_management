import {isAdmin} from "@/lib/auth";

export default async function Layout({
  admin,
  user,
}: {
  admin: React.ReactNode;
  user: React.ReactNode;
}) {
  const role = await isAdmin();
  return <>{role ? admin : user}</>;
}
