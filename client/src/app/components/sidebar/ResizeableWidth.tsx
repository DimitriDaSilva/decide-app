/* eslint-disable jsx-a11y/no-static-element-interactions */
import clsx from 'clsx';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { ReactComponent as DoubleArrowsIcons } from '@/assets/icons/double-arrows.svg';

type ResizeableWidthProps = PropsWithChildren<{
  defaultWidth?: number;
  minWidth?: number;
}>;

const ResizeableWidth = ({
  children,
  defaultWidth = 240,
  minWidth = 150,
}: ResizeableWidthProps) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(defaultWidth);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const startX = useRef<number | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !startX.current) return;
    const delta = e.clientX - startX.current;
    const newWidth = Math.max(0, sidebarWidth + delta);
    setSidebarWidth(newWidth);
    startX.current = e.clientX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (sidebarWidth < minWidth) {
      return setSidebarWidth(minWidth);
    } else if (sidebarWidth > window.innerWidth / 3) {
      return setSidebarWidth(window.innerWidth / 3);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, sidebarWidth]);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    startX.current = e.clientX;
  };

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <aside
      className={clsx(
        'h-screen flex relative transition-all ease-in-out duration-500',
        isCollapsed && 'transform -translate-x-full',
      )}
      style={{ width: sidebarWidth }}
    >
      {children}

      <div
        className={clsx(
          'w-2 cursor-col-resize h-screen border-r border-gray-dark hover:border-gray-base transition-colors',
          isDragging && 'border-gray-base',
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
