"use client";

import React from 'react';
import Link from 'next/link';

interface ErrorPageProps {
  error: Error;
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  React.useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="comic-card max-w-2xl w-full p-6">
        <div className="absolute -top-4 -right-4 bg-[var(--marvel-yellow)] text-black transform rotate-12 px-8 py-2 font-bold text-xl z-10">
          ERROR
        </div>
        
        <h1 className="comic-title text-4xl mb-6 text-[var(--marvel-red)]">
          OOPS! SOMETHING WENT WRONG
        </h1>
        
        <p className="text-xl mb-8">
          Even the mightiest heroes face challenges. We&apos;ve encountered an unexpected error.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button 
            onClick={reset}
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
