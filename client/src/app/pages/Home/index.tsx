import { useNavigate } from 'react-router-dom';

import { Button } from '@/app/components/button/Button';
import { Page } from '@/app/components/layout/Page';
import { PageHeader } from '@/app/components/layout/PageHeader';
import { routePaths } from '@/app/constants';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Page>
      <PageHeader />

      <div className=" w-full md:w-2/3 h-full flex flex-col justify-center items-center gap-y-20">
        <div className="flex flex-col gap-y-14">
          <h1 className="font-extrabold text-transparent text-7xl md:text-8xl bg-clip-text header-gradient text-center">
            Make hard decisions easy with Decide
          </h1>
          <p className="text-gray-base text-lg text-center">
            Are you struggling to make a decision?
            <br />
            Use the power of pros & cons tables to take the best decision.
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

export default HomePage;
