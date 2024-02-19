/* eslint-disable @next/next/no-img-element */
import MultiCaruocel from "./MultiCaruocel";
import { faker } from "@faker-js/faker";
import HomeListItemActionBar from "../main/center/home/HomeListItemActionBar";
import { mockPosts } from "@/__test__/MockPostData";
import Button from "../ui/button";
import { switchColor } from "@/lib/func";
import { ActionBarIconSvg, Icon } from "../ui/icon/GoogleIcon";
import { Nextnext, close } from "@/lib/Icon";
const DATA = mockPosts[0];

const PhotoComponents = () => {
  const postDATA = DATA;
  const { Images } = DATA;
  const img = faker.image.urlLoremFlickr();
  return (
    <main className="relative flex w-full">
      <section className="relative flex flex-col shrink grow w-[calc(100%-350px)] h-screen">
        <div className="grow">
          <MultiCaruocel>
            {Images.map((item) => (
              <div
                key={item.imageId}
                className="w-full h-full relative overflow-hidden flex items-center justify-center"
              >
                <img
                  src={`${item.link}`}
                  alt="asdf"
                  className="h-full w-auto max-w-full bg-contain bg-no-repeat bg-center"
                />
              </div>
            ))}
          </MultiCaruocel>
        </div>

        <div className="h-12">
          <HomeListItemActionBar count={postDATA._count} type="photo" photo />
        </div>

        <div className="absolute flex justify-center items-center left-0 top-0 w-[60px] h-[60px]">
          <div className="relative">
            <div
              className={`flex items-center justify-center z-20 hover:bg-ButtonOpacity cursor-pointer w-[34.75px] h-[34.75px] bg-ButtonIconOpacity transition-all duration-200 rounded-full`}
            >
              <Icon
                color={"rgb(255, 255, 255)"}
                height={5}
                width={5}
                path={close}
              />
            </div>
          </div>
        </div>
        <div className="absolute flex justify-center items-center right-0 top-0 w-[60px] h-[60px]">
          <div className="relative">
            <div
              className={`flex items-center justify-center z-20 hover:bg-ButtonOpacity cursor-pointer w-[34.75px] h-[34.75px] bg-ButtonIconOpacity transition-all duration-200 rounded-full`}
            >
              <Icon
                color={"rgb(255, 255, 255)"}
                height={5}
                width={5}
                path={Nextnext}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="w-[350px] min-w-[350px] max-w-[0px] bg-white"></section>
    </main>
  );
};
export default PhotoComponents;
