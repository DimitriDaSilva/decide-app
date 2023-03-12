import jwtDecode, { JwtPayload } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

import { ReactComponent as TextLogo } from "@/assets/logo-text.svg";
import { AUTH_COOKIE_NAME, routePaths } from "@/app/constants";

import { Button } from "../button/Button";

const removeAccessTokenCookie = () => {
  const cookies = new Cookies();

  cookies.remove(AUTH_COOKIE_NAME);

  window.location.reload();
};

const isUserAuthenticated = () => {
  const cookies = new Cookies();

  const accessToken = cookies.get<string | null>(AUTH_COOKIE_NAME);

  if (!accessToken) return false;

  const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);

  if (!decodedAccessToken.exp) {
    throw new Error("Invalid access token");
  }

  if (decodedAccessToken.exp * 1000 < Date.now()) return false;

  return true;
};

const PageHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full flex justify-between py-3 md:py-8 border-b border-gray-dark border-opacity-30">
      <TextLogo className="w-[90px] md:w-auto" />

      {isUserAuthenticated() ? (
        <Button
          onClick={removeAccessTokenCookie}
          variant="ghost"
          color="secondary"
        >
          Log out
        </Button>
      ) : (
        <div className="flex gap-x-7">
          <Button
            onClick={() => navigate(routePaths.login)}
            variant="ghost"
            color="secondary"
          >
            Log in
          </Button>
          <Button
            onClick={() => navigate(routePaths.signup)}
            variant="filled"
            color="gradient"
          >
            Sign up
          </Button>
        </div>
      )}
    </header>
  );
};

export { PageHeader };
