/* eslint-disable @next/next/no-img-element */
"use client";
import { FormEvent, useState } from "react";
import useInput from "@/lib/hooks/useInput";
import Button from "@/components/ui/button";
import Avatar from "@/components/ui/Avatar";
import PostTweetTextArea from "./PostTweetTextArea";
import { createPost } from "@/lib/action/post-server";
import { useSession } from "next-auth/react";
import useImageSelect from "@/lib/hooks/useImageSelect";
import PostTweetPostContent from "./PostTweetPostContent";
import { useQueryClient } from "@tanstack/react-query";

interface PostTweetProps {
  comment: string;
  type: "tweet" | "retweet";
  reply?: boolean;
  photo?: boolean;
}

const PostTweet: React.FC<PostTweetProps> = ({
  comment,
  type,
  reply,
  photo,
}) => {
  const [textFocus, settextFocus] = useState<boolean>(false);
  const [value, onChange, setForm] = useInput({ content: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const {
    inputRef,
    onUploadImage,
    onUploadImageButtonClick,
    previewImage,
    onImageRemove,
    resetImages,
  } = useImageSelect();
  const session = useSession();
  const queryClient = useQueryClient();
  const TextFocusRender = () => {
    if (photo) {
      return (
        <>
          {!reply && (textFocus || value["content"]) ? (
            <></>
          ) : (
            <div className="flex items-center">
              <Button
                hoverColor="hoverBlue"
                backgroundColor="blue"
                color="white"
                size="tweet2"
                disabled={loading}
                // onClick={onUploadToServerButtonClick}
                title={<span>Tweet</span>}
              />
            </div>
          )}
        </>
      );
    }
  };
  const onChangeTextFocused = () => {
    settextFocus(true);
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (session.data) {
        const res = await createPost(
          session.data.user.id,
          value["content"],
          true,
          inputRef.current?.files
        );
        if (res) {
          queryClient.setQueryData(["post", "recommend"], (prev: Post[]) => {
            const newData = [res, ...prev];
            return newData;
          });
        }
        console.log(res);
      }
    } catch (error) {
    } finally {
      setLoading(false);
      resetImages();
      setForm({ content: "" });
    }
  };
  return (
    <form
      className="w-full relative bg-white z-10 border-b border-b-hoverProfile h-full"
      onSubmit={onSubmit}
    >
      {loading && (
        <div className="absolute w-full h-1 top-0 overflow-hidden">
          <div className="w-1/5 bg-blue h-full progress-bar" />
        </div>
      )}

      <div className="w-full px-4 flex pt-1 h-full">
        <div className="flex flex-col relative mr-3 basis-10 pt-2 w-full">
          <Avatar />
        </div>
        <PostTweetTextArea
          onChange={onChange}
          comment={comment}
          photo={photo}
          reply={reply}
          disabled={loading}
          settextFocus={onChangeTextFocused}
          textFocus={textFocus}
          value={value}
          onUploadImageButtonClick={onUploadImageButtonClick}
        >
          <PostTweetPostContent
            inputRef={inputRef}
            onUploadImage={onUploadImage}
            disabled={loading}
            previewImage={previewImage}
            onImageRemove={onImageRemove}
          />
        </PostTweetTextArea>
        <TextFocusRender />
      </div>
    </form>
  );
};
export default PostTweet;
