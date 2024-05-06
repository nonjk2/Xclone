import MainHeaderProfile from "../ui/profile";
import { supabaseClient } from "@/lib/util/supabase";
import { useSuspenseQuery } from "@tanstack/react-query";
import useFollowRecommendUser from "@/lib/hooks/useFollowUser";
import { Suspense } from "react";
import FollowProfile from "../ui/FollowProfile";

const FollowComponent = () => {
  const sidebar = true;
  const client = supabaseClient();

  const { data, isPending } = useSuspenseQuery(
    useFollowRecommendUser({ client })
  );

  return (
    <>
      <article
        className={`flex flex-col ${
          sidebar ? `bg-hoverProfile` : `bg-white`
        } rounded-lg`}
      >
        <div className="h-12 py-3 px-4 text-[21.5px] font-bold">
          Who To Follow
        </div>
        <Suspense fallback={<>loading...</>}>
          {data.map((data, idx) => (
            <FollowProfile
              key={`${idx}+ ${data.id}`}
              type="follow"
              data={data}
            />
          ))}
        </Suspense>
      </article>
    </>
  );
};
export default FollowComponent;
