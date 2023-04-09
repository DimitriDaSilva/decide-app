import { QueryCache, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { triggerErrorToast } from '@/app/components/user-feedback/Toasts';
import { routePaths } from '@/app/routePaths';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: (error: unknown) => {
        if (error instanceof AxiosError && error.response) {
          return error.response?.status >= 500;
        } else {
          return false;
        }
      },
      retry: false,
    },
  },
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          triggerErrorToast(
            'You need to be logged in to access this page. You will now be redirected to the login page',
          );
          setTimeout(() => window.location.replace(routePaths.login), 3000);
        } else {
          triggerErrorToast(
            'An error occurred while fetching data. Please try again later',
          );
        }
      }
    },
  }),
});

export { queryClient };
