import jwtDecode, { JwtPayload } from 'jwt-decode';
import Cookies from 'universal-cookie';

import { AUTH_COOKIE_NAME } from '@/utils/constants';

const setAccessTokenCookie = (accessToken: string) => {
  const cookies = new Cookies();

  const decodedAccessToken = jwtDecode<JwtPayload>(accessToken);

  if (!decodedAccessToken.exp) {
    throw new Error('Invalid access token');
  }

  cookies.set(AUTH_COOKIE_NAME, accessToken, {
    expires: new Date(decodedAccessToken.exp * 1000),
  });
};

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
    throw new Error('Invalid access token');
  }

  if (decodedAccessToken.exp * 1000 < Date.now()) return false;

  return true;
};

export { setAccessTokenCookie, removeAccessTokenCookie, isUserAuthenticated };
