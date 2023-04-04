/* eslint-disable jsx-a11y/no-static-element-interactions */
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

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

  return (
    <aside className="h-screen flex" style={{ width: sidebarWidth }}>
      {children}
      <div
        className="w-2 cursor-col-resize h-screen border-r border-gray-dark hover:border-gray-base transition-colors"
        onMouseDown={handleMouseDown}
      />
    </aside>
  );
};

export { ResizeableWidth };
