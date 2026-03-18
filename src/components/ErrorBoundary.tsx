import type { ReactNode } from 'react';
import { Component } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <main className="container mx-auto px-4 py-16">
          <div className="card bg-base-100 shadow-sm">
            <div className="card-body">
              <h1 className="card-title text-2xl">Something went wrong</h1>
              <p className="text-base-content/70">
                An unexpected error occurred while rendering this page. Please try again.
              </p>
              {this.state.error?.message && (
                <p className="text-sm text-base-content/60">{this.state.error.message}</p>
              )}
              <div className="card-actions justify-end">
                <button type="button" className="btn btn-primary" onClick={this.handleReset}>
                  Try again
                </button>
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => window.location.reload()}
                >
                  Reload
                </button>
              </div>
            </div>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}
