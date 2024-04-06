/* eslint-disable @next/next/no-img-element */
import { cancel, threedot } from "@/lib/Icon";
import Button from "./button";
import { Icon } from "./icon/GoogleIcon";
import normal from "../../../public/normal.png";
import { signOut, useSession } from "next-auth/react";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";

interface MainHeaderProfileProps {
  type: "follow" | "profile" | "search";
  onClick?: () => void;
  img?: string;
}

const MainHeaderProfile: React.FC<MainHeaderProfileProps> = (props) => {
  const { type } = props;
  const { data: session } = useSession();
  const router = useRouter();

  const user = {
    picture: "",
  };
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

  const onClickLogoutHandelr: MouseEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
    signOut({ redirect: false }).then(() => router.push("/"));
  };

  const Profileimg = normal;

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
        <div className="flex flex-row w-10 h-10 relative overflow-hidden rounded-full z-20">
          <img
            alt=""
            src={`${session?.user?.image}`}
            className="inset-0 h-full absolute w-full -z-10"
          />
        </div>
        <div className="mx-3 max-xl:hidden grow">
          <div className="font-semibold">{session?.user?.nickname}</div>
          <div className="text-inputColor">
            {session?.user?.email?.split("@")[0]}
          </div>
        </div>
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
