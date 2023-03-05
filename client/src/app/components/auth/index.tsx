import { ReactComponent as ColorLogo } from "@/assets/logo-color.svg";
import { Input } from "../forms/Input";
import { Page } from "../layout/Page";

type AuthPages = "login" | "signup";
const label: Record<AuthPages, string> = {
  login: "Log in",
  signup: "Sign up",
};

type AuthProps = {
  page: AuthPages;
};

const Auth = ({ page }: AuthProps) => {
  const handleOnSubmit = (e: React.FormEvent) => {
    console.log("submitting");
  };

  return (
    <Page className="bg-gradient-to-b from-darkBg via-darkBg to-third justify-center gap-y-10">
      <ColorLogo />

      <form className="flex flex-col gap-y-6 w-72" onSubmit={handleOnSubmit}>
        <Input
          label="Email"
          id="email"
          type="email"
          placeholder="Enter your email address"
        />
        <Input
          label="Password"
          id="password"
          type="password"
          placeholder="Enter your password"
        />
        <button
          type="submit"
          className="mt-5 rounded-sm bg-primary px-5 py-4 placeholder-gray-base focus:outline focus:outline-primary outline-offset-1"
        >
          {label[page]}
        </button>
      </form>
    </Page>
  );
};

export { Auth };
