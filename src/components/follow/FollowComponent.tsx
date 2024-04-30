import MainHeaderProfile from "../ui/profile";
import { supabaseClient } from "@/lib/util/supabase";
import { useSuspenseQuery } from "@tanstack/react-query";
import useFollowRecommendUser from "@/lib/hooks/useFollowUser";

const FollowComponent = () => {
  const sidebar = true;
  const client = supabaseClient();

  const { data } = useSuspenseQuery(useFollowRecommendUser({ client }));
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
        {data.map((data, idx) => (
          <MainHeaderProfile
            key={`${idx}+ ${data.id}`}
            type="follow"
            data={data}
          />
        ))}
      </article>
    </>
  );
};
export default FollowComponent;
