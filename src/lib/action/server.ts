import { QueryFunction } from "@tanstack/react-query";

const getPostList = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:9090/api/postRecommends", {
    method: "GET",
    next: { tags: ["post", "recommend"] },
    cache: "no-store",
  });
  return res.json();
};
const getPostFollowList = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:9090/api/followingPosts", {
    method: "GET",
    next: { tags: ["post", "follow"] },
    cache: "no-store",
  });
  return res.json();
};
const getUsers: QueryFunction<User, [_1: string, string]> = async ({
  queryKey,
}) => {
  const [_1, username] = queryKey;
  const res = await fetch(`http://localhost:9090/api/users/${username}`, {
    method: "GET",
    next: { tags: ["users", username] },
    cache: "no-store",
  });
  return res.json();
};

export { getPostList, getPostFollowList, getUsers };
