import { useGetTablesQuery } from '@/entities/tables/useGetTablesQuery';

import { TableListItem } from './TableLIstItem';

const TableList = () => {
  const { data: tables } = useGetTablesQuery();

  if (!tables) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-y-6">
      <p className="text-gray-base">Tables</p>
      <ul className="flex flex-col gap-y-3 ">
        {tables
          .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
          .map(({ title, id }) => (
            <TableListItem key={id} title={title} id={id} />
          ))}
      </ul>
    </div>
  );
};

export { TableList };
