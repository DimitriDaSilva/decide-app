import clsx from "clsx";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonColor, buttonDesign, ButtonVariant } from "./common";

type ButtonProps = {
  variant: ButtonVariant;
  color: ButtonColor;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  variant,
  color,
  className,
  ...rest
}: ButtonProps) => {
  return (
    <button
      {...rest}
      className={clsx(
        "py-2 px-5 md:py-3 md:px-8 text-base text-white rounded-full transition-shadow",
        buttonDesign(variant, color),
        className
      )}
    >
      {children}
    </button>
  );
};

export { Button };
