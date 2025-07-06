import md5 from 'md5';
import axios from 'axios';
import { MarvelApiParams, MarvelResponse, MarvelCharacter, MarvelComic, MarvelSeries } from '@/types/marvel';

const BASE_URL = 'https://gateway.marvel.com/v1/public';

/**
 * Generates authentication parameters required for Marvel API calls
 */
const getAuthParams = () => {
  const timestamp = Date.now().toString();
  const publicKey = process.env.MARVEL_PUBLIC_KEY || '';
  const privateKey = process.env.MARVEL_PRIVATE_KEY || '';
  
  if (!publicKey || !privateKey) {
    throw new Error('Marvel API keys are not configured. Please check your environment variables.');
  }
  
  const hash = md5(timestamp + privateKey + publicKey);
  
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
  try {
    const authParams = getAuthParams();
    const url = `${BASE_URL}${endpoint}`;
    
    const response = await axios.get<MarvelResponse<T>>(url, {
      params: {
        ...authParams,
        ...params,
      },
    });
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Marvel API Error: ${error.response.status} - ${error.response.data.message || error.message}`);
    }
    throw new Error('Failed to fetch data from Marvel API');
  }
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
