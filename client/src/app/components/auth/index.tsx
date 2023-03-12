import { routePaths } from "@/app/constants";
import { ReactComponent as ColorLogo } from "@/assets/logo-color.svg";
import { useLoginMutation } from "@/entities/auth/api/useLoginMutation";
import { useSignUpMutation } from "@/entities/auth/api/useSignupMutation";
import { AuthResponseDto } from "@/entities/auth/types";
import { useNavigate } from "react-router-dom";
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
  page: "login" | "signup";
};

const Auth = ({ page }: AuthProps) => {
  const { mutateAsync: login } = useLoginMutation();
  const { mutateAsync: signup } = useSignUpMutation();
  const navigate = useNavigate();

  const handleOnSubmit = async (e: React.FormEvent<AuthFormElement>) => {
    e.preventDefault();

    const target = e.currentTarget.elements;

    const body = {
      email: target.email.value,
      password: target.password.value,
    };

    let data: AuthResponseDto;
    if (page === "login") {
      data = await login({ body });
    } else {
      data = await signup({ body });
    }

    setAccessTokenCookie(data.access_token);
    navigate(routePaths.home);
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
