import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

import { Button } from '@/app/components/atoms/button/Button';
import { Page } from '@/app/components/atoms/layout/Page';
import { routePaths } from '@/app/routePaths';
import { isUserAuthenticated } from '@/utils/auth';

import { HomePageHeader } from './PageHeader';

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isUserAuthenticated()) {
      navigate(routePaths.tables, { state: { from: routePaths.home } });
    }
  }, []);

  return (
    <Page>
      <HomePageHeader />

      <div className=" w-full md:w-2/3 h-full flex flex-col justify-center items-center gap-y-20">
        <div className="flex flex-col gap-y-14">
          <h1 className="font-extrabold text-transparent text-7xl md:text-8xl bg-clip-text header-gradient text-center">
            Make hard decisions easy with Decide
          </h1>
          <p className="text-gray-base text-lg text-center">
            Stop agonizing over your dilemma and take action! The solution is at
            your fingertips - create your first Decide table. This powerful tool
            will help you organize your thoughts, compare options, and
            ultimately reach a confident decision. Don&apos;t waste any more
            time or energy on indecision. Start your Decide table today and take
            control of your future.
          </p>
        </div>

        <Button
          onClick={() => navigate(routePaths.signup)}
          color="gradient"
          variant="filled"
        >
          Get started
        </Button>
      </div>
    </Page>
  );
};

export { HomePage };
