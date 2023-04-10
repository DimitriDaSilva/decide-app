import clsx from 'clsx';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';

import { ButtonColor, buttonDesign, ButtonVariant } from './common';

type ButtonProps = {
  variant: ButtonVariant;
  color: ButtonColor;
  children: ReactNode;
  className?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant, color, className, ...rest }, ref) => (
    <button
      {...rest}
      className={clsx(
        'py-2 px-5 whitespace-nowrap md:py-3 md:px-8 text-base text-white rounded-full',
        buttonDesign(variant, color),
        className,
      )}
      ref={ref}
    >
      {children}
    </button>
  ),
);
Button.displayName = 'Button';

export { Button };
