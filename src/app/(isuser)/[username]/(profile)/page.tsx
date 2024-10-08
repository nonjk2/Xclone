import ProfilePost from "@/components/main/center/profile/ProfilePost";

import usersPosts from "@/lib/hooks/useUsersPosts";

import { serverClient } from "@/lib/util/serverSBClient";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

interface ProfilePageProps {
  params: { username: string };
}

const page = async ({ params }: ProfilePageProps) => {
  const { username } = params;
  const client = serverClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/");
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(usersPosts({ client, username }));
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProfilePost username={username} />
    </HydrationBoundary>
  );
};
export default page;
