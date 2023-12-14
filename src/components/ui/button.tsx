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
  hoverColor: "hoverBlue" | "hoverBlack" | "hoverLightBlue" | "hoverLightBlack";
  size:
    | "tweet1"
    | "tweet2"
    | "getVerify"
    | "follow"
    | "logout"
    | "login1"
    | "login2"
    | "register"
    | "message"
    | "main"
    | "editProfile";
  borderColor?: "blue" | "gray";
}

const colorStyles = {
  white: "text-white",
  blue: "text-blue-500",
  black: "text-black",
  gray: "text-gray-500",

  hoverBlue: "hover:text-blue-700",
  hoverLightBlue: "hover:bg-blue-100",
  hoverBlack: "hover:text-black",
  lightBlack: "hover:bg-gray-100",
  hoverLightBlack: "hover:bg-gray-100",
};

const sizeStyles = {
  tweet1: "w-90 h-52 px-32 text-17 font-semibold",
  tweet2: "w-75 h-36 px-16",
  getVerify: "w-120.16 h-36 px-16",
  follow: "w-78 h-32 px-16",
  logout: "w-256 h-44 px-24",
  login1: "w-300 h-10 px-16",
  login2: "w-300 h-36 px-16",
  register: "w-440 h-52 px-32",
  message: "w-200 h-52",
  main: "w-300 h-40",
  editProfile: "w-113.73 h-36 font-semibold",
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
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`w-full border rounded-full outline-none transition duration-200 font-bold ${sizeStyles[size]} border-buttonBorderGray hover:bg-${hoverColor}`}
    >
      {children}
    </button>
  );
};

const Button: React.FC<ButtonProps> = (props) => {
  const {
    onClick,
    title,
    type,
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
