/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import MultiCaruocel from "./MultiCaruocel";
import { logo } from "../../../public";
import { faker } from "@faker-js/faker";
const PhotoComponents = () => {
  const img = faker.image.urlLoremFlickr();
  return (
    <section className="relative flex w-full">
      <div className="flex flex-col shrink grow w-[calc(100%-350px)] h-screen">
        <div className="grow">
          <MultiCaruocel>
            <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
              <img
                src={`${img}`}
                alt="asdf"
                className="h-auto max-w-full bg-contain bg-no-repeat bg-center"
              />
            </div>
            <div className="w-full h-full relative overflow-hidden">
              <img
                src={`${img}`}
                alt="asdf"
                className="h-full w-full bg-contain bg-no-repeat bg-center"
              />
            </div>
          </MultiCaruocel>
        </div>
        <div className="h-12"></div>
      </div>
      <div className="w-[350px] min-w-[350px] bg-white"></div>
    </section>
  );
};
export default PhotoComponents;
