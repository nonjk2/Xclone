import Loading from "@/app/(notuser)/@modal/(.)i/flow/signup/loading";
import HomePostList from "@/components/main/center/home/HomePostList";
import ProfileLayout from "@/components/main/center/profile/ProfileLayout";
import Tab from "@/components/main/center/profile/Tab";
import { getUsers } from "@/lib/action/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";

interface ProfilePageProps {
  params: { username: string };
}

const page = async ({ params }: ProfilePageProps) => {
  const { username } = params;
  const client = new QueryClient();
  await client.prefetchQuery({
    queryKey: ["users", username],
    queryFn: getUsers,
  });
  const dehydratedState = dehydrate(client);
  return (
    <main className="relative w-full">
      <HydrationBoundary state={dehydratedState}>
        <div className="w-full h-[200px] bg-inputColor"></div>
        <ProfileLayout username={username} />
        <Tab />
        <Suspense fallback={<Loading />}>
          <HomePostList />
        </Suspense>
      </HydrationBoundary>
    </main>
  );
};
export default page;
