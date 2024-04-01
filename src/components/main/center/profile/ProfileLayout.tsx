"use client";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/button";
import { SmallIconSvg } from "@/components/ui/icon/GoogleIcon";
import { calender } from "@/lib/Icon";
import { getUsers } from "@/lib/action/server";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const ProfileLayout = ({ username }: { username: string }) => {
  const {
    data: user,
    error,
    isError,
  } = useQuery({
    queryKey: ["users", username],
    queryFn: getUsers,
  });
  if (isError || !user) {
    return null;
  }

  return (
    <div className="mb-4 px-4 flex flex-col pt-3">
      <div className="flex flex-row flex-wrap items-start text-[15px] justify-between">
        <div className="relative w-1/4 min-w-[48px] -mb-[15%]">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[145px] h-[145px] rounded-full bg-white flex items-center justify-center">
            <div className="w-[135px] h-[135px] bg-inputColor rounded-full overflow-hidden">
              <Avatar profile imgUrl={user.image} />
            </div>
          </div>
        </div>

        <div className="flex h-[68px]">
          <Button
            hoverColor="hoverLightBlack"
            size="editProfile"
            title={<span>Edit profile</span>}
            color="black"
            backgroundColor="white"
          />
        </div>
      </div>
      <div className="flex flex-col mt-1 mb-3">
        <span className="text-xl font-extrabold">{user.nickname}</span>
        <span className="flex items-center text-inputColor text-[15px]">
          @{user.id}
        </span>
      </div>

      {/* 번역 */}

      <div className="flex mb-3 flex-col">
        <span className="text-[15px] text-black">{user.nickname}</span>
        <span className="text-blue text-[13px] hover:underline">
          Translate bio
        </span>
      </div>

      {/* 날짜 */}

      <div className="flex mb-3 items-center text-inputColor text-[15px] leading-3 font-normal">
        <div className="mr-1">
          <SmallIconSvg path={calender} height={18.75} width={18.75} />
        </div>
        <span>
          Joined {new Date().getMonth() + 1} {new Date().getFullYear()}
        </span>
      </div>
      {/* 팔로윙 */}
      <div className="flex gap-5 text-inputColor text-[14px] leading-3 font-normal">
        <Link href={"/following"} className="flex hover:underline">
          <span className="text-black text-[14px] font-bold">
            {user._count.Followings}
          </span>
          {"Following"}
        </Link>
        <Link href={"/followers"} className="flex hover:underline">
          <span className="text-black text-[14px] font-bold">
            {user._count.Followers}
          </span>
          {"Followers"}
        </Link>
      </div>
    </div>
  );
};
export default ProfileLayout;
