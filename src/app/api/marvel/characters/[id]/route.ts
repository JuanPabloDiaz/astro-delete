import { NextRequest, NextResponse } from 'next/server';
import { getCharacterById, getCharacterComics, getCharacterSeries } from '@/lib/api/marvel';
import { getCharacterMockData, getCharacterComicsMockData, getCharacterSeriesMockData } from './mock-data';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const searchParams = request.nextUrl.searchParams;
    const includeComics = searchParams.get('comics') === 'true';
    const includeSeries = searchParams.get('series') === 'true';

    // Check if Marvel API keys are available
    const hasApiKeys = process.env.MARVEL_PUBLIC_KEY && process.env.MARVEL_PRIVATE_KEY;
    
    if (!hasApiKeys) {
      console.log('Using mock data - Marvel API keys not found');
      
      const characterData = getCharacterMockData(id);
      
      if (!characterData) {
        return NextResponse.json(
          { error: 'Character not found' },
          { status: 404 }
        );
      }
      
      const response: any = {
        character: characterData
      };

      if (includeComics) {
        response.comics = getCharacterComicsMockData(id);
      }

      if (includeSeries) {
        response.series = getCharacterSeriesMockData(id);
      }

      return NextResponse.json(response);
    }

    // Use real API if keys are available
    const characterPromise = getCharacterById(id);
    const comicsPromise = includeComics ? getCharacterComics(id) : null;
    const seriesPromise = includeSeries ? getCharacterSeries(id) : null;

    const [character, comics, series] = await Promise.all([
      characterPromise,
      comicsPromise,
      seriesPromise
    ]);

    const response: any = {
      character
    };

    if (comics) {
      response.comics = comics;
    }

    if (series) {
      response.series = series;
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching character details:', error);
    return NextResponse.json(
      { error: 'Failed to fetch character details' },
      { status: 500 }
    );
  }
}
