"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { MarvelCharacter, MarvelComic, MarvelSeries } from '@/types/marvel';

interface CharacterDetailsData {
  character: {
    data: {
      results: MarvelCharacter[];
    };
  };
  comics?: {
    data: {
      results: MarvelComic[];
    };
  };
  series?: {
    data: {
      results: MarvelSeries[];
    };
  };
}

const CharacterDetailsPage = () => {
  const { id } = useParams();
  const [character, setCharacter] = useState<MarvelCharacter | null>(null);
  const [comics, setComics] = useState<MarvelComic[]>([]);
  const [series, setSeries] = useState<MarvelSeries[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacterData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/marvel/characters/${id}?comics=true&series=true`);
        
        const data = await response.json();
        
        // Check if we received an error response
        if (data.error) {
          console.error('API returned an error:', data.error);
          setError(data.error || 'Failed to load character details');
          return;
        }
        
        // Check for character data
        if (data.character && data.character.data && data.character.data.results && data.character.data.results.length > 0) {
          setCharacter(data.character.data.results[0]);
        } else {
          console.error('Character data not found or in unexpected format');
          setError('Character not found');
          return;
        }
        
        // Check for comics data
        if (data.comics && data.comics.data && Array.isArray(data.comics.data.results)) {
          setComics(data.comics.data.results);
        } else {
          console.warn('Comics data not found or in unexpected format');
          setComics([]);
        }
        
        // Check for series data
        if (data.series && data.series.data && Array.isArray(data.series.data.results)) {
          setSeries(data.series.data.results);
        } else {
          console.warn('Series data not found or in unexpected format');
          setSeries([]);
        }
      } catch (err) {
        console.error('Failed to fetch character details:', err);
        setError('Failed to load character details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchCharacterData();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="py-8">
        <div className="w-full h-64 skeleton rounded-lg mb-6"></div>
        <div className="w-3/4 h-10 skeleton rounded mb-4"></div>
        <div className="w-full h-20 skeleton rounded mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-32 skeleton rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="text-center py-10 comic-border bg-red-50 dark:bg-red-900/20 p-6">
        <p className="text-red-600 dark:text-red-400 font-bold">
          {error || 'Character not found'}
        </p>
        <Link href="/characters" className="comic-button mt-4 inline-block">
          Back to Characters
        </Link>
      </div>
    );
  }

  const { name, description, thumbnail } = character;
  const imageUrl = `${thumbnail.path}.${thumbnail.extension}`;
  const isImageNotAvailable = imageUrl.includes('image_not_available');

  return (
    <div className="py-8">
      <Link href="/characters" className="inline-flex items-center text-[var(--marvel-red)] hover:underline mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Characters
      </Link>

      <div className="comic-card p-0 overflow-hidden mb-8">
        <div className="relative h-64 md:h-96 w-full">
          <Image
            src={isImageNotAvailable ? '/placeholder-character.jpg' : imageUrl}
            alt={name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
            <div className="p-6">
              <h1 className="comic-title text-4xl md:text-5xl text-white">{name}</h1>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h2 className="comic-title text-2xl mb-4">Biography</h2>
            <p className="text-lg">
              {description || "No biography available for this character."}
            </p>
          </div>

          {/* Comics Section */}
          {comics.length > 0 && (
            <div className="mb-8">
              <h2 className="comic-title text-2xl mb-4">Featured Comics</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {comics.slice(0, 6).map((comic) => (
                  <div key={comic.id} className="comic-card h-full">
                    <div className="relative h-40 w-full">
                      <Image
                        src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                        alt={comic.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm">{comic.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Series Section */}
          {series.length > 0 && (
            <div>
              <h2 className="comic-title text-2xl mb-4">Featured Series</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {series.slice(0, 6).map((s) => (
                  <div key={s.id} className="comic-card h-full">
                    <div className="relative h-40 w-full">
                      <Image
                        src={`${s.thumbnail.path}.${s.thumbnail.extension}`}
                        alt={s.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-sm">{s.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CharacterDetailsPage;
