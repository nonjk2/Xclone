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

export { getPostList, getPostFollowList };
