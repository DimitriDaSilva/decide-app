import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

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
  const textRef = useRef<HTMLParagraphElement>(null);
  const [isTruncated, setIsTruncated] = useState(false);

  const TextComponent = (
    <p ref={textRef} className="truncate text-left">
      {title}
    </p>
  );

  useEffect(() => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  }, [textRef.current]);

  return (
    <Link to={`/tables/${id}`}>
      {isTruncated ? (
        <TooltipProvider delayDuration={400}>
          <Tooltip>
            <TooltipTrigger className="max-w-full">
              {TextComponent}
            </TooltipTrigger>
            <TooltipContent side="right">{title}</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ) : (
        TextComponent
      )}
    </Link>
  );
};

export { TableListItem };
