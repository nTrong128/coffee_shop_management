import {CurrentUser} from "@/lib/auth";

const ServerPage = async () => {
  const user = await CurrentUser();

  return <div>{JSON.stringify(user)}</div>;
};

export default ServerPage;
