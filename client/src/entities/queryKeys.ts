/* More about this approach here:
   https://tkdodo.eu/blog/effective-react-query-keys#use-query-key-factories **/

const app = ['decide-app'];

const tables = {
  all: [...app, 'tables'] as const,
};

const queryKeys = {
  app,
  tables,
};

export { queryKeys };
