import Header from "@/components/main/center/header/Header";
import NavMenu from "@/components/main/left/NavMenu";
import Sidebar from "@/components/main/right/Sidebar";
import MainHeaderProfile from "@/components/ui/profile";
import HomeTabProvider from "@/context/HomeTabProvider";
import { useSelectedLayoutSegment } from "next/navigation";
import { ReactNode, Suspense } from "react";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  hydrate,
} from "@tanstack/react-query";
import { serverClient } from "@/lib/util/serverSBClient";
import useUser from "@/lib/hooks/useUser";
import useFollowRecommendUser from "@/lib/hooks/useFollowUser";

const Layout = async ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  const queryClient = new QueryClient();

  const client = serverClient();
  const {
    data: { user },
    error,
  } = await client.auth.getUser();
  if (!user || error) {
    return <>loading...</>;
  }
  await queryClient.prefetchQuery(useUser({ client }));
  await queryClient.prefetchQuery(useFollowRecommendUser({ client }));

  const Content = (
    <div className="flex flex-row grow min-h-full w-full justify-between items-stretch bg-backgroundOpacity">
      <div className="items-stretch flex flex-col relative bg-white grow w-full -top-[1px] border-gubunsun border-l border-r border-t max-w-[600px]">
        <HomeTabProvider>
          <div className="hometimeline-container relative">
            <Header />
            {children}
          </div>
        </HomeTabProvider>
      </div>
      <div className="items-stretch box-border flex flex-col relative z-0 mr-[10px] w-[350px]">
        <Sidebar />
      </div>
    </div>
  );

  return (
    <div className="flex flex-row w-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="flex basis-auto flex-col relative grow z-20 items-end">
          <div className="flex items-stretch z-0 w-[275px] max-xl:w-[88px] relative">
            <div className="items-stretch flex fixed top-0 h-full w-[275px] max-xl:items-end max-xl:w-[88px]">
              <div className="items-stretch flex relative h-full justify-between flex-col overflow-y-auto gap-2 w-[275px] px-2 max-xl:w-[88px]">
                <NavMenu />
                <Suspense>
                  <MainHeaderProfile type="profile" />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
        <div className="box-border flex flex-auto flex-col grow shrink items-start">
          <div className="items-stretch flex flex-col relative flex-grow flex-shrink basis-auto w-[990px]">
            <>{Content}</>
          </div>
        </div>
        {modal}
      </HydrationBoundary>
    </div>
  );
};
export default Layout;
