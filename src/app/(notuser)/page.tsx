import Main from "@/components/auth/main";
import { serverClient } from "@/lib/util/serverSBClient";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const client = serverClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (user) {
    return redirect("/home");
  }
  return (
    <>
      <Main />
    </>
  );
};
export default LoginPage;
