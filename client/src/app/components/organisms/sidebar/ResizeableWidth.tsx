/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx';
import { PropsWithChildren, useState } from 'react';
import { useMediaQuery } from 'usehooks-ts';
import { ChevronsLeft } from 'lucide-react';

import { devices } from '@/utils/responsive-device';

const LOCAL_STORAGE_KEY_IS_SIDEBAR_COLLAPSED = 'isCollapsed';

type ResizeableWidthProps = PropsWithChildren<{
  defaultWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  className?: string;
}>;

const ResizeableWidth = ({
  children,
  defaultWidth = 240,
  minWidth = 180,
  maxWidth = (window.innerWidth * 2) / 5,
  className,
}: ResizeableWidthProps) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(defaultWidth);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(
    localStorage.getItem(LOCAL_STORAGE_KEY_IS_SIDEBAR_COLLAPSED) === 'true',
  );
  const isMobile = !useMediaQuery(devices.mobile);

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
      if (prev) setSidebarWidth(defaultWidth);

      localStorage.setItem(
        LOCAL_STORAGE_KEY_IS_SIDEBAR_COLLAPSED,
        String(!prev),
      );

      return !prev;
    });
  };

  return (
    <aside
      className="h-screen fixed z-10 bg-darkBg select-none flex xs:relative transition-all ease-in-out duration-500"
      style={{ width: isCollapsed ? 0 : isMobile ? '100vw' : sidebarWidth }}
    >
      <div
        className={clsx(
          'overflow-x-hidden min-w-full transition-opacity ease-in-out duration-500',
          isCollapsed && 'opacity-0',
          className,
        )}
      >
        {children}
      </div>

      <div
        className="hidden xs:block absolute top-0 right-1 w-2 cursor-col-resize h-screen border-r  border-gray-dark hover:border-gray-base transition-colors"
        onMouseDown={handleMouseDown}
      />

      <ChevronsLeft
        onClick={toggleCollapsed}
        className={clsx(
          'cursor-pointer text-gray-dark outline-gray-dark absolute top-6 outline-offset-4 hover:outline hover:outline-gray-dark rounded-sm hover:outline-offset-4 transition-all duration-300',
          isCollapsed ? 'transform rotate-180 -right-14' : 'right-6',
        )}
      />
    </aside>
  );
};

export { ResizeableWidth };
