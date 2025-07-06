"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
          <div className="comic-card max-w-2xl w-full p-6">
            <h2 className="comic-title text-3xl mb-4 text-[var(--marvel-red)]">Oops! Something went wrong</h2>
            <p className="mb-6">
              Even superheroes encounter problems sometimes. Please try again later or contact support if the issue persists.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => this.setState({ hasError: false, error: null })}
                className="comic-button"
              >
                Try Again
              </button>
              <Link href="/" className="comic-button bg-gray-800 text-white">
                Return Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
