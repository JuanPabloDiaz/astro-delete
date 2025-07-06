"use client";

import React, { useState, useEffect } from 'react';
import CharacterCard from '@/components/CharacterCard';
import CharacterCardSkeleton from '@/components/CharacterCardSkeleton';
import { MarvelCharacter } from '@/types/marvel';

const CharactersPage = () => {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const fetchCharacters = async (newOffset: number) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/marvel/characters?limit=${limit}&offset=${newOffset}`);
      
      const data = await response.json();
      
      // Check if data has the expected structure
      if (!data || !data.data || !Array.isArray(data.data.results)) {
        console.error('Unexpected API response format:', data);
        setError('Received unexpected data format from the API');
        return;
      }
      
      setCharacters(data.data.results);
      setTotal(data.data.total);
      setOffset(newOffset);
    } catch (err) {
      console.error('Failed to fetch characters:', err);
      setError('Failed to load characters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharacters(0);
  }, []);

  const handlePrevPage = () => {
    const newOffset = Math.max(0, offset - limit);
    fetchCharacters(newOffset);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    const newOffset = offset + limit;
    if (newOffset < total) {
      fetchCharacters(newOffset);
      window.scrollTo(0, 0);
    }
  };

  if (error) {
    return (
      <div className="text-center py-10 comic-border bg-red-50 dark:bg-red-900/20 p-6">
        <p className="text-red-600 dark:text-red-400 font-bold">{error}</p>
        <button 
          onClick={() => fetchCharacters(0)} 
          className="comic-button mt-4 bg-red-600 hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="py-8">
      <h1 className="comic-title text-4xl mb-8">Marvel Characters</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mb-8">
        {loading
          ? Array.from({ length: limit }).map((_, index) => (
              <CharacterCardSkeleton key={index} />
            ))
          : characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={handlePrevPage}
          disabled={offset === 0}
          className={`comic-button ${
            offset === 0 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Previous Page
        </button>
        
        <span className="comic-title">
          Page {Math.floor(offset / limit) + 1} of {Math.ceil(total / limit)}
        </span>
        
        <button
          onClick={handleNextPage}
          disabled={offset + limit >= total}
          className={`comic-button ${
            offset + limit >= total ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default CharactersPage;
