"use client";
import MainCenterListItem from "@/components/main/center/home/HomePostItem";
import { QueryFunction, useQuery } from "@tanstack/react-query";

const getSearchPosts: QueryFunction<
  Post[],
  [_1: string, _2: string, searchParams: { q: string; f?: string; pf?: string }]
> = async ({ queryKey }) => {
  const [_1, _2, searchParams] = queryKey;
  const res = await fetch(
    `http://localhost:9090/api/search/${
      searchParams.q
    }?${searchParams.toString()}`,
    {
      next: { tags: ["posts", "search", searchParams.q] },
      cache: "no-store",
    }
  );
  return res.json();
};

interface SearchPageProps {
  searchParams: { q: string; f?: string; pf?: string };
}

const SearchPage = ({ searchParams }: SearchPageProps) => {
  const { data } = useQuery<
    Post[],
    any,
    Post[],
    [
      _1: string,
      _2: string,
      searchParams: { q: string; f?: string; pf?: string }
    ]
  >({
    queryKey: ["post", "search", searchParams],
    queryFn: getSearchPosts,
    // gcTime: 60 * 1000,
  });
  return data?.map((e) => <MainCenterListItem key={e.postId} {...e} />);
};
export default SearchPage;
