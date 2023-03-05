import { Page } from "@/app/components/layout/Page";
import { PageHeader } from "@/app/components/layout/PageHeader";

const HomePage = () => {
  return (
    <Page>
      <PageHeader />

      <h1 className="font-extrabold text-transparent text-8xl bg-clip-text header-gradient">
        home page
      </h1>
    </Page>
  );
};

export default HomePage;
