export const API_ROUTE_URL = {
  SIGN_UP: '/auth/signup',
  LOGIN: '/auth/login',
};

type SignUpRoute = {
  url: typeof API_ROUTE_URL.SIGN_UP;
  method: 'POST';
};

type LoginRoute = {
  url: typeof API_ROUTE_URL.LOGIN;
  method: 'POST';
};

export type ApiRoute = SignUpRoute | LoginRoute;
