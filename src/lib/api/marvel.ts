import md5 from 'md5';
import axios from 'axios';
import { MarvelApiParams, MarvelResponse, MarvelCharacter, MarvelComic, MarvelSeries } from '@/types/marvel';

const BASE_URL = 'https://gateway.marvel.com/v1/public';

/**
 * Checks if Marvel API keys are configured
 */
export const hasApiKeys = (): boolean => {
  return !!(process.env.MARVEL_PUBLIC_KEY && process.env.MARVEL_PRIVATE_KEY);
};

/**
 * Generates authentication parameters required for Marvel API calls
 */
const getAuthParams = () => {
  // For production, use a timestamp that changes with each request
  const timestamp = Date.now().toString();
  
  const publicKey = process.env.MARVEL_PUBLIC_KEY || '';
  const privateKey = process.env.MARVEL_PRIVATE_KEY || '';
  
  if (!publicKey || !privateKey) {
    throw new Error('Marvel API keys are not configured. Please check your environment variables.');
  }
  
  // Create hash according to Marvel API requirements
  // Marvel requires: md5(ts+privateKey+publicKey)
  const stringToHash = `${timestamp}${privateKey}${publicKey}`;
  const hash = md5(stringToHash);
  
  // Debug log - minimal logging for security
  console.log('Marvel API Auth: Using timestamp', timestamp);
  
  return {
    ts: timestamp,
    apikey: publicKey,
    hash,
  };
};

/**
 * Makes a secure request to the Marvel API
 */
const marvelFetch = async <T>(endpoint: string, params: MarvelApiParams = {}): Promise<MarvelResponse<T>> => {
  // Check if API keys are configured
  if (!hasApiKeys()) {
    throw new Error('MARVEL_API_KEYS_MISSING');
  }
  
  // Maximum number of retries for 504 errors
  const maxRetries = 2;
  let retries = 0;
  
  while (retries <= maxRetries) {
    try {
      const authParams = getAuthParams();
      const url = `${BASE_URL}${endpoint}`;
      
      // Add timeout to avoid hanging requests
      const response = await axios.get<MarvelResponse<T>>(url, {
        params: {
          ...authParams,
          ...params,
        },
        // Set a reasonable timeout (10 seconds)
        timeout: 10000,
      });
      
      return response.data;
    } catch (error) {
      const isAxiosError = axios.isAxiosError(error);
      const responseStatus = isAxiosError && error.response ? error.response.status : null;
      
      // Handle 504 Gateway Timeout errors with retries
      if (isAxiosError && responseStatus === 504 && retries < maxRetries) {
        console.warn(`Marvel API timeout (504), retrying... (${retries + 1}/${maxRetries})`);
        retries++;
        // Wait before retrying (exponential backoff)
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, retries)));
        continue;
      }
      
      // Handle other errors
      if (isAxiosError && error.response) {
        console.error(`Marvel API error: ${responseStatus} - ${error.response.data.message || error.message}`);
        throw new Error(`Marvel API Error: ${responseStatus} - ${error.response.data.message || error.message}`);
      } else if (isAxiosError && error.code === 'ECONNABORTED') {
        console.error('Marvel API request timed out');
        throw new Error('Marvel API request timed out. Please try again later.');
      }
      
      console.error('Marvel API request failed:', error instanceof Error ? error.message : 'Unknown error');
      throw new Error('Failed to fetch data from Marvel API');
    }
  }
  
  // This should never be reached due to the throw in the catch block
  throw new Error('Maximum retries exceeded for Marvel API request');
};

/**
 * Fetches a list of Marvel characters
 */
export const getCharacters = async (params: MarvelApiParams = {}): Promise<MarvelResponse<MarvelCharacter>> => {
  return marvelFetch<MarvelCharacter>('/characters', params);
};

/**
 * Fetches a specific Marvel character by ID
 */
export const getCharacterById = async (id: string): Promise<MarvelResponse<MarvelCharacter>> => {
  return marvelFetch<MarvelCharacter>(`/characters/${id}`);
};

/**
 * Fetches comics for a specific character
 */
export const getCharacterComics = async (characterId: string, params: MarvelApiParams = {}): Promise<MarvelResponse<MarvelComic>> => {
  return marvelFetch<MarvelComic>(`/characters/${characterId}/comics`, params);
};

/**
 * Fetches series for a specific character
 */
export const getCharacterSeries = async (characterId: string, params: MarvelApiParams = {}): Promise<MarvelResponse<MarvelSeries>> => {
  return marvelFetch<MarvelSeries>(`/characters/${characterId}/series`, params);
};

/**
 * Searches for characters by name
 */
export const searchCharacters = async (query: string, params: MarvelApiParams = {}): Promise<MarvelResponse<MarvelCharacter>> => {
  return getCharacters({
    nameStartsWith: query,
    ...params,
  });
};

/**
 * Fetches featured characters (hardcoded list of popular characters)
 */
export const getFeaturedCharacters = async (): Promise<MarvelResponse<MarvelCharacter>> => {
  // IDs of popular Marvel characters
  const featuredIds = [
    1009610, // Spider-Man
    1009220, // Captain America
    1009368, // Iron Man
    1009664, // Thor
    1009189, // Black Widow
    1009351, // Hulk
    1009417, // Loki
    1009282, // Doctor Strange
    1009697, // Thanos
    1009187, // Black Panther
  ].join(',');
  
  return getCharacters({ id: featuredIds, limit: 10 });
};
