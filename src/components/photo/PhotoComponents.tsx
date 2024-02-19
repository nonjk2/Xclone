/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import MultiCaruocel from "./MultiCaruocel";
import { logo } from "../../../public";
import { faker } from "@faker-js/faker";
import HomeListItemActionBar from "../main/center/home/HomeListItemActionBar";
import { mockPosts } from "@/__test__/MockPostData";
import { Suspense } from "react";
const DATA = mockPosts[0];
const PhotoComponents = () => {
  const postDATA = DATA;
  const { Images } = DATA;
  const img = faker.image.urlLoremFlickr();
  return (
    <section className="relative flex w-full">
      <div className="flex flex-col shrink grow w-[calc(100%-350px)] h-screen">
        <div className="grow">
          <MultiCaruocel>
            <Suspense fallback={<>loading...</>}>
              {Images.map((item) => (
                <div
                  key={item.imageId}
                  className="w-full h-full relative overflow-hidden flex items-center justify-center"
                >
                  <img
                    src={`${item.link}`}
                    alt="asdf"
                    className="h-auto max-w-full bg-contain bg-no-repeat bg-center"
                  />
                </div>
              ))}
            </Suspense>
          </MultiCaruocel>
        </div>
        <div className="h-12">
          <HomeListItemActionBar count={postDATA._count} type="photo" photo />
        </div>
      </div>
      <div className="w-[350px] min-w-[350px] bg-white"></div>
    </section>
  );
};
export default PhotoComponents;
