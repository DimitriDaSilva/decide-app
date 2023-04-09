import { useQuery } from '@tanstack/react-query';

import { fetcher } from '@/utils/fetcher';

import { API_ROUTE_URL } from '../apiRoutes';
import { queryKeys } from '../queryKeys';

import { TableListResponseSchema } from './tables.dto';

const getTables = async () => {
  const res = await fetcher({ url: API_ROUTE_URL.TABLES, method: 'GET' });

  return TableListResponseSchema.parse(res);
};

const useGetTablesQuery = () => {
  return useQuery(queryKeys.tables.all, getTables);
};

export { useGetTablesQuery };
