import { Link } from 'react-router-dom';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../../atoms/Tooltip';

type TableItemProps = {
  title: string;
  id: number;
};

const TableListItem = ({ title, id }: TableItemProps) => {
  return (
    <Link to={`/tables/${id}`}>
      <TooltipProvider delayDuration={400}>
        <Tooltip>
          <TooltipTrigger className="max-w-full">
            <p className="truncate text-left">{title}</p>
          </TooltipTrigger>
          <TooltipContent side="right">{title}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Link>
  );
};

export { TableListItem };
