import React from "react";

export interface ButtonProps {
  variants: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: "+" | "-";
  // endIcon?: any;
  onClick: () => void;
}

const Button = (props: ButtonProps) => {
  const sizeClasses = {
    sm: "px-2 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-sm",
  };

  const variantClasses = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-200 text-black",
  };
  return (
    <div
      className={`flex flex-initial border-2 border-blue-800 rounded-s-md bg-blue-200 font-bold ${sizeClasses[props.size]} ${variantClasses[props.variants]}`}
      onClick={() => {
        console.log("button Clicked");
      }}
    >
      <h1 className="pr-2">{props.startIcon}</h1>
      <h1>{props.text}</h1>
    </div>
  );
};

export default Button;
