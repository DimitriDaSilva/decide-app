import { ReactComponent as TextLogo } from '@/assets/logos/logo-text.svg';
import { ResizeableWidth } from '@/app/components/organisms/sidebar/ResizeableWidth';
import { Button } from '@/app/components/atoms/button/Button';
import { removeAccessTokenCookie } from '@/utils/auth';

import { TableList } from './TableList';
import { TableCreationDialog } from './TableCreationDialog';

const SideBar = () => {
  return (
    <ResizeableWidth>
      <div className="flex w-full h-full flex-col justify-between p-4 gap-y-4">
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col gap-y-10 w-full items-center sticky top-4 bg-darkBg pb-5 border-b border-gray-dark mb-5">
            <TextLogo className="w-28 self-start" />

            <TableCreationDialog />
          </div>

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
