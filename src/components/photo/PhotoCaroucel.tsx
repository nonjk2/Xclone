/* eslint-disable @next/next/no-img-element */
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
            <img
              src={`${item.link}`}
              alt="asdf"
              className="bg-contain bg-no-repeat bg-center"
            />
          </div>
        ))}
      </MultiCaruocel>
    </div>
  );
};
export default PhotoCaroucel;
