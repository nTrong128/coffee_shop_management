import {CurrentUser} from "@/lib/auth";

const TablePage = async () => {
  const user = await CurrentUser();

  return <div>{JSON.stringify(user)}</div>;
};

export default TablePage;
