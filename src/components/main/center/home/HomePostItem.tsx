/* eslint-disable @next/next/no-img-element */
import { ActionBarIconSvg, Icon } from "@/components/ui/icon/GoogleIcon";
import { threedot } from "@/lib/Icon";
import { getTimeAgo, switchColor } from "@/lib/func";
import { forwardRef } from "react";
import { normal } from "../../../../../public";
import Image from "next/image";
import HomeListItemActionBar from "./HomeListItemActionBar";
import Avatar from "@/components/ui/Avatar";
import Link from "next/link";

const MainCenterListItem = forwardRef<HTMLDivElement, Post>((props, ref) => {
  const {
    content,
    Comments,
    Hearts,
    Images,
    Reposts,
    User,
    _count: count,
    createdAt,
    postId,
    Original,
    Parent,
  } = props;
  const { image, nickname, id } = User;

  // const onClickMoveHandler = (e) => {
  //   navigate(`/profile/${user.tagName}`);
  //   dispatch(profileSet({ tagName: user.tagName }));
  // };

  const profileImg = normal;
  // const profileImage = user
  const ItemContents = (
    <article className="px-4 pt-3 pb-3 w-[598px] flex cursor-pointer flex-row border-b bg-[rgba(0,0,0,0)] transition-all hover:bg-[rgba(0,0,0,0.03)] duration-200 border-b-gubunsun">
      {/* <div className="relative w-10 h-10 basis-[44px] mr-3 overflow-hidden rounded-full">
        <div className="avartar"></div>
        <Image src={profileImg} alt="asd" width={40} height={40} />
      </div> */}
      <div className="mr-3">
        <Avatar imgUrl={image} />
      </div>

      <div className="cursor-pointer w-full">
        <div className="mb-[2px] flex justify-between">
          <div className="flex gap-[2px] first:font-bold font-twitterFontFamily">
            <span className="text-[15px]">{nickname}</span>
            <span className="text-[15px] text-inputColor font-normal">
              @{id}
            </span>
            <span className="text-[15px] text-inputColor font-normal">
              ·{getTimeAgo(createdAt)}
            </span>
          </div>

          <div className="relative group">
            <div
              className={`w-[34.75px] h-[34.75px] absolute ring-0 top-0 bottom-0 left-0 transition-all duration-200 rounded-full -m-2 ${
                switchColor("BookMark").hoverCircle
              }`}
            />
            <div className={`flex ${switchColor("BookMark").hoverIcon}`}>
              <ActionBarIconSvg
                color={"rgb(83, 100, 113)"}
                height={5}
                width={5}
                path={threedot}
              />
            </div>
          </div>
        </div>

        <div className="main-contnet">
          <div className="main-contnet-comment">
            <span>{content}</span>
          </div>
          {Images[0] && (
            <div className="relative rounded-2xl mt-3 w-full h-full overflow-hidden">
              <div className="flex basis-auto flex-col bottom-0 left-0 right-0 top-0 absolute"></div>
              <img
                src={`${Images[0].link}`}
                alt="asdasd"
                className="w-full h-full"
              />
            </div>
          )}
        </div>

        <div className="w-full">
          <div className="flex justify-between">
            <HomeListItemActionBar count={count} />
          </div>
        </div>
      </div>
    </article>
  );
  const isLastItem = ref ? (
    <div ref={ref}>{ItemContents}</div>
  ) : (
    <div>{ItemContents}</div>
  );

  return <Link href={`/${nickname}/status/${id}`}>{isLastItem}</Link>;
});

MainCenterListItem.displayName = "listitem";

export default MainCenterListItem;
