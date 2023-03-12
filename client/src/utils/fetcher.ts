import { AUTH_COOKIE_NAME, routePaths } from '@/app/constants';
import { ApiRoute } from '@/entities/apiRoutes';
import * as _ from 'lodash-es';
import Cookies from 'universal-cookie';

type FetcherOptions = Omit<RequestInit, 'method'>;

const fetcher = async (apiRoute: ApiRoute, options: FetcherOptions = {}) => {
  const url = import.meta.env.VITE_API_BASE_URL + apiRoute.url;
  _.set(options, 'method', apiRoute.method);

  const cookies = new Cookies();
  const accessToken = cookies.get<string | null>(AUTH_COOKIE_NAME);
  _.set(options, 'headers.Authorization', `Bearer ${accessToken}`);

  try {
    const res = await fetch(url, options);

    if (!res.ok) throw new Error(`${res.status}`);

    return (await res.json()) as unknown;
  } catch (err: Error | unknown) {
    if (err instanceof Error && err.message === '401') {
      const basePath = window.location.origin;
      const url = `${basePath}${routePaths.login}`;

      window.location.assign(url);
    }

    throw err;
  }
};

export { fetcher };
