"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { MouseEvent, MouseEventHandler } from "react";

const HomePostImage = ({
  Images,
  id,
  postId,
}: {
  Images: PostImage[];
  id: string;
  postId: string;
}) => {
  const { push } = useRouter();

  const onClickImageRouteHandler = (
    e: MouseEvent<HTMLDivElement>,
    ImageId: number
  ) => {
    e.preventDefault();
    e.stopPropagation();
    push(`/${id}/status/${postId}/photo/${ImageId}`, { scroll: false });
  };
  switch (Images.length) {
    case 1:
      return (
        <div
          className="w-full h-full absolute inset-0"
          onClick={(e) => onClickImageRouteHandler(e, 1)}
        >
          <Image
            priority
            src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${Images[0].link}`}
            alt="Image description"
            className="w-full h-full"
            width={100}
            height={100}
          />
        </div>
      );
    case 2:
      return (
        <div className="flex divide-x-2 w-full h-full absolute top-0 divide-white">
          {Images.map((img, idx) => (
            <div
              key={img.id}
              className="w-1/2 h-full relative"
              onClick={(e) => onClickImageRouteHandler(e, idx + 1)}
            >
              <Image
                priority
                src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${Images[idx].link}`}
                alt="Image description"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
                fill
              />
            </div>
          ))}
        </div>
      );
    case 3:
      return (
        <div className="flex divide-x-2 w-full h-full absolute top-0 divide-white">
          <div
            className="w-1/2 h-full relative"
            onClick={(e) => onClickImageRouteHandler(e, 1)}
          >
            <Image
              priority
              src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${Images[0].link}`}
              alt="Image description"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              fill
            />
          </div>
          <div className="w-1/2 h-full relative">
            <div className="flex flex-col w-full h-full divide-y-2 divide-white absolute inset-0">
              {Images.slice(1).map((img, idx) => (
                <div
                  className="w-full h-1/2 relative"
                  key={img.id + idx}
                  onClick={(e) => onClickImageRouteHandler(e, idx + 2)}
                >
                  <Image
                    priority
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${
                      Images[idx + 1].link
                    }`}
                    alt="Image description"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="flex divide-x-2 divide-y-2 w-full h-full absolute top-0 divide-white flex-wrap">
          {Images.map((img, idx) => (
            <div
              key={img.id}
              className="w-1/2 h-1/2 relative"
              onClick={(e) => onClickImageRouteHandler(e, idx + 1)}
            >
              <Image
                priority
                src={`${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}${Images[idx].link}`}
                alt="Image description"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );

    default:
      return <></>;
  }
};

export default HomePostImage;
