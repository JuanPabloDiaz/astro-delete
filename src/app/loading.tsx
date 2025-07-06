import React from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <LoadingSpinner size="large" />
      <p className="mt-4 text-xl font-comic">Loading Marvel content...</p>
    </div>
  );
}
