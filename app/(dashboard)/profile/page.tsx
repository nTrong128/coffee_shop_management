import {Profile} from "@/components/dashboard/profile/profile";
import {getUserById} from "@/data/account";
import {CurrentUser} from "@/lib/auth";

export default async function ProfilePage() {
  const session = await CurrentUser();
  if (!session) {
    return <div>Loading...</div>;
  }
  const user = await getUserById(session.id);
  return (
    <div className="flex h-screen mx-10 mt-4">
      <div className="mx-auto">
        <Profile user={user} />
      </div>
    </div>
  );
}
