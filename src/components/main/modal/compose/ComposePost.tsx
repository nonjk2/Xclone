"use client";
import { earth, location, picture, postArray } from "@/lib/Icon";
import { Icon } from "../../../ui/icon/GoogleIcon";
import Button from "../../../ui/button";
import Avatar from "../../../ui/Avatar";
import ComposeHeader from "./ComposeHeader";
import ComposeBody from "./ComposeBody";
import ComposeActionBar from "./ComposeActionBar";
import useImageSelect from "@/lib/hooks/useImageSelect";

const ComposePost = () => {
  const {
    inputRef,
    onUploadImage,
    onUploadImageButtonClick,
    previewImage,
    setPreviewImage,
  } = useImageSelect();
  const EveryoneReply = () => (
    <div className="flex pb-3 w-fit -ml-2 pt-1">
      <div className="min-h-[24px] text-sm px-3 items-center justify-center flex cursor-pointer select-none text-center break-words leading-5 font-bold grow text-blue rounded-full hover:bg-hoverLightBlue gap-1">
        <Icon height={4} path={earth} width={4} color={"rgb(29, 155, 240)"} />
        <span className="text-sm">Everyone can reply</span>
      </div>
    </div>
  );

  return (
    <section className="flex flex-col w-full">
      <ComposeHeader />
      <div className="px-4 w-full flex flex-col h-[225px] pt-1">
        <ComposeBody
          previewImage={previewImage}
          onUploadImage={onUploadImage}
        />
        <EveryoneReply />
        <ComposeActionBar previewImage={previewImage} />
      </div>
    </section>
  );
};
export default ComposePost;
