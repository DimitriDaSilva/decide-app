import { Component, ErrorInfo, ReactNode } from 'react';

import { Button } from '../button/Button';

interface Props {
  children?: ReactNode;
}

interface State {
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  static componentDidCatch(error: Error, { componentStack }: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.log(error, componentStack);
  }

  private handleResetWindow() {
    window.location.reload();
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <p>
            Sorry, something went wrong ... If the problem persists, contact us
          </p>

          <Button
            variant="ghost"
            color="secondary"
            onClick={this.handleResetWindow.bind(this)}
            className="mt-5"
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
