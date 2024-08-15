"use client";
import { getTimeAgo, switchColor } from "@/lib/func";
import IdPath from "../main/center/home/homepostaction/IdPath";
import Avatar from "../ui/Avatar";
import { ActionBarIconSvg } from "../ui/icon/GoogleIcon";
import { threedot } from "@/lib/Icon";
import { useParams, usePathname, useRouter } from "next/navigation";
import { getChatSessionType } from "./ChatSessionPage";

const MessageUserItem = ({ session }: { session: getChatSessionType }) => {
  const { content, created_at, session_id, user_id } = session;
  const pathname = usePathname().split("/")[2];
  const router = useRouter();

  return (
    <div
      className={`flex w-full p-4 group/item cursor-pointer hover:bg-gubunsun ${
        session_id === pathname ? "bg-gubunsun border-r-2 border-blue" : ""
      }`}
      onClick={() => router.replace(`/messages/${session_id}`)}
    >
      <div className="flex justify-between w-full">
        <div className="mr-2">{/* <Avatar imgUrl={image} /> */}</div>

        <div className="leading-5 flex flex-col grow first:font-bold font-twitterFontFamily">
          <div>
            {/* <IdPath id={id} nickname={nickname} message>
              {nickname}
            </IdPath> */}

            {/* <IdPath id={id} message /> */}
            <span className="text-[15px] text-inputColor font-normal">
              ·{getTimeAgo(new Date(created_at))}
              {/* 날짜 */}
            </span>
          </div>

          <span className="text-[15px] text-inputColor font-normal">
            {session_id}
          </span>
        </div>

        <div className="relative group cursor-pointer invisible group-hover/item:visible">
          <div
            className={`w-[34.75px] h-[34.75px] absolute ring-0 top-0 bottom-0 left-0 rounded-full -m-2 ${
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
    </div>
  );
};
export default MessageUserItem;
