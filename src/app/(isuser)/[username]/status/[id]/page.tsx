import Loading from "@/app/(isuser)/explore/loading";
import { authOption } from "@/auth";
import SinglePostComponent from "@/components/main/center/singlepost/SinglePostComponent";
import PhotoBoardSection from "@/components/photo/PhotoBoardSection";

import usePost from "@/lib/hooks/usePost";
import { serverClient } from "@/lib/util/serverSBClient";
import { supabaseClient } from "@/lib/util/supabase";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
interface SinglePostPageProps {
  params: { id: string };
}
const SiglePostPage = async ({ params }: SinglePostPageProps) => {
  const { id: PostId } = params;
  const session = await getServerSession(authOption);
  const queryClient = new QueryClient();
  if (!session?.supabaseAccessToken) {
    return <>loding...</>;
  }

  const client = serverClient(session?.supabaseAccessToken);
  await queryClient.prefetchQuery<Post, Object, Post, [_1: string, string]>(
    usePost({ client, PostId })
  );
  return (
    <article className="w-full h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <SinglePostComponent PostId={PostId} />
      </HydrationBoundary>
    </article>
  );
};
export default SiglePostPage;
