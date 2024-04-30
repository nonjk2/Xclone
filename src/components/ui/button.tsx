"use client";
import React from "react";

interface ButtonProps extends MyButtonProps {
  onClick?: () => void;
  title: JSX.Element;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  children?: JSX.Element;
}

interface MyButtonProps {
  color: "white" | "blue" | "hoverBlue" | "hoverBlack" | "lightBlack" | "black";
  backgroundColor: "white" | "blue" | "lightBlack" | "black";
  hoverColor:
    | "hoverBlue"
    | "hoverBlack"
    | "hoverLightBlue"
    | "hoverLightBlack"
    | "hoverBgblue";
  size:
    | "tweet1"
    | "tweet2"
    | "tweet3"
    | "getVerify"
    | "follow"
    | "logout"
    | "login1"
    | "login2"
    | "register"
    | "message"
    | "main"
    | "draft"
    | "editProfile";
  borderColor?: "blue" | "gray";
}

const colorStyles = {
  white: "text-white",
  blue: "text-blue-500",
  black: "text-black",
  gray: "text-gray-500",

  hoverBlue: "hover:text-blue",
  hoverLightBlue: "hover:bg-hoverLightBlue",
  hoverBlack: "hover:bg-hoverBlack",
  lightBlack: "hover:bg-hoverLightBlack",
  hoverBgblue: "hover:bg-hoverBlue",
  hoverLightBlack: "hover:bg-gray",
};
const bgColorStyles = {
  white: "bg-white",
  blue: "bg-blue",
  black: "bg-black",
  lightBlack: "hover:bg-gray",
  gray: "bg-[rgba(82,82,82,0.75)]",
};

const sizeStyles = {
  tweet1: "w-full h-[52px] px-8 text-[17px] font-bold",
  tweet2: "w-[75px] h-9 px-4 w-full",
  tweet3: "w-full h-full",
  draft: "h-9 px-4 border-none",
  getVerify: "h-9 px-4 w-[120px] text-[15px]",
  follow: "w-[78px] h-8 px-4 w-full",
  logout: "w-256 h-44 px-24 w-full",
  login1: "w-300 h-10 w-full",
  login2: "w-[300px] h-9 px-4 w-full",
  register: "w-[440px] h-[52px] px-32 w-full",
  message: "w-[200px] h-[52px]",
  main: "w-300 h-40 w-full",
  editProfile: "w-[113.73px] h-9 font-semibold",
};

const MyButton: React.FC<ButtonProps> = ({
  color,
  size,
  backgroundColor,
  hoverColor,
  borderColor,
  onClick,
  disabled,
  children,
  type,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`border rounded-full outline-none transition duration-200 ${
        sizeStyles[size]
      } border-buttonBorderGray ${color && colorStyles[color]} ${
        backgroundColor && bgColorStyles[backgroundColor]
      } ${hoverColor && !disabled && colorStyles[hoverColor]} ${
        disabled && bgColorStyles["gray"]
      }`}
    >
      {children}
    </button>
  );
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    onClick,
    title,
    type = "button",
    color,
    size,
    backgroundColor,
    hoverColor,
    borderColor,
    disabled,
  } = props;

  return (
    <MyButton
      type={type}
      color={color}
      size={size}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      borderColor={borderColor}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {title}
    </MyButton>
  );
};

export default Button;
