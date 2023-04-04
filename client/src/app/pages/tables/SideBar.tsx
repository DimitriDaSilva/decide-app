import { ReactComponent as TextLogo } from '@/assets/logos/logo-text.svg';
import { ReactComponent as DoubleArrowsIcons } from '@/assets/icons/double-arrows.svg';
import { ResizeableWidth } from '@/app/components/sidebar/ResizeableWidth';

const SideBar = () => {
  return (
    <ResizeableWidth>
      <div className="flex flex-1">
        <TextLogo />
        <DoubleArrowsIcons />
      </div>
    </ResizeableWidth>
  );
};

export { SideBar };
