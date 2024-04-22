import { authOption } from "@/auth";
import AuthProvider from "@/context/AuthProvider";
import QueryProvider from "@/context/QueryProvider";
import RecoilProvider from "@/context/RecoilProvider";
import StyleProvider from "@/context/StyleProvider";
import { getServerSession } from "next-auth";

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOption);

  return (
    <AuthProvider session={session}>
      <QueryProvider>
        <RecoilProvider>
          <StyleProvider>{children}</StyleProvider>
        </RecoilProvider>
      </QueryProvider>
    </AuthProvider>
  );
};
export default Providers;
