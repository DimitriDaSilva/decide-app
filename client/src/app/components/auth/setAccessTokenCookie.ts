import { AUTH_COOKIE_NAME } from "@/app/constants";
import jwtDecode, { JwtPayload } from "jwt-decode";
import Cookies from "universal-cookie";

const setAccessTokenCookie = (accessToken: string) => {
  const cookies = new Cookies();

  const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);

  if (!decodedAccessToken.exp) {
    throw new Error("Invalid access token");
  }

  cookies.set(AUTH_COOKIE_NAME, accessToken, {
    expires: new Date(decodedAccessToken.exp * 1000),
  });
};

export { setAccessTokenCookie };
