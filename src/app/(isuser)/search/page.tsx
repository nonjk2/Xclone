import { QueryFunction } from "@tanstack/react-query";

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

const SearchPage = ({
  searchParams,
}: {
  searchParams: { q: string; f?: string; pf?: string };
}) => {
  return <div>SearchPage</div>;
};
export default SearchPage;
