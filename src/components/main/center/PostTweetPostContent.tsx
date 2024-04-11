import { ChangeEvent, RefObject, forwardRef } from "react";

/* eslint-disable @next/next/no-img-element */
interface PostTweetProps {
  onUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
  previewImage: (String | null)[];
  onImageRemove: (idx: number) => void;
  inputRef: RefObject<HTMLInputElement>;
  disabled: boolean;
}
const PostTweetPostContent = forwardRef((props: PostTweetProps, ref) => {
  const {
    onImageRemove,
    onUploadImage,
    previewImage,
    inputRef,
    disabled = false,
  } = props;
  return (
    <div>
      <input
        type="file"
        ref={inputRef}
        onChange={onUploadImage}
        style={{ display: "none" }}
      />
      <div className="flex w-full h-full">
        {previewImage &&
          previewImage.map(
            (image, idx) =>
              image && (
                <div
                  key={idx}
                  className="relative rounded-lg w-full mt-3 overflow-hidden"
                  onClick={() => {
                    if (disabled) return;
                    onImageRemove(idx);
                  }}
                >
                  {/* <div className="flex basis-auto flex-col bottom-0 left-0 right-0 top-0 absolute w-full border-none outline-none bg-center bg-no-repeat bg-cover -z-10"></div> */}
                  <img
                    src={image as string}
                    alt="미리보기"
                    className="h-auto w-full -z-10"
                  />
                </div>
              )
          )}
      </div>
    </div>
  );
});
PostTweetPostContent.displayName = "postcontent";
export default PostTweetPostContent;
