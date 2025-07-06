import { NextRequest, NextResponse } from 'next/server';
import { getCharacters, getFeaturedCharacters } from '@/lib/api/marvel';
import { mockCharacters } from './mock-data';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query') || '';
    const limit = parseInt(searchParams.get('limit') || '20', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);
    const featured = searchParams.get('featured') === 'true';

    // Check if Marvel API keys are available
    const hasApiKeys = process.env.MARVEL_PUBLIC_KEY && process.env.MARVEL_PRIVATE_KEY;
    
    // Use mock data if API keys are not available
    if (!hasApiKeys) {
      console.log('Using mock data - Marvel API keys not found');
      
      // Filter mock data if query is provided
      if (query && !featured) {
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
      
      return NextResponse.json(mockCharacters);
    }
    
    // Use real API if keys are available
    let response;
    
    if (featured) {
      response = await getFeaturedCharacters();
    } else {
      response = await getCharacters({
        query,
        limit,
        offset,
      });
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching characters:', error);
    return NextResponse.json(
      { error: 'Failed to fetch characters' },
      { status: 500 }
    );
  }
}
