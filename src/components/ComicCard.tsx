import React, { ReactNode } from 'react';

interface ComicCardProps {
  children: ReactNode;
  className?: string;
}

const ComicCard = ({ children, className = '' }: ComicCardProps) => {
  return (
    <div className={`comic-card ${className}`}>
      {children}
    </div>
  );
};

export default ComicCard;
