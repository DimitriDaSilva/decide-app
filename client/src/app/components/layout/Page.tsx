import { ReactNode } from "react";
import clsx from "clsx";

type PageProps = {
  className?: string;
  children: ReactNode;
};
const Page = ({ className, children }: PageProps) => (
  <div className={clsx("flex flex-1 flex-col bg-darkBg px-12", className)}>
    {children}
  </div>
);

export { Page };
