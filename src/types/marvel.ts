// Marvel API Response Types

export interface MarvelResponse<T> {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {
    offset: number;
    limit: number;
    total: number;
    count: number;
    results: T[];
  };
}

export interface MarvelCharacter {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: MarvelImage;
  resourceURI: string;
  comics: MarvelList;
  series: MarvelList;
  stories: MarvelList;
  events: MarvelList;
  urls: MarvelUrl[];
}

export interface MarvelComic {
  id: number;
  digitalId: number;
  title: string;
  issueNumber: number;
  variantDescription: string;
  description: string;
  modified: string;
  isbn: string;
  upc: string;
  diamondCode: string;
  ean: string;
  issn: string;
  format: string;
  pageCount: number;
  textObjects: MarvelTextObject[];
  resourceURI: string;
  urls: MarvelUrl[];
  series: MarvelSummary;
  variants: MarvelSummary[];
  collections: MarvelSummary[];
  collectedIssues: MarvelSummary[];
  dates: MarvelDate[];
  prices: MarvelPrice[];
  thumbnail: MarvelImage;
  images: MarvelImage[];
  creators: MarvelList;
  characters: MarvelList;
  stories: MarvelList;
  events: MarvelList;
}

export interface MarvelSeries {
  id: number;
  title: string;
  description: string;
  resourceURI: string;
  urls: MarvelUrl[];
  startYear: number;
  endYear: number;
  rating: string;
  type: string;
  modified: string;
  thumbnail: MarvelImage;
  creators: MarvelList;
  characters: MarvelList;
  stories: MarvelList;
  comics: MarvelList;
  events: MarvelList;
  next: MarvelSummary | null;
  previous: MarvelSummary | null;
}

export interface MarvelImage {
  path: string;
  extension: string;
}

export interface MarvelList {
  available: number;
  returned: number;
  collectionURI: string;
  items: MarvelSummary[];
}

export interface MarvelSummary {
  resourceURI: string;
  name: string;
  type?: string;
  role?: string;
}

export interface MarvelUrl {
  type: string;
  url: string;
}

export interface MarvelTextObject {
  type: string;
  language: string;
  text: string;
}

export interface MarvelDate {
  type: string;
  date: string;
}

export interface MarvelPrice {
  type: string;
  price: number;
}

// API Request Parameters
export interface MarvelApiParams {
  nameStartsWith?: string;
  name?: string;
  comics?: string;
  series?: string;
  events?: string;
  stories?: string;
  orderBy?: string;
  limit?: number;
  offset?: number;
  [key: string]: string | number | undefined;
}
