import * as _ from 'lodash-es';
import Cookies from 'universal-cookie';
import axios, { AxiosRequestConfig } from 'axios';

import { AUTH_COOKIE_NAME } from '@/utils/constants';
import { ApiRoute } from '@/entities/apiRoutes';

type FetcherOptions = Omit<AxiosRequestConfig, 'method' | 'url'>;

const fetcher = async (apiRoute: ApiRoute, options: FetcherOptions = {}) => {
  const url = import.meta.env.VITE_API_BASE_URL + apiRoute.url;

  const cookies = new Cookies();
  const accessToken = cookies.get<string | null>(AUTH_COOKIE_NAME);
  _.set(options, 'headers.Authorization', `Bearer ${accessToken}`);

  return await axios({
    method: apiRoute.method,
    url,
    ...options,
  });
};

export { fetcher };
