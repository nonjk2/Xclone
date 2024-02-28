/* eslint-disable @next/next/no-img-element */
import { Suspense } from "react";
import PhotoImage from "../ui/Image";
import MultiCaruocel from "./MultiCaruocel";

const PhotoCaroucel = ({ images }: { images: PostImage[] }) => {
  return (
    <div className="grow w-full max-h-[calc(100%-48px)]">
      <MultiCaruocel>
        {images.map((item) => (
          <div
            key={item.imageId}
            className="w-full h-full relative overflow-hidden flex items-center justify-center"
          >
            <Suspense>
              <PhotoImage
                src={`${item.link}`}
                alt="asdf"
                className="object-cover"
                loading="lazy"
              />
            </Suspense>
          </div>
        ))}
      </MultiCaruocel>
    </div>
  );
};
export default PhotoCaroucel;
