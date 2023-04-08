/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx';
import { PropsWithChildren, useState } from 'react';

import { ReactComponent as DoubleArrowsIcons } from '@/assets/icons/double-arrows.svg';

type ResizeableWidthProps = PropsWithChildren<{
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
}>;

const ResizeableWidth = ({
  children,
  defaultWidth = 240,
  minWidth = 180,
  maxWidth = (window.innerWidth * 2) / 5,
}: ResizeableWidthProps) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(defaultWidth);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleResize = (e: MouseEvent) => {
    if (maxWidth < e.clientX) return;

    setSidebarWidth((prev) => {
      if (prev < (minWidth * 2) / 3) {
        setIsCollapsed(true);
        return 0;
      } else {
        return e.clientX;
      }
    });
  };

  const handleMouseDown = () => {
    document.addEventListener('mousemove', handleResize);
    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleResize);
    });
  };

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => {
      if (prev) setSidebarWidth(minWidth);

      return !prev;
    });
  };

  return (
    <aside
      className={clsx(
        'h-screen select-none flex relative transition-all ease-in-out duration-500',
      )}
      style={{ width: isCollapsed ? 0 : sidebarWidth }}
    >
      <div
        className={clsx(
          'overflow-x-hidden min-w-full transition-opacity ease-in-out duration-500',
          isCollapsed && 'opacity-0',
        )}
      >
        {children}
      </div>

      <div
        className={clsx(
          'w-2 cursor-col-resize focus:border-pink h-screen border-r border-gray-dark hover:border-gray-base transition-colors',
        )}
        onMouseDown={handleMouseDown}
      />
      <DoubleArrowsIcons
        onClick={toggleCollapsed}
        className={clsx(
          'cursor-pointer outline-gray-dark absolute top-6 outline-offset-4 hover:outline hover:outline-gray-dark rounded-sm hover:outline-offset-4 transition-all duration-300',
          isCollapsed ? 'transform rotate-180 -right-14' : 'right-6',
        )}
      />
    </aside>
  );
};

export { ResizeableWidth };
