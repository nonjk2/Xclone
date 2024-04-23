import { getCommentPostList } from "@/lib/action/post-server";
import { supabaseClient } from "@/lib/util/supabase";
import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import MainCenterListItem from "../main/center/home/HomePostItem";
import usePostList from "@/lib/hooks/usePostList";
import { useInView } from "react-intersection-observer";
import { Fragment, useEffect } from "react";
import useCommentList from "@/lib/hooks/useCommentList";

const PostComments = ({ postId }: { postId: string }) => {
  const { data, status } = useSession();
  const client = supabaseClient(data?.supabaseAccessToken);
  const {
    data: comments,
    fetchNextPage,
    hasNextPage,
  } = useSuspenseInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    any,
    string | undefined
  >(useCommentList({ client, typequery: postId }));

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return comments.pages?.map((pages, pageIndex) => (
    <Fragment key={pageIndex}>
      {pages.map((e, itemIndex) => {
        const lastPage = pageIndex === comments.pages.length - 1;
        const lastItemInPage = itemIndex === pages.length - 1;
        const isLastItem = lastPage && lastItemInPage;
        if (isLastItem) {
          return <MainCenterListItem key={e.id} {...e} ref={ref} />;
        }
        return <MainCenterListItem key={e.id} {...e} />;
      })}
    </Fragment>
  ));
};
export default PostComments;
