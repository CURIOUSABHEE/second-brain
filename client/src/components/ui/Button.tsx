import React from "react";

export interface ButtonProps {
  variants: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  // endIcon?: any;
  onClick: () => void;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-sm",
};

const variantClasses = {
  primary: "bg-blue-500 text-white",
  secondary: "bg-gray-200 text-black",
};

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`flex items-center border-2 border-blue-800 rounded-md bg-blue-200 font-bold ${sizeClasses[props.size]} ${variantClasses[props.variants]}`}
      onClick={() => {
        console.log("button Clicked");
      }}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
      {props.text}
    </button>
  );
};

export default Button;
