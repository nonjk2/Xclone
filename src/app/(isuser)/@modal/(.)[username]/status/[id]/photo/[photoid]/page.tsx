import PhotoComponents from "@/components/photo/PhotoComponents";
import Modal from "@/components/ui/modal";
import KeyDownProvider from "@/context/KeyDownProvider";
import { getSinglePost } from "@/lib/action/post-server";
import usePost from "@/lib/hooks/usePost";
import { serverClient } from "@/lib/util/serverSBClient";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

const Page = async ({
  params,
}: {
  params: { username: string; id: string; photoid: number };
}) => {
  const client = serverClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  const { id: PostId } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(usePost({ client, PostId }));

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <KeyDownProvider>
        <Modal screen>
          <PhotoComponents id={PostId} />
        </Modal>
      </KeyDownProvider>
    </HydrationBoundary>
  );
};
export default Page;
