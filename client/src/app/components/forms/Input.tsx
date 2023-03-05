import clsx from "clsx";
import React, { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  id: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, id, className, ...rest }: InputProps) => {
  return (
    <label className="flex flex-col gap-y-2" htmlFor={id}>
      {label}
      <input
        {...rest}
        className={clsx(
          "rounded-sm bg-third px-5 py-3 placeholder-gray-base focus:outline focus:outline-primary",
          className
        )}
      />
    </label>
  );
};

export { Input };
