import { ReactComponent as TextLogo } from '@/assets/logos/logo-text.svg';
import { ResizeableWidth } from '@/app/components/sidebar/ResizeableWidth';

const SideBar = () => {
  return (
    <ResizeableWidth>
      <div className="flex flex-1 w-full justify-between">
        <TextLogo className="w-28" />
      </div>
    </ResizeableWidth>
  );
};

export { SideBar };
