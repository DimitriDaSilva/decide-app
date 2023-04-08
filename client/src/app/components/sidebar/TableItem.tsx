import { Link } from 'react-router-dom';

type TableItemProps = {
  title: string;
  id: number;
};

const TableItem = ({ title, id }: TableItemProps) => {
  return (
    <Link to={`/tables/${id}`}>
      <p className="truncate w-full">{title}</p>
    </Link>
  );
};

export { TableItem };
