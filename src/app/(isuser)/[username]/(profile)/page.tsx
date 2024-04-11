import ProfilePost from "@/components/main/center/profile/ProfilePost";
import { getUsers, getUsersPosts } from "@/lib/action/server";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

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
