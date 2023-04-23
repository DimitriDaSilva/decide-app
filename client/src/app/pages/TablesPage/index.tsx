import { useLocation, useNavigate } from 'react-router-dom';

import { useGetTablesQuery } from '@/entities/tables/useGetTablesQuery';
import { routePaths } from '@/app/routePaths';

import { SideBar } from '../../components/organisms/sidebar';

import { EmptyTables } from './EmptyTables';
import { Table } from './table';

const TablesPage = () => {
  const { data: tables } = useGetTablesQuery();
  const navigate = useNavigate();
  const location = useLocation();

  if (!tables) {
    return <div>Loading...</div>;
  }

  if (location.state?.from === routePaths.home && tables.length > 0) {
    const mostRecentTable = tables.reduce((prev, curr) => {
      return prev.updatedAt.getTime() > curr.updatedAt.getTime() ? prev : curr;
    });

    navigate(routePaths.tables.replace(':tableId', `${mostRecentTable.id}`));
  }

  return (
    <div className="flex flex-1">
      <SideBar />
      <div className="flex select-none flex-grow">
        {tables.length === 0 ? <EmptyTables /> : <Table />}
      </div>
    </div>
  );
};

export { TablesPage };
