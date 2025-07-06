"use client";

import React from 'react';

const CharacterCardSkeleton: React.FC = () => {
  return (
    <div className="comic-card h-full flex flex-col overflow-hidden">
      <div className="relative h-48 md:h-64 w-full skeleton"></div>
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div className="h-6 w-3/4 mx-auto skeleton rounded"></div>
        <div className="mt-3 flex justify-center">
          <div className="h-8 w-24 skeleton rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCardSkeleton;
