import { useNavigate } from 'react-router-dom';

import { ReactComponent as TextLogo } from '@/assets/logo-text.svg';
import { routePaths } from '@/app/constants';

import { Button } from '../../components/button/Button';
import {
  isUserAuthenticated,
  removeAccessTokenCookie,
} from '../../../utils/auth';

const HomePageHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full flex justify-between py-3 md:py-8 border-b border-gray-dark border-opacity-30">
      <TextLogo className="w-[90px] md:w-auto" />

      {isUserAuthenticated() ? (
        <Button
          onClick={removeAccessTokenCookie}
          variant="ghost"
          color="secondary"
        >
          Log out
        </Button>
      ) : (
        <div className="flex gap-x-7">
          <Button
            onClick={() => navigate(routePaths.login)}
            variant="ghost"
            color="secondary"
          >
            Log in
          </Button>
          <Button
            onClick={() => navigate(routePaths.signup)}
            variant="filled"
            color="gradient"
          >
            Sign up
          </Button>
        </div>
      )}
    </header>
  );
};

export { HomePageHeader };
