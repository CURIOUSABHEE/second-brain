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
  primary:
    "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
  secondary:
    "bg-white text-indigo-600 border border-indigo-600 hover:bg-indigo-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2",
};
const defaultStyle =
  "flex items-center rounded-md font-medium transition-colors duration-200";

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
