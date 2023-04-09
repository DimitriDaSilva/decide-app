import { ReactComponent as TextLogo } from '@/assets/logos/logo-text.svg';
import { ResizeableWidth } from '@/app/components/organisms/sidebar/ResizeableWidth';
import { Button } from '@/app/components/atoms/button/Button';
import { removeAccessTokenCookie } from '@/utils/auth';

import { TableList } from './TableList';

const SideBar = () => {
  return (
    <ResizeableWidth>
      <div className="flex flex-1 w-full h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-y-10 w-full items-center">
          <TextLogo className="w-28 self-start" />

          <Button variant="filled" color="gradient">
            Add a new table
          </Button>

          <TableList />
        </div>

        <Button
          onClick={removeAccessTokenCookie}
          variant="ghost"
          color="secondary"
        >
          Log out
        </Button>
      </div>
    </ResizeableWidth>
  );
};

export { SideBar };
