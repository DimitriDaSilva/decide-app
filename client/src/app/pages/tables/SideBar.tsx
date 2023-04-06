import { Link } from 'react-router-dom';

import { ReactComponent as TextLogo } from '@/assets/logos/logo-text.svg';
import { ResizeableWidth } from '@/app/components/sidebar/ResizeableWidth';
import { Button } from '@/app/components/button/Button';

const SideBar = () => {
  return (
    <ResizeableWidth>
      <div className="flex flex-1 w-full flex-col justify-between p-4">
        <div className="flex flex-col gap-y-10 w-full items-center">
          <TextLogo className="w-28 self-start" />

          <Button variant="filled" color="gradient">
            Add a new table
          </Button>

          <div>
            <p>Tables</p>
            <ul>
              <Link to="/tables/1">Table title</Link>
            </ul>
          </div>
        </div>
      </div>
    </ResizeableWidth>
  );
};

export { SideBar };
