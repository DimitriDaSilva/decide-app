import { Link } from 'react-router-dom';

import { ReactComponent as TextLogo } from '@/assets/logos/logo-text.svg';
import { ResizeableWidth } from '@/app/components/sidebar/ResizeableWidth';
import { Button } from '@/app/components/button/Button';
import { removeAccessTokenCookie } from '@/utils/auth';

const SideBar = () => {
  return (
    <ResizeableWidth>
      <div className="flex flex-1 w-full h-full flex-col justify-between p-4">
        <div className="flex flex-col gap-y-10 w-full items-center">
          <TextLogo className="w-28 self-start" />

          <Button variant="filled" color="gradient">
            Add a new table
          </Button>

          <div className="w-full flex flex-col gap-y-6">
            <p className="text-gray-base">Tables</p>
            <ul className="flex flex-col gap-y-3 ">
              <Link to="/tables/1">
                <p className="truncate w-full">
                  Table title Table titleTable titleTable titleTable titleTable
                  titleTable titleTable title
                </p>
              </Link>
              <Link to="/tables/2">
                <p className="truncate w-full">
                  Table title Table titleTable titleTable titleTable titleTable
                  titleTable titleTable title
                </p>
              </Link>
            </ul>
          </div>
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
