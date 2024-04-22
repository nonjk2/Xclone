import { authOption } from "@/auth";
import ProfilePost from "@/components/main/center/profile/ProfilePost";
import { getUsersPosts } from "@/lib/action/post-server";
import useUsersPosts from "@/lib/hooks/useUsersPosts";
import { supabaseClient } from "@/lib/util/supabase";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";

interface ProfilePageProps {
  params: { username: string };
}

const page = async ({ params }: ProfilePageProps) => {
  const { username } = params;
  const session = await getServerSession(authOption);
  const client = supabaseClient(session?.supabaseAccessToken);
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(useUsersPosts({ client, username }));
  const dehydratedState = dehydrate(queryClient);
  return (
    <HydrationBoundary state={dehydratedState}>
      <ProfilePost username={username} />
    </HydrationBoundary>
  );
};
export default page;
