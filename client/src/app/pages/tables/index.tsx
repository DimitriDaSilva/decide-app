import { useParams } from 'react-router-dom';

type TablePageUrlParam = {
  tableId: string;
};

const TablesPage = () => {
  const { tableId } = useParams<TablePageUrlParam>();

  return <div>table {tableId}</div>;
};

export { TablesPage };
