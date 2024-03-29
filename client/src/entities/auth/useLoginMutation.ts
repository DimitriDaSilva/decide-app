import { useMutation } from '@tanstack/react-query';

import { API_ROUTE_URL } from '@/entities/apiRoutes';
import { fetcher } from '@/utils/fetcher';

import { AuthDto, AuthResponseSchema } from './auth.dto';

type LoginProps = {
  body: AuthDto;
};

const login = async ({ body }: LoginProps) => {
  const res = await fetcher(
    {
      url: API_ROUTE_URL.LOGIN,
      method: 'POST',
    },
    {
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return AuthResponseSchema.parse(res.data);
};

const useLoginMutation = () => {
  return useMutation(login);
};

export { useLoginMutation };
