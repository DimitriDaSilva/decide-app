import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { useGetTablesQuery } from '@/entities/tables/useGetTablesQuery';
import { routePaths } from '@/app/routePaths';

import { SideBar } from '../../components/organisms/sidebar';

type TablePageUrlParam = {
  tableId: string;
};

const TablesPage = () => {
  const { tableId } = useParams<TablePageUrlParam>();
  const { data: tables } = useGetTablesQuery();
  const navigate = useNavigate();
  const location = useLocation();

  if (!tables) {
    return <div>Loading...</div>;
  }

  if (location.state?.from === routePaths.home) {
    const mostRecentTable = tables.reduce((prev, curr) => {
      return prev.updatedAt.getTime() > curr.updatedAt.getTime() ? prev : curr;
    });

    navigate(routePaths.tables.replace(':tableId', `${mostRecentTable.id}`));
  }

  return (
    <div className="flex flex-1">
      <SideBar />
      <div className="flex select-none flex-grow">table {tableId}</div>
    </div>
  );
};

export { TablesPage };
