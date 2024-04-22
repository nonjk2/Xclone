import { authOption } from "@/auth";
import ProfilePost from "@/components/main/center/profile/ProfilePost";
import { getUsersPosts } from "@/lib/action/post-server";
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
