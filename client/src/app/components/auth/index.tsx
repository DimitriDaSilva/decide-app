import { ReactComponent as ColorLogo } from "@/assets/logo-color.svg";
import { useLoginMutation } from "@/entities/auth/api/useLoginMutation";
import { useSignUpMutation } from "@/entities/auth/api/useSignupMutation";
import { Input } from "../forms/Input";
import { Page } from "../layout/Page";
import { setAccessTokenCookie } from "./setAccessTokenCookie";

interface AuthFormElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
  password: HTMLInputElement;
}
interface AuthFormElement extends HTMLFormElement {
  readonly elements: AuthFormElements;
}

type AuthPages = "login" | "signup";
const labels = {
  login: {
    header: "Log in to the Decide app",
    ctaButton: "Log in",
  },
  signup: {
    header: "Create your Decide account",
    ctaButton: "Sign up",
  },
};

type AuthProps = {
  page: AuthPages;
};

const Auth = ({ page }: AuthProps) => {
  const { mutateAsync: login } = useLoginMutation();
  const { mutateAsync: signup } = useSignUpMutation();

  const handleOnSubmit = async (e: React.FormEvent<AuthFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget.elements;

    const body = {
      email: target.email.value,
      password: target.password.value,
    };

    let res: Response | undefined;
    if (page === "login") {
      res = await login({ body });
    } else {
      res = await signup({ body });
    }

    const data = (await res.json()) as { access_token: string };
    setAccessTokenCookie(data.access_token);
  };

  return (
    <Page className="fixed w-full h-full bg-gradient-to-b from-darkBg via-darkBg to-third justify-center gap-y-10">
      <ColorLogo />

      <p>{labels[page].header}</p>

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
          {labels[page].ctaButton}
        </button>
      </form>
    </Page>
  );
};

export { Auth };
