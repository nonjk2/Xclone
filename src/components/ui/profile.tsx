/* eslint-disable @next/next/no-img-element */
import { cancel, threedot } from "@/lib/Icon";
import Button from "./button";
import { Icon } from "./icon/GoogleIcon";
import normal from "../../../public/normal.png";

import { MouseEventHandler, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import Loading from "@/app/(isuser)/explore/loading";
import { supabaseClient } from "@/lib/util/supabase";
import { SessionContext } from "@/context/AuthProvider";

interface MainHeaderProfileProps {
  type: "follow" | "profile" | "search";
  onClick?: () => void;
  img?: string;
}

const MainHeaderProfile: React.FC<MainHeaderProfileProps> = (props) => {
  const { type } = props;
  const { session } = useContext(SessionContext);
  if (!session) {
    return <>loading...</>;
  }
  const { avatar_url, name } = session.user.user_metadata;
  const router = useRouter();

  const sideClickItem = (type: MainHeaderProfileProps["type"]) => {
    switch (type) {
      case "follow":
        return (
          <Button
            hoverColor="hoverBlack"
            backgroundColor="black"
            color="white"
            size="follow"
            title={<span>Follow</span>}
          />
        );
      case "profile":
        return (
          <div className="flex items-end justify-end w-[63px]">
            <Icon
              color="rgb(15, 20, 25)"
              height={5}
              width={5}
              path={threedot}
            />
          </div>
        );
      case "search":
        return (
          <Icon color="rgb(15, 20, 25)" height={5} width={5} path={cancel} />
        );
    }
  };

  const onClickLogoutHandelr: MouseEventHandler<HTMLDivElement> = async (e) => {
    e.preventDefault();
    const client = supabaseClient();
    const { error } = await client.auth.signOut();

    if (error) {
      console.log(error);
      return;
    }
    router.push("/");

    // signOut({ redirect: false }).then(() => router.push("/"));
  };

  const typeStyle = (type: MainHeaderProfileProps["type"]) => {
    switch (type) {
      case "follow":
        return "flex items-center";
      case "profile":
        return "flex-end flex rounded-full transition-all duration-300 max-xl:hidden";
      case "search":
        return "flex items-center";

      default:
        return "";
    }
  };
  return (
    <div className="flex my-3 max-xl:w-[64px] w-full h-[65.06px] cursor-pointer hover:bg-hoverLightBlack transition-all duration-300 hover:rounded-full items-center">
      <div
        className="flex justify-between p-3 w-full items-center"
        onClick={onClickLogoutHandelr}
      >
        {status === "loading" ? (
          <Loading />
        ) : (
          <>
            <div className="flex flex-row w-10 h-10 relative overflow-hidden rounded-full z-20">
              <img
                alt="미리보기"
                src={`${avatar_url}`}
                className="inset-0 h-full absolute w-full -z-10"
              />
            </div>
            <div className="mx-3 max-xl:hidden grow">
              <div className="font-semibold">{name}</div>
              <div className="text-inputColor text-sm">
                @{"session?.user?.nickname"}
              </div>
            </div>
          </>
        )}
        <div className={typeStyle(type)}>
          <div className="flex w-[63px] items-center">
            {sideClickItem(type)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHeaderProfile;
