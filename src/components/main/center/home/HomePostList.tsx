"use client";

import {
  InfiniteData,
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import MainCenterListItem from "./HomePostItem";
import { getPostList } from "@/lib/action/post-server";
import { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Loading from "@/app/(isuser)/explore/loading";
import usePostList from "@/lib/hooks/usePostList";
import { supabaseClient } from "@/lib/util/supabase";
// import { getPostList } from "@/lib/action/server";

// const DATA = mockPosts;
const HomePostLists = () => {
  const client = supabaseClient();
  const queryClient = useQueryClient();
  const {
    data: res,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<
    Post[],
    Object,
    InfiniteData<Post[]>,
    [_1: string, _2: string],
    string | undefined
  >(usePostList({ client, typequery: "recommend", queryClient }));

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (!res) {
    return <>게시물이 없음</>;
  }

  return res?.pages?.map((pages, pageIndex) => (
    <Fragment key={pageIndex}>
      {pages.map((e, itemIndex) => {
        const lastPage = pageIndex === res.pages.length - 1;
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

const HomePostList = () => {
  return <HomePostLists />;
};
export default HomePostList;
