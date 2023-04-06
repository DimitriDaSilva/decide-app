import { useParams } from 'react-router-dom';

import { SideBar } from './SideBar';

type TablePageUrlParam = {
  tableId: string;
};

const TablesPage = () => {
  const { tableId } = useParams<TablePageUrlParam>();

  return (
    <div className="flex flex-1">
      <SideBar />
      <div className="flex flex-grow">table {tableId}</div>
    </div>
  );
};

export { TablesPage };
