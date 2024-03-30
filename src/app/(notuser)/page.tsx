import { authOption } from "@/auth";
import Main from "@/components/auth/main";
import Footer from "@/components/flow/footer";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getServerSession(authOption);
  if (session?.user) {
    return redirect("/home");
  }
  return (
    <>
      <Main />
    </>
  );
};
export default LoginPage;
