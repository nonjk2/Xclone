"use client";
import { usePathname, useRouter } from "next/navigation";
import { FC, MouseEventHandler, ReactNode, useContext } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Icon } from "../ui/icon/GoogleIcon";
import { CaroucelNext, CaroucelPrev } from "@/lib/Icon";
import { StyleContext } from "@/context/StyleProvider";
const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const LeftArrow = ({ onClick }: any) => {
  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <div
      onClick={onClickHandler}
      className={`flex items-center left-3 absolute justify-center z-20 hover:bg-ButtonOpacity cursor-pointer w-[34.75px] h-[34.75px] bg-ButtonIconOpacity transition-all duration-200 rounded-full`}
    >
      <Icon
        color={"rgb(255, 255, 255)"}
        height={5}
        width={5}
        path={CaroucelPrev}
      />
    </div>
  );
};
const RightArrow = ({ onClick }: any) => {
  const onClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    onClick();
  };
  return (
    <div
      onClick={onClickHandler}
      className={`flex items-center right-3 absolute justify-center z-20 hover:bg-ButtonOpacity cursor-pointer w-[34.75px] h-[34.75px] bg-ButtonIconOpacity transition-all duration-200 rounded-full`}
    >
      <Icon
        color={"rgb(255, 255, 255)"}
        height={5}
        width={5}
        path={CaroucelNext}
      />
    </div>
  );
};
interface CaroucelProp {
  children: ReactNode;
}

const MultiCaruocel: FC<CaroucelProp> = ({ children }) => {
  const { photoBoard } = useContext(StyleContext);
  return (
    <Carousel
      arrows
      className="w-full h-full"
      itemClass={`flex items-center justify-center ${
        photoBoard ? "w-full" : "w-[calc(100%-350px)]"
      }`}
      responsive={responsive}
      // deviceType={""}
      customRightArrow={<RightArrow />}
      customLeftArrow={<LeftArrow />}
      draggable={false}
      swipeable={false}
    >
      {children}
    </Carousel>
  );
};
export default MultiCaruocel;
