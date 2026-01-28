import React from "react";

export interface ButtonProps {
  variants: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  // endIcon?: any;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-sm",
};

const variantClasses = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-300 text-purple-500",
};
const defaultStyle =
  "flex items-center border-2 border-blue-800 rounded-md bg-blue-200 font-light";

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${defaultStyle} ${sizeClasses[props.size]} ${variantClasses[props.variants]} ${props.fullWidth ? "w-full justify-center" : ""} ${props.loading ? "opacity-55" : ""}`}
      onClick={props.onClick}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}
      {props.text}
    </button>
  );
};

export default Button;
