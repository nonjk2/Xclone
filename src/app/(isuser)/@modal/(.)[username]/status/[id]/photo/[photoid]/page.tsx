import { authOption } from "@/auth";
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
import { getServerSession } from "next-auth";

const Page = async ({
  params,
}: {
  params: { username: string; id: string; photoid: number };
}) => {
  const session = await getServerSession(authOption);
  const token = session?.supabaseAccessToken ?? "";
  const client = serverClient(token);
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
