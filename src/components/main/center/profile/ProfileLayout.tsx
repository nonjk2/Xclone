"use client";
import Button from "@/components/ui/button";
import { useFollowMutation } from "@/lib/hooks/useFollowMutation";
import useUser from "@/lib/hooks/useUser";
import useUsers from "@/lib/hooks/useUsers";
import { supabaseClient } from "@/lib/util/supabase";
import { useQuery } from "@tanstack/react-query";
import ProfileTemplete from "./ProfileTemplete";

const ProfileLayout = ({ username }: { username: string }) => {
  const client = supabaseClient();
  const {
    data: authUser,
    error: authError,
    isPending,
  } = useQuery(useUser({ client }));

  if (isPending || !authUser || authError) {
    return <>loading...</>;
  }
  if (authUser.nickname === username) {
    const EditBtn = () => {
      return (
        <div className="flex h-[68px]">
          <Button
            hoverColor="hoverLightBlack"
            size="editProfile"
            title={<span>Edit profile</span>}
            color="black"
            backgroundColor="white"
          />
        </div>
      );
    };
    return <ProfileTemplete user={authUser} Button={EditBtn} />;
  }

  const {
    data: user,
    error,
    isPending: userIsPending,
  } = useQuery<authUser, Object, authUser, [_1: string, string]>(
    useUsers({ client, username })
  );

  if (!authUser || isPending || userIsPending || !user) {
    return <>loading...</>;
  }
  const FollowBtn = () => {
    const { follow, unfollow } = useFollowMutation(authUser.id);
    const isFollow = !!authUser.followers?.find(
      (followers) => followers.following_id === user.id
    );

    const followButtonClick = () => {
      if (!isFollow) {
        follow.mutate();
      } else if (isFollow) {
        unfollow.mutate();
      }
    };
    const SideClickItem = () => (
      <>
        {isFollow ? (
          <Button
            hoverColor="hoverBlack"
            backgroundColor="black"
            color="white"
            size="follow"
            title={<span className="text-[14px]">unFollow</span>}
          />
        ) : (
          <Button
            hoverColor="hoverBlack"
            backgroundColor="black"
            color="white"
            size="follow"
            title={<span className="text-[14px]">Follow</span>}
          />
        )}
      </>
    );

    return (
      <div className="flex h-[68px]" onClick={() => followButtonClick()}>
        <SideClickItem />
      </div>
    );
  };

  if (error) {
    return <>없는 유저입니다.</>;
  }

  return <ProfileTemplete Button={() => FollowBtn()} user={user} />;
};
export default ProfileLayout;
