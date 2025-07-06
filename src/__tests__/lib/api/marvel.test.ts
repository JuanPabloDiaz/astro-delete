import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { 
  getAuthParams, 
  fetchCharacters, 
  fetchFeaturedCharacters,
  fetchCharacterById,
  fetchCharacterComics,
  fetchCharacterSeries
} from '@/lib/api/marvel';

// Mock axios
vi.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Marvel API Utils', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    // Mock environment variables
    process.env.MARVEL_PUBLIC_KEY = 'test-public-key';
    process.env.MARVEL_PRIVATE_KEY = 'test-private-key';
  });

  describe('getAuthParams', () => {
    it('should generate auth parameters with timestamp, apikey, and hash', () => {
      const params = getAuthParams();
      
      expect(params).toHaveProperty('ts');
      expect(params).toHaveProperty('apikey', 'test-public-key');
      expect(params).toHaveProperty('hash');
      expect(typeof params.hash).toBe('string');
      expect(params.hash.length).toBe(32); // MD5 hash is 32 characters
    });
  });

  describe('fetchCharacters', () => {
    it('should fetch characters with correct parameters', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [{ id: 1, name: 'Spider-Man' }]
          }
        }
      };
      
      mockedAxios.get.mockResolvedValueOnce(mockResponse);
      
      const result = await fetchCharacters({ limit: 10, offset: 0 });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://gateway.marvel.com/v1/public/characters',
        expect.objectContaining({
          params: expect.objectContaining({
            limit: 10,
            offset: 0
          })
        })
      );
      
      expect(result).toEqual(mockResponse.data);
    });
    
    it('should include nameStartsWith parameter when query is provided', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [{ id: 1, name: 'Spider-Man' }]
          }
        }
      };
      
      mockedAxios.get.mockResolvedValueOnce(mockResponse);
      
      await fetchCharacters({ query: 'spider', limit: 10, offset: 0 });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://gateway.marvel.com/v1/public/characters',
        expect.objectContaining({
          params: expect.objectContaining({
            nameStartsWith: 'spider'
          })
        })
      );
    });
  });

  describe('fetchFeaturedCharacters', () => {
    it('should fetch featured characters with predefined IDs', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [
              { id: 1009610, name: 'Spider-Man' },
              { id: 1009220, name: 'Captain America' }
            ]
          }
        }
      };
      
      mockedAxios.get.mockResolvedValueOnce(mockResponse);
      
      const result = await fetchFeaturedCharacters();
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://gateway.marvel.com/v1/public/characters',
        expect.objectContaining({
          params: expect.objectContaining({
            limit: expect.any(Number),
            // We don't check the exact IDs here as they might change
            // but we ensure the id parameter is included
            id: expect.any(String)
          })
        })
      );
      
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('fetchCharacterById', () => {
    it('should fetch a character by ID', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [{ id: 1009610, name: 'Spider-Man' }]
          }
        }
      };
      
      mockedAxios.get.mockResolvedValueOnce(mockResponse);
      
      const result = await fetchCharacterById(1009610);
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://gateway.marvel.com/v1/public/characters/1009610',
        expect.anything()
      );
      
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('fetchCharacterComics', () => {
    it('should fetch comics for a character', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [{ id: 1234, title: 'Amazing Spider-Man' }]
          }
        }
      };
      
      mockedAxios.get.mockResolvedValueOnce(mockResponse);
      
      const result = await fetchCharacterComics(1009610, { limit: 5 });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://gateway.marvel.com/v1/public/characters/1009610/comics',
        expect.objectContaining({
          params: expect.objectContaining({
            limit: 5
          })
        })
      );
      
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('fetchCharacterSeries', () => {
    it('should fetch series for a character', async () => {
      const mockResponse = {
        data: {
          data: {
            results: [{ id: 5678, title: 'The Amazing Spider-Man' }]
          }
        }
      };
      
      mockedAxios.get.mockResolvedValueOnce(mockResponse);
      
      const result = await fetchCharacterSeries(1009610, { limit: 5 });
      
      expect(mockedAxios.get).toHaveBeenCalledWith(
        'https://gateway.marvel.com/v1/public/characters/1009610/series',
        expect.objectContaining({
          params: expect.objectContaining({
            limit: 5
          })
        })
      );
      
      expect(result).toEqual(mockResponse.data);
    });
  });
});
