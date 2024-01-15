import { Icon } from "@/components/ui/icon/GoogleIcon";
import { threedot } from "@/lib/Icon";
import { getTimeAgo } from "@/lib/func";
import { forwardRef } from "react";
import { normal } from "../../../../../public";
import Image from "next/image";

const MainCenterListItem = forwardRef<HTMLDivElement, any>((props, ref) => {
  const {
    content,
    createdAt,
    hashtag,
    hearts,
    imgList,
    views,
    id,
    heartCheck,
    user,
  } = props;

  // const onClickMoveHandler = (e) => {
  //   navigate(`/profile/${user.tagName}`);
  //   dispatch(profileSet({ tagName: user.tagName }));
  //   e.stopPropagation();
  // };
  const profileImg = normal;
  // const profileImage = user
  const ItemContents = (
    <div
      className="py-4 pt-3 w-[598px] flex cursor-pointer flex-row border-b border-b-gubunsun hover:bg-opacity-5"
      // onClick={() => {
      //   navigate(`/${id}`);
      // }}
    >
      <div className="relative w-10 h-10 basis-[45px] mr-3 overflow-hidden rounded-full">
        <div className="avartar"></div>
        <Image src={profileImg} alt="asd" width={40} height={40} />
      </div>
      <div className="cursor-pointer w-full">
        <div className="mb-[2px] flex justify-between">
          <div className="first:font-bold">
            <span>{"user?.nickname"}</span>
            <span className="ml-1">{"hashtag"}</span>
            <span>{"user?.nickname"}</span>
            <span className="ml-1">@{"user?.nickname"}</span>
            {/* <span className="text-inputColor">·{getTimeAgo(createdAt)}</span> */}
          </div>
          <Icon
            color={"rgb(83, 100, 113)"}
            height={4}
            width={4}
            path={threedot}
          />
        </div>
        <div className="main-contnet">
          <div className="main-contnet-comment">
            <span>{content}</span>
          </div>
          {/* {imgList[0] && (
            <div className="relative rounded-2xl mt-3 w-full h-full overflow-hidden">
              <div className="flex basis-auto flex-col bottom-0 left-0 right-0 top-0 absolute"></div>
              <Image src={imgList[0]} alt="" />
            </div>
          )} */}
        </div>
        <div className="w-full pt-3">
          <div className="flex pb-1.5 justify-between">
            {/* <MainCenterListItemIcon {...props} /> */}
          </div>
        </div>
      </div>
    </div>
  );
  const isLastItem = ref ? (
    <div ref={ref}>{ItemContents}</div>
  ) : (
    <div>{ItemContents}</div>
  );
  return isLastItem;
});

MainCenterListItem.displayName = "listitem";

export default MainCenterListItem;
