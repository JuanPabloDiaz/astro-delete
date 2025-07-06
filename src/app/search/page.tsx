"use client";

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CharacterCard from '@/components/CharacterCard';
import CharacterCardSkeleton from '@/components/CharacterCardSkeleton';
import { MarvelCharacter } from '@/types/marvel';

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState(0);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const searchCharacters = async (query: string, newOffset: number) => {
    if (!query.trim()) {
      setCharacters([]);
      setTotal(0);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(
        `/api/marvel/characters?query=${encodeURIComponent(query)}&limit=${limit}&offset=${newOffset}`
      );
      
      const data = await response.json();
      
      // Check if data has the expected structure
      if (!data || !data.data) {
        console.error('Unexpected API response format:', data);
        setError('Received unexpected data format from the API');
        return;
      }
      
      // Set characters to empty array if results is not an array
      if (!Array.isArray(data.data.results)) {
        console.warn('Results is not an array:', data.data);
        setCharacters([]);
        setTotal(0);
      } else {
        setCharacters(data.data.results);
        setTotal(data.data.total || 0);
      }
      
      setOffset(newOffset);
    } catch (err) {
      console.error('Failed to search characters:', err);
      setError('Failed to search characters. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      searchCharacters(query, 0);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/search?q=${encodeURIComponent(query)}`);
    searchCharacters(query, 0);
  };

  const handlePrevPage = () => {
    const newOffset = Math.max(0, offset - limit);
    searchCharacters(query, newOffset);
    window.scrollTo(0, 0);
  };

  const handleNextPage = () => {
    const newOffset = offset + limit;
    if (newOffset < total) {
      searchCharacters(query, newOffset);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="py-8">
      <h1 className="comic-title text-4xl mb-8">Search Marvel Characters</h1>
      
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for a character..."
            className="flex-grow p-3 border-3 border-black dark:border-gray-700 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[var(--marvel-red)]"
          />
          <button type="submit" className="comic-button">
            Search
          </button>
        </div>
      </form>
      
      {error && (
        <div className="text-center py-10 comic-border bg-red-50 dark:bg-red-900/20 p-6 mb-8">
          <p className="text-red-600 dark:text-red-400 font-bold">{error}</p>
        </div>
      )}
      
      {query && !loading && characters.length === 0 && !error && (
        <div className="text-center py-10 comic-border bg-yellow-50 dark:bg-yellow-900/20 p-6 mb-8">
          <p className="text-yellow-600 dark:text-yellow-400 font-bold">
            No characters found matching "{query}". Try a different search term.
          </p>
        </div>
      )}
      
      {(loading || characters.length > 0) && (
        <>
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
          {characters.length > 0 && (
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
          )}
        </>
      )}
    </div>
  );
};

export default SearchPage;
