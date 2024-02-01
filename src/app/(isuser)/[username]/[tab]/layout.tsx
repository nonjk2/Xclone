import Loading from "@/app/(notuser)/@modal/(.)i/flow/signup/loading";
import ProfileLayout from "@/components/main/center/profile/ProfileLayout";
import Tab from "@/components/main/center/profile/Tab";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/button";
import { SmallIconSvg } from "@/components/ui/icon/GoogleIcon";
import { calender } from "@/lib/Icon";
import Link from "next/link";
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
        <Tab tab={tab} />
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
};
export default Layout;
