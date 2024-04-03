import Loading from "@/app/(notuser)/@modal/(.)i/flow/signup/loading";
import HomePostList from "@/components/main/center/home/HomePostList";
import ProfileLayout from "@/components/main/center/profile/ProfileLayout";
import ProfilePost from "@/components/main/center/profile/ProfilePost";
import Tab from "@/components/main/center/profile/Tab";
import { getUsers, getUsersPosts } from "@/lib/action/server";
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
    queryKey: ["users", "posts", username],
    queryFn: getUsersPosts,
  });
  const dehydratedState = dehydrate(client);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProfilePost username={username} />
    </HydrationBoundary>
  );
};
export default page;
