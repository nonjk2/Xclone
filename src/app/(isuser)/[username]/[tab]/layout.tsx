import Loading from "@/app/(notuser)/@modal/(.)i/flow/signup/loading";
import ProfileLayout from "@/components/main/center/profile/ProfileLayout";
import Tab from "@/components/main/center/profile/Tab";
import { getUsers } from "@/lib/action/server";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { ReactNode, Suspense } from "react";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: { username: string; tab: Tabs };
}) => {
  const { username, tab } = params;
  const client = new QueryClient();
  await client.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUsers,
  });
  const dehydratedState = dehydrate(client);
  return (
    <>
      <main className="relative w-full">
        <div className="w-full h-[200px] bg-inputColor"></div>
        <ProfileLayout username={username} />
        <Tab tab="profile" />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
};
export default Layout;
