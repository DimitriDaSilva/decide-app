import { TableListItem } from './TableLIstItem';
import { MOCK_TABLES } from './SideBar';

const TableList = () => {
  return (
    <div className="w-full flex flex-col gap-y-6">
      <p className="text-gray-base">Tables</p>
      <ul className="flex flex-col gap-y-3 ">
        {MOCK_TABLES.map(({ title, id }) => (
          <TableListItem key={id} title={title} id={id} />
        ))}
      </ul>
    </div>
  );
};

export { TableList };
