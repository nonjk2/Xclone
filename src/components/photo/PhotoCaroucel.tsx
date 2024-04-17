/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react";
import PhotoImage from "../ui/Image";
import MultiCaruocel from "./MultiCaruocel";

const PhotoCaroucel = ({ post }: { post: Post }) => {
  const { Images } = post;
  if (!Images) {
    return null;
  }
  return (
    <div className="grow w-full max-h-[calc(100%-48px)]">
      <MultiCaruocel>
        {Images.map((item) => (
          <div
            key={item.id}
            className="w-full h-full relative overflow-hidden flex items-center justify-center"
          >
            <Suspense>
              <PhotoImage
                src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${item.link}`}
                alt="asdf"
                className="object-cover"
              />
            </Suspense>
          </div>
        ))}
      </MultiCaruocel>
    </div>
  );
};
export default PhotoCaroucel;
