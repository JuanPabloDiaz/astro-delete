import React from 'react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

const LoadingSpinner = ({ size = 'medium' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    small: 'w-6 h-6',
    medium: 'w-10 h-10',
    large: 'w-16 h-16'
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="loading-dots">
          <div className="dot bg-[var(--marvel-red)]"></div>
          <div className="dot bg-[var(--marvel-blue)]"></div>
          <div className="dot bg-[var(--marvel-yellow)]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
