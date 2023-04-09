import { useMutation } from '@tanstack/react-query';

import { API_ROUTE_URL } from '@/entities/apiRoutes';
import { fetcher } from '@/utils/fetcher';

import { AuthDto, AuthResponseSchema } from './auth.dto';

type SignUpProps = {
  body: AuthDto;
};

const signUp = async ({ body }: SignUpProps) => {
  const data = await fetcher(
    {
      url: API_ROUTE_URL.SIGN_UP,
      method: 'POST',
    },
    {
      data: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  return AuthResponseSchema.parse(data);
};

const useSignUpMutation = () => {
  return useMutation(signUp);
};

export { useSignUpMutation };
