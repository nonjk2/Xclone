"use client";
import { FC, ReactNode } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
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

interface CaroucelProp {
  children: ReactNode;
}

const MultiCaruocel: FC<CaroucelProp> = ({ children }) => {
  return (
    <Carousel
      arrows
      className="w-full h-full"
      itemClass="flex items-center justify-center"
      responsive={responsive}
      // deviceType={""}
    >
      {children}
    </Carousel>
  );
};
export default MultiCaruocel;
