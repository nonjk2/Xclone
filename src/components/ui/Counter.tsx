import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import useCounter from "@/lib/hooks/useCounter";

const transformY = (size: number, css = {}) => ({
  transform: `translate3d(0, ${size}px, 0)`,
  ...css,
});

let firstLoad = true;

const Digit = ({
  originNumber,
  numbers,
  isIncreasing,
}: {
  originNumber: any;
  numbers: any;
  isIncreasing: any;
}) => {
  useEffect(() => {
    firstLoad = false;
  }, []);

  const getFrom = () => {
    if (firstLoad) {
      return transformY(0);
    }

    if (isIncreasing) {
      return transformY(20 * (numbers.length - 1));
    }

    return transformY(0);
  };

  const getTo = () => {
    if (firstLoad) {
      return transformY(0);
    }

    if (isIncreasing) {
      return transformY(0);
    }

    return transformY(20 * (numbers.length - 1));
  };

  const from = getFrom();
  const to = getTo();

  const props = useSpring({
    from,
    to,
  });

  return (
    <animated.span
      className={"felx flex-col justify-end"}
      style={{
        ...props,
      }}
    >
      {numbers.map((diskValue: any, i: number) => {
        return (
          <span
            key={`${diskValue}-${i}-${originNumber}`}
            className={"leading-5 text-right"}
          >
            {diskValue}
          </span>
        );
      })}
    </animated.span>
  );
};

const Counter = ({ from, to }: { from: string; to: string }) => {
  const { createCounterMap } = useCounter();

  const counterTransitionMap = createCounterMap(from, to);

  return (
    <span className={"relative inline-block"}>
      <span
        className={
          "absolute -top-[17px] left-0 inline-flex h-5 overflow-hidden"
        }
      >
        {counterTransitionMap.map(
          (
            {
              numbers,
              isIncreasing,
            }: { numbers: string; isIncreasing: string },
            i: number
          ) => {
            return (
              <Digit
                key={from !== to ? i : `${i}-${Math.random()}`}
                numbers={numbers}
                originNumber={to}
                isIncreasing={isIncreasing}
              />
            );
          }
        )}
      </span>
    </span>
  );
};

export default Counter;
