"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MarvelCharacter } from '@/types/marvel';

interface CharacterCardProps {
  character: MarvelCharacter;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ character }) => {
  const { id, name, thumbnail } = character;
  const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;
  const isImageNotAvailable = imageUrl.includes('image_not_available');
  
  return (
    <Link href={`/characters/${id}`}>
      <div className="comic-card h-full flex flex-col overflow-hidden hover:cursor-pointer">
        <div className="relative h-48 md:h-64 w-full overflow-hidden">
          <Image
            src={isImageNotAvailable ? '/placeholder-character.jpg' : imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4 flex-grow flex flex-col justify-between">
          <h3 className="comic-title text-xl text-center">{name}</h3>
          <div className="mt-3 flex justify-center">
            <span className="comic-button text-sm py-1 px-3">View Profile</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CharacterCard;
