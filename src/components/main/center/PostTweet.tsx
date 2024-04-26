/* eslint-disable @next/next/no-img-element */
"use client";
import { FormEvent, useContext, useState } from "react";
import useInput from "@/lib/hooks/useInput";
import Button from "@/components/ui/button";
import Avatar from "@/components/ui/Avatar";
import PostTweetTextArea from "./PostTweetTextArea";
import useImageSelect from "@/lib/hooks/useImageSelect";
import PostTweetPostContent from "./PostTweetPostContent";
import { useMutation } from "@tanstack/react-query";
import { supabaseClient } from "@/lib/util/supabase";
import useCreatePost from "@/lib/hooks/useCreatePost";
import { SessionContext } from "@/context/AuthProvider";

interface PostTweetProps {
  comment: string;
  type: "tweet" | "retweet";
  reply?: boolean;
  photo?: boolean;
  postId?: string;
}

const PostTweet: React.FC<PostTweetProps> = ({
  comment,
  type,
  reply,
  photo,
  postId,
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
  const { session } = useContext(SessionContext);
  const client = supabaseClient();
  if (!session) {
    return <>Loading...</>;
  }
  const callbackFn = () => {
    resetImages();
    setForm({ content: "" });
  };

  // const { mutate, isPending } = useMutation(
  //   useCreatePost({
  //     callbackFn,
  //     formData: {
  //       content: value["content"],
  //       isOriginal: !postId,
  //       parentPostId: !!postId ? postId : undefined,
  //       client,
  //       images: inputRef.current?.files,
  //     },
  //     queryKeyType: !!postId
  //       ? ["post", "comment", postId]
  //       : ["post", "recommend"],
  //   })
  // );

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
    // mutate();
  };
  return (
    <form
      className="w-full relative bg-white z-10 border-b border-b-hoverProfile h-full"
      onSubmit={onSubmit}
    >
      {/* {isPending && (
        <div className="absolute w-full h-1 top-0 overflow-hidden">
          <div className="w-1/5 bg-blue h-full progress-bar" />
        </div>
      )}

      <div className="w-full px-4 flex pt-1 h-full">
        <div className="flex flex-col relative mr-3 basis-10 pt-2 w-full">
          <Avatar imgUrl={session.user.user_metadata.avatar_url} />
        </div>
        <PostTweetTextArea
          onChange={onChange}
          comment={comment}
          photo={photo}
          reply={reply}
          disabled={isPending}
          settextFocus={onChangeTextFocused}
          textFocus={textFocus}
          value={value}
          onUploadImageButtonClick={onUploadImageButtonClick}
        >
          <PostTweetPostContent
            inputRef={inputRef}
            onUploadImage={onUploadImage}
            disabled={isPending}
            previewImage={previewImage}
            onImageRemove={onImageRemove}
          />
        </PostTweetTextArea>
        <TextFocusRender />
      </div> */}
    </form>
  );
};
export default PostTweet;
