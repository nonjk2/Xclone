import Loading from "@/app/(notuser)/@modal/(.)i/flow/signup/loading";
import ProfileLayout from "@/components/main/center/profile/ProfileLayout";
import Tab from "@/components/main/center/profile/Tab";
import { ReactNode, Suspense } from "react";

const Layout = ({
  children,
  params,
}: {
  children: ReactNode;
  params: { username: string; tab: Tabs };
}) => {
  const { username, tab } = params;
  return (
    <>
      <main className="relative w-full">
        <div className="w-full h-[200px] bg-inputColor"></div>
        <ProfileLayout />
        <Tab tab="profile" />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
};
export default Layout;
