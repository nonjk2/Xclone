import PersonalChatComponent from "@/components/chat/PersonalChatComponent";
import { serverClient } from "@/lib/util/serverSBClient";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { getChatQuery } from "@/lib/hooks/useGetChat";

const page = async ({
  params,
}: {
  params: {
    messageId: string;
  };
}) => {
  const client = serverClient();
  const {
    data: { user },
  } = await client.auth.getUser();

  if (!user) {
    return redirect("/");
  }
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery(
    getChatQuery({ client, session_id: params.messageId })
  );
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <HydrationBoundary state={dehydratedState}>
        <PersonalChatComponent session_id={params.messageId} />
      </HydrationBoundary>
    </div>
  );
};
export default page;
