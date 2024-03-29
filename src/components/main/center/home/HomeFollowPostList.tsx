import { useQuery } from "@tanstack/react-query";
import MainCenterListItem from "./HomePostItem";
import { getPostFollowList } from "@/lib/action/server";

const HomeFollowPostList = () => {
  const { data: res } = useQuery({
    queryKey: ["post", "follow"],
    queryFn: getPostFollowList,
  });
  return res?.map((e) => <MainCenterListItem key={e.postId} {...e} />);
};
export default HomeFollowPostList;
