import { useParams } from 'react-router-dom';

type TablePageUrlParam = {
  tableId: string;
};

const Table = () => {
  const { tableId } = useParams<TablePageUrlParam>();
  return <>table {tableId}</>;
};

export { Table };
