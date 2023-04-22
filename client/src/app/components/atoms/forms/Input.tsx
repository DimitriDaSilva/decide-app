import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';

type InputProps = {
  label: string;
  id: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({ label, id, className, ...inputProps }: InputProps) => {
  return (
    <label className="flex flex-col gap-y-2 text-sm md:text-base" htmlFor={id}>
      {label}
      <input
        {...inputProps}
        id={id}
        className={clsx(
          'rounded-sm text-sm md:text-base bg-third px-5 py-3 placeholder-gray-base focus:outline focus:outline-primary',
          className,
        )}
      />
    </label>
  );
};

export { Input };
