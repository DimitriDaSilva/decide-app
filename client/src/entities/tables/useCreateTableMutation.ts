import { useMutation, useQueryClient } from '@tanstack/react-query';

import { fetcher } from '@/utils/fetcher';

import { API_ROUTE_URL } from '../apiRoutes';
import { queryKeys } from '../queryKeys';

import { TableRequestDto } from './tables.dto';

type CreateTableProps = {
  body: TableRequestDto;
};

function createTable({ body }: CreateTableProps) {
  return fetcher(
    { url: API_ROUTE_URL.TABLES, method: 'POST' },
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(body),
    },
  );
}

const useCreateTableMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(createTable, {
    onSuccess: () => {
      return queryClient.invalidateQueries(queryKeys.tables.all);
    },
  });
};

export { useCreateTableMutation };
