import { authOption } from "@/auth";
import PhotoComponents from "@/components/photo/PhotoComponents";
import Modal from "@/components/ui/modal";
import KeyDownProvider from "@/context/KeyDownProvider";
import { getSinglePost } from "@/lib/action/post-server";
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
  const { photoid, username, id } = params;
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["post", id],
    queryFn: (key) =>
      getSinglePost({
        queryKey: key.queryKey as [string, string],
        supabaseAccessToken: token,
      }),
  });
  const state = dehydrate(queryClient);
  return (
    <HydrationBoundary state={state}>
      <KeyDownProvider>
        <Modal screen>
          <PhotoComponents id={id} />
        </Modal>
      </KeyDownProvider>
    </HydrationBoundary>
  );
};
export default Page;
