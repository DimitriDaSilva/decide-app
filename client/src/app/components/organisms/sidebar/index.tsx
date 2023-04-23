import { ReactComponent as TextLogo } from '@/assets/logos/logo-text.svg';
import { ResizeableWidth } from '@/app/components/organisms/sidebar/ResizeableWidth';
import { Button } from '@/app/components/atoms/button/Button';
import { removeAccessTokenCookie } from '@/utils/auth';

import { TableCreationDialog } from '../TableCreationDialog';

import { TableList } from './TableList';

const SideBar = () => {
  return (
    <ResizeableWidth className="mb-4">
      <div className="flex w-full h-full flex-col justify-between px-4 gap-y-4">
        <div className="flex flex-col w-full items-center">
          <div className="flex flex-col gap-y-10 w-full items-center sticky top-0 pt-4 bg-darkBg pb-5 border-b border-gray-dark mb-5">
            <TextLogo className="w-28 self-start" />

            <TableCreationDialog buttonLabel="Add a new table" />
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
