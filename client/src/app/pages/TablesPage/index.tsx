import { useParams } from 'react-router-dom';

import { SideBar } from '../../components/organisms/sidebar/SideBar';

type TablePageUrlParam = {
  tableId: string;
};

const TablesPage = () => {
  const { tableId } = useParams<TablePageUrlParam>();

  return (
    <div className="flex flex-1">
      <SideBar />
      <div className="flex select-none flex-grow">table {tableId}</div>
    </div>
  );
};

export { TablesPage };
