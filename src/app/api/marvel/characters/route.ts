import { NextRequest, NextResponse } from 'next/server';
import { getCharacters, getFeaturedCharacters, hasApiKeys } from '@/lib/api/marvel';
import { mockCharacters } from './mock-data';

/**
 * Helper function to return mock data with proper pagination and filtering
 */
function getMockCharactersResponse(query: string, limit: number, offset: number, featured: boolean) {
  // Handle featured characters request
  if (featured) {
    // For featured characters, return a subset of the most popular characters
    const featuredResults = mockCharacters.data.results.slice(0, 5);
    return NextResponse.json({
      ...mockCharacters,
      data: {
        ...mockCharacters.data,
        results: featuredResults,
        total: featuredResults.length,
        count: featuredResults.length
      }
    });
  }
  
  // Filter mock data if query is provided
  if (query) {
    const filteredResults = mockCharacters.data.results.filter(
      character => character.name.toLowerCase().includes(query.toLowerCase())
    );
    
    return NextResponse.json({
      ...mockCharacters,
      data: {
        ...mockCharacters.data,
        results: filteredResults.slice(offset, offset + limit),
        total: filteredResults.length,
        count: Math.min(limit, filteredResults.length),
        offset
      }
    });
  }
  
  // Return all characters with pagination
  const paginatedResults = mockCharacters.data.results.slice(offset, offset + limit);
  return NextResponse.json({
    ...mockCharacters,
    data: {
      ...mockCharacters.data,
      results: paginatedResults,
      total: mockCharacters.data.results.length,
      count: paginatedResults.length,
      offset
    }
  });
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const featured = searchParams.get('featured') === 'true';

    // Check if Marvel API keys are available using the utility function
    if (!hasApiKeys()) {
      console.log('Using mock data - Marvel API keys not found');
      return getMockCharactersResponse(query, limit, offset, featured);
    }
    
    // Use real API if keys are available
    try {
      let response;
      
      if (featured) {
        response = await getFeaturedCharacters();
      } else {
        response = await getCharacters({
          nameStartsWith: query || undefined,
          limit,
          offset,
        });
      }
      
      // Validate response structure
      if (!response || !response.data || !Array.isArray(response.data.results)) {
        console.error('Invalid API response structure:', response);
        return NextResponse.json(
          { error: 'Invalid API response structure' },
          { status: 500 }
        );
      }
      
      return NextResponse.json(response);
    } catch (error) {
      console.error('Marvel API error:', error);
      
      // Check if the error is due to missing API keys
      if (error instanceof Error && error.message === 'MARVEL_API_KEYS_MISSING') {
        console.log('API keys missing, falling back to mock data');
        return getMockCharactersResponse(query, limit, offset, featured);
      }
      
      return NextResponse.json(
        { error: 'Error communicating with Marvel API' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error fetching Marvel characters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch Marvel characters' },
      { status: 500 }
    );
  }
}
