import { Component, ReactNode } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import { Button } from '../../atoms/button/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  error: Error | null;
}
const notify = () => toast('Here is your toast.');

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex flex-1 flex-col justify-center gap-y-4 items-center">
          <Toaster />
          <h1 className="font-extrabold text-transparent text-2xl w-2/3 bg-clip-text header-gradient text-center">
            Sorry, something went wrong... Try to refresh the page. If the
            problem persists, open a GitHub issue{' '}
            <a
              href="https://github.com/DimitriDaSilva/decide-app/issues"
              target="_blank"
              rel="noreferrer"
              className="underline decoration-secondary underline-offset-2"
            >
              here
            </a>{' '}
            or send me a mail at dimitri.gomes.da.silva@gmail.com
          </h1>

          <Button
            variant="ghost"
            color="secondary"
            onClick={notify}
            className="mt-5"
          >
            Test
          </Button>

          <Button
            variant="ghost"
            color="secondary"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}

export { ErrorBoundary };
