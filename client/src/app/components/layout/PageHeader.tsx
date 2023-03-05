import { ReactComponent as TextLogo } from "@/assets/logo-text.svg";
import { Button } from "../button/Button";

const PageHeader = () => {
  return (
    <header className="w-full flex justify-between p-8 border-b border-gray-dark">
      <TextLogo />

      <div className="flex gap-x-7">
        <Button variant="ghost" color="secondary" className="">
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
