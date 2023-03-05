import { ReactComponent as TextLogo } from "@/assets/logo-text.svg";
import { Button } from "../button/Button";

const PageHeader = () => {
  return (
    <header className="w-full flex justify-between py-3 md:py-8 border-b border-gray-dark border-opacity-30">
      <TextLogo className="w-[90px] md:w-auto" />

      <div className="flex gap-x-7">
        <Button variant="ghost" color="secondary">
          Log in
        </Button>
        <Button variant="filled" color="gradient">
          Sign up
        </Button>
      </div>
    </header>
  );
};

export { PageHeader };
