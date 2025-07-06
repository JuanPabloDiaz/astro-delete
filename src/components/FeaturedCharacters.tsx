"use client";

import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard';
import CharacterCardSkeleton from './CharacterCardSkeleton';
import { MarvelCharacter } from '@/types/marvel';

const FeaturedCharacters = () => {
  const [characters, setCharacters] = useState<MarvelCharacter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedCharacters = async () => {
      try {
        setLoading(true);
        setError(null); // Clear any previous errors
        
        // Add a timeout to the fetch to prevent hanging forever
        const fetchWithTimeout = async () => {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
          
          try {
            const response = await fetch('/api/marvel/characters?featured=true', {
              signal: controller.signal
            });
            clearTimeout(timeoutId);
            return response;
          } catch (error) {
            clearTimeout(timeoutId);
            throw error;
          }
        };
        
        const response = await fetchWithTimeout();
        const data = await response.json();
        
        // Check if data has the expected structure
        if (!data || !data.data || !Array.isArray(data.data.results)) {
          console.error('Unexpected API response format:', data);
          // Check if there's an error message in the response
          if (data && data.error) {
            setError(`API Error: ${data.error}`);
          } else {
            setError('Received unexpected data format from the API');
          }
          return;
        }
        
        setCharacters(data.data.results);
      } catch (err) {
        console.error('Failed to fetch featured characters:', err);
        // More descriptive error messages based on error type
        if (err instanceof DOMException && err.name === 'AbortError') {
          setError('Request timed out. The server took too long to respond.');
        } else {
          setError('Failed to load featured characters. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedCharacters();
  }, []);

  if (error) {
    return (
      <div className="text-center py-10 comic-border bg-red-50 dark:bg-red-900/20 p-6">
        <p className="text-red-600 dark:text-red-400 font-bold">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="comic-button mt-4 bg-red-600 hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {loading
        ? Array.from({ length: 10 }).map((_, index) => (
            <CharacterCardSkeleton key={index} />
          ))
        : characters.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
    </div>
  );
};

export default FeaturedCharacters;
