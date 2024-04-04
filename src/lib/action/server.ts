import { QueryFunction } from "@tanstack/react-query";

const getPostList = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:9090/api/postRecommends", {
    method: "GET",
    next: { tags: ["post", "recommend"] },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};
const getPostFollowList = async (): Promise<Post[]> => {
  const res = await fetch("http://localhost:9090/api/followingPosts", {
    method: "GET",
    next: { tags: ["post", "follow"] },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};
const getUsers: QueryFunction<User, [_1: string, string]> = async ({
  queryKey,
}) => {
  const [_1, username] = queryKey;
  console.log("asd", username);
  const res = await fetch(`http://localhost:9090/api/users/${username}`, {
    method: "GET",
    next: { tags: ["users", username] },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};
const getUsersPosts: QueryFunction<
  Post[],
  [_1: string, _2: string, string]
> = async ({ queryKey }) => {
  const [_1, _2, username] = queryKey;
  console.log("asd", username);
  const res = await fetch(`http://localhost:9090/api/users/${username}/posts`, {
    method: "GET",
    next: { tags: ["users", "posts", username] },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};
const getSinglePost: QueryFunction<Post, [_1: string, _2: number]> = async ({
  queryKey,
}) => {
  const [_1, id] = queryKey;

  const res = await fetch(`http://localhost:9090/api/posts/${id}`, {
    method: "GET",
    next: { tags: ["users", String(id)] },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("failed");
  }
  return res.json();
};

export {
  getPostList,
  getPostFollowList,
  getUsers,
  getUsersPosts,
  getSinglePost,
};
