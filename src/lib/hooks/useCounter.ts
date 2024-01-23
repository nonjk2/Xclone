import { numberFilter } from "../func";

const SEPERATOR = ",";

const useCounter = () => {
  const getLength = ({
    prevValue,
    value,
    isIncreasing,
    isLevelChanging,
  }: any) => {
    const isReallyIncreasing = prevValue - value < 0 && isIncreasing;
    const isReallyDecreasing = prevValue - value > 0;

    if ((isReallyIncreasing || isReallyDecreasing) && !isLevelChanging) {
      return Math.abs(prevValue - value);
    } else {
      const leftSide = isIncreasing ? prevValue : prevValue + 10;
      const rightSide = isIncreasing ? value + 10 : value;

      return Math.abs(leftSide - rightSide);
    }
  };

  const getDiskNumbers = (
    prevValue: any,
    value: any,
    isIncreasing: any,
    isLevelChanging = false
  ) => {
    if (prevValue === value) {
      return [value];
    }
    const length = getLength({
      prevValue,
      value,
      isIncreasing,
      isLevelChanging,
    });
    const range = Array(length)
      .fill("")
      .map((_, i) => {
        if (isIncreasing) {
          const val = prevValue + 1 + i;
          return val >= 10 ? Math.abs(10 - val) : val;
        }
        const val = prevValue - 1 - i;
        return val < 0 ? Math.abs(-val - 10) : val;
      });
    const returnValue = [prevValue, ...range];
    return isIncreasing ? returnValue : returnValue.reverse();
  };

  const getArrayofNumbers = (number: any) => {
    return number.split("");
  };

  const getFormatSeperatorIndex = (value: string) => {
    const numbers = getArrayofNumbers(value);

    const getSeperatorIndex = (arr: any) =>
      arr.findIndex((elem: any) => elem === SEPERATOR);

    const sepIndex = getSeperatorIndex(numbers);

    return sepIndex;
  };

  const createCounterMap = (prevValue: string, value: string) => {
    const number = numberFilter(value);
    const prevNumber = numberFilter(prevValue);

    const numbers = getArrayofNumbers(number);
    const prevNumbers = getArrayofNumbers(prevNumber);

    const isTotalNumberIncreasing = +number > +prevNumber;

    const result = numbers.map((numStr: string, i: number) => {
      const num = +numStr;
      const prev = prevNumbers[i] ? +prevNumbers[i] : 0;

      const isSomethingZero = num === 0 || prev === 0;

      const isIncreasing = isSomethingZero
        ? isTotalNumberIncreasing
        : prev < num;
      const isLevelChanging = prev - num >= 2;

      return {
        numbers: getDiskNumbers(prev, num, isIncreasing, isLevelChanging),
        isIncreasing,
      };
    });

    const sepIndex = getFormatSeperatorIndex(value);

    if (sepIndex >= 0) {
      result.splice(sepIndex, 0, {
        numbers: [SEPERATOR],
        isIncreasing: true,
      });
    }

    return result;
  };

  return {
    getDiskNumbers,
    createCounterMap,
  };
};

export default useCounter;
