"use client";
import {
  ChangeEvent,
  ChangeEventHandler,
  useCallback,
  useRef,
  useState,
} from "react";
import useInput from "@/lib/hooks/useInput";
import useImageSelect from "@/lib/hooks/useImageSelect";
import { Icon } from "@/components/ui/icon/GoogleIcon";
import {
  down,
  earth,
  location,
  photoArray,
  picture,
  postArray,
} from "@/lib/Icon";
import Button from "@/components/ui/button";
import { normal } from "../../../../public/index";
import Image from "next/image";
import Avatar from "@/components/ui/Avatar";

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
  // const user = useAppSelector((state) => state.user);
  const [textFocus, settextFocus] = useState<boolean>(false);
  const [value, onChange, setForm] = useInput({ content: "" });
  const {
    inputRef,
    onUploadImage,
    onUploadImageButtonClick,
    previewImage,
    setPreviewImage,
  } = useImageSelect();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const IconArray = photo ? photoArray : postArray;
  /// 해시태그 추출
  const extractHashtags = (text: string) => {
    // 해시태그 추출 정규식
    const hashtagRegEx = /#[\w가-힣ㄱ-ㅎㅏ-ㅣ]+/g;

    // 정규식을 사용해서 해시태그 추출
    const hashtags = text.match(hashtagRegEx) || [];

    // 해시태그를 제거한 나머지 텍스트
    const plainText = text.replace(hashtagRegEx, "").trim();

    return { hashtags, plainText };
  };

  /// 트윗 포스트///
  // const onUploadToServerButtonClick = useCallback(async () => {
  //   const formData = new FormData();
  //   formData.append(
  //     "TweetsPostRequest",
  //     new Blob(
  //       [
  //         JSON.stringify({
  //           mainTweetId: null,
  //           tweet: {
  //             hashtag: extractHashtags(value["content"]).hashtags.join(""),
  //             content: value["content"],
  //           },
  //         }),
  //       ],
  //       { type: "application/json" }
  //     )
  //   );
  //   formData.append("img", inputRef.current.files[0]);

  //   const post = await postTweet(formData)
  //     .then(tweetResponseHandler)
  //     .catch((err) => console.log(err))
  //     .finally();
  // }, [value, dispatch, tweetResponseHandler]);

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(event);
      const target = event.target;
      target.style.height = "inherit";
      target.style.height = `${target.scrollHeight}px`;
    },
    [onChange]
  );
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
                // onClick={onUploadToServerButtonClick}
                title={<span>Tweet</span>}
              />
            </div>
          )}
        </>
      );
    }
  };
  const IconFocusRender = () => {
    const Render = (
      <div
        className={`flex justify-between pb-2 ${
          textFocus && `border-t border-t-gubunsun`
        }`}
      >
        {
          <div className="flex gap-[4px] justify-center items-center mt-2 -ml-2">
            {IconArray.map((path, i) => {
              return (
                <div
                  className={
                    path === location
                      ? "flex w-[34px] h-[34px] justify-center items-center flex-row"
                      : "flex w-[34px] h-[34px] justify-center items-center rounded-full flex-row cursor-pointer hover:bg-hoverLightBlue"
                  }
                  key={path}
                  onClick={
                    path === picture ? onUploadImageButtonClick : () => {}
                  }
                >
                  <div className="footer-item-icon">
                    <Icon
                      path={path}
                      color={
                        path === location
                          ? "rgb(29, 155, 240 , 0.5)"
                          : "rgb(29, 155, 240)"
                      }
                      height={5}
                      width={5}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        }
        <div className="mt-3 ml-3 flex">
          <Button
            hoverColor="hoverBlue"
            backgroundColor="blue"
            color="white"
            size="tweet2"
            // onClick={onUploadToServerButtonClick}
            title={<span>Tweet</span>}
          />
        </div>
      </div>
    );

    if (photo) {
      return <>{!reply && (textFocus || value["content"]) && Render}</>;
    }
    return Render;
  };
  return (
    <div className="w-full relative flex px-4 bg-white pt-1 z-10 border-b border-b-hoverProfile h-full">
      <div className="flex flex-col relative mr-3 basis-10 pt-2 w-full">
        <Avatar />
      </div>
      <div className="flex flex-col grow justify-between pt-1 static duration-100 transition-all ease-out">
        <div
          style={{
            font: "14px -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
          }}
          className="border-none border-b-[2px] border-opacity-0 flex rounded border-2 flex-col py-3 cursor-text break-words text-xl text-inputColor whitespace-pre-wrap"
        >
          <textarea
            ref={textareaRef}
            className="w-full leading-normal overflow-hidden resize-none min-h-[1.5em] relative flex box-border border-none rounded-md placeholder:break-words text-xl text-hoverProfile whitespace-pre-wrap"
            rows={1}
            style={{
              font: '20px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif',
            }}
            value={value["content"]}
            onChange={handleOnChange}
            placeholder={comment}
            onFocus={() => settextFocus(true)}
            // onBlur={() => settextFocus(false)}
          />
        </div>
        <input
          type="file"
          ref={inputRef}
          onChange={onUploadImage}
          style={{ display: "none" }}
        />
        {previewImage && (
          <div className="relative rounded-full mt-3 w-full h-full overflow-hidden">
            <div className="flex basis-auto flex-col bottom-0 left-0 right-0 top-0 absolute w-full border-none outline-none bg-center bg-no-repeat bg-cover -z-10"></div>
            <Image
              src={previewImage}
              alt=""
              className="inset-0 h-full opacity-0 absolute w-full -z-10"
            />
          </div>
        )}
        {!reply && !photo && (textFocus || value["content"]) && (
          <div className="flex w-[175px] -ml-2 pb-3">
            <div className="w-full min-h-[24px] items-center justify-center flex cursor-pointer select-none text-center break-words leading-5 font-bold grow text-blue rounded-full hover:bg-hoverLightBlue gap-1">
              <Icon
                height={4}
                path={earth}
                width={4}
                color={"rgb(29, 155, 240)"}
              />
              <span className="text-sm">Everyone can reply</span>
            </div>
          </div>
        )}

        <IconFocusRender />
      </div>
      <TextFocusRender />
    </div>
  );
};
export default PostTweet;
