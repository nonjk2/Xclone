import SinglePostComponent from "@/components/main/center/singlepost/SinglePostComponent";
import usePost from "@/lib/hooks/usePost";
import { serverClient } from "@/lib/util/serverSBClient";

import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
interface SinglePostPageProps {
  params: { id: string };
}
const SiglePostPage = async ({ params }: SinglePostPageProps) => {
  const { id: PostId } = params;
  const client = serverClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const queryClient = new QueryClient();

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
