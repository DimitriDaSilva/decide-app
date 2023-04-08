import { Link } from 'react-router-dom';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../Tooltip';

type TableItemProps = {
  title: string;
  id: number;
};

const TableItem = ({ title, id }: TableItemProps) => {
  return (
    <Link to={`/tables/${id}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <p className="truncate w-full">{title}</p>
          </TooltipTrigger>
          <TooltipContent side="right">{title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};

export { TableItem };
