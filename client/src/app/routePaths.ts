export const routePaths = {
  home: '/',
  auth: '/auth/:authMode',
  login: '/auth/login',
  signup: '/auth/signup',
  tables: '/tables/:tableId',
  pageNotFound: '/page-not-found',
} as const;
