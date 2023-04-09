import { useGetTablesQuery } from '@/entities/tables/useGetTablesQuery';

import { TableListItem } from './TableLIstItem';

const MOCK_TABLES = [
  {
    id: 1,
    title: 'Table 1',
  },
  {
    id: 2,
    title: 'Table 2',
  },
  {
    id: 3,
    title: 'Table 3',
  },
];

const TableList = () => {
  const { data: tables } = useGetTablesQuery();

  if (!tables) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-y-6">
      <p className="text-gray-base">Tables</p>
      <ul className="flex flex-col gap-y-3 ">
        {tables.map(({ title, id }) => (
          <TableListItem key={id} title={title} id={id} />
        ))}
      </ul>
    </div>
  );
};

export { TableList };
