import { ReactNode } from 'react';
import clsx from 'clsx';

type PageProps = {
  className?: string;
  children: ReactNode;
};
const Page = ({ className, children }: PageProps) => (
  <div
    className={clsx(
      'flex flex-1 items-center flex-col bg-darkBg px-6 md:px-12',
      className,
    )}
  >
    {children}
  </div>
);

export { Page };
