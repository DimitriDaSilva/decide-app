export const API_ROUTE_URL = {
  SIGN_UP: '/auth/signup' as const,
  LOGIN: '/auth/login' as const,
  TABLES: '/tables' as const,
  TABLES_ID: (id: number) => `/tables/${id}` as const,
};

type SignUpRoute = {
  url: typeof API_ROUTE_URL.SIGN_UP;
  method: 'POST';
};

type LoginRoute = {
  url: typeof API_ROUTE_URL.LOGIN;
  method: 'POST';
};

type TableRoute = {
  url: typeof API_ROUTE_URL.TABLES;
  method: 'POST' | 'GET';
};

export type ApiRoute = SignUpRoute | LoginRoute | TableRoute;
