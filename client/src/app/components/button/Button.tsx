import clsx from "clsx";
import { ReactNode } from "react";
import { ButtonColor, buttonDesign, ButtonVariant } from "./common";

type ButtonProps = {
  variant: ButtonVariant;
  color: ButtonColor;
  children: ReactNode;
  className?: string;
};

const Button = ({ children, variant, color, className }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "py-3 px-8 text-white rounded-full transition-shadow",
        buttonDesign(variant, color),
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button };
