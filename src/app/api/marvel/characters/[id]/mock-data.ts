// Mock data for character details
export const getCharacterMockData = (id: string) => {
  const characterId = parseInt(id, 10);
  
  // Find the character in our mock data
  const character = mockCharacters.find(char => char.id === characterId);
  
  if (!character) {
    return null;
  }
  
  return {
    "code": 200,
    "status": "Ok",
    "copyright": "© 2025 MARVEL",
    "attributionText": "Data provided by Marvel. © 2025 MARVEL",
    "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2025 MARVEL</a>",
    "etag": "mock-etag",
    "data": {
      "offset": 0,
      "limit": 1,
      "total": 1,
      "count": 1,
      "results": [character]
    }
  };
};

export const getCharacterComicsMockData = (id: string) => {
  return {
    "code": 200,
    "status": "Ok",
    "copyright": "© 2025 MARVEL",
    "attributionText": "Data provided by Marvel. © 2025 MARVEL",
    "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2025 MARVEL</a>",
    "etag": "mock-etag",
    "data": {
      "offset": 0,
      "limit": 10,
      "total": 10,
      "count": 10,
      "results": generateMockComics(id, 10)
    }
  };
};

export const getCharacterSeriesMockData = (id: string) => {
  return {
    "code": 200,
    "status": "Ok",
    "copyright": "© 2025 MARVEL",
    "attributionText": "Data provided by Marvel. © 2025 MARVEL",
    "attributionHTML": "<a href=\"http://marvel.com\">Data provided by Marvel. © 2025 MARVEL</a>",
    "etag": "mock-etag",
    "data": {
      "offset": 0,
      "limit": 10,
      "total": 10,
      "count": 10,
      "results": generateMockSeries(id, 10)
    }
  };
};

// Helper function to generate mock comics
function generateMockComics(characterId: string, count: number) {
  const id = parseInt(characterId, 10);
  const character = mockCharacters.find(char => char.id === id);
  const characterName = character ? character.name : 'Marvel Character';
  
  return Array.from({ length: count }).map((_, index) => ({
    id: 1000 + index,
    digitalId: 0,
    title: `The Amazing ${characterName} #${index + 1}`,
    issueNumber: index + 1,
    variantDescription: "",
    description: `An amazing adventure featuring ${characterName}!`,
    modified: "2020-07-21T10:30:10-0400",
    isbn: "",
    upc: "",
    diamondCode: "",
    ean: "",
    issn: "",
    format: "Comic",
    pageCount: 32,
    textObjects: [],
    resourceURI: `http://gateway.marvel.com/v1/public/comics/${1000 + index}`,
    urls: [],
    series: {
      resourceURI: `http://gateway.marvel.com/v1/public/series/2000`,
      name: `${characterName} (2023 - Present)`
    },
    variants: [],
    collections: [],
    collectedIssues: [],
    dates: [],
    prices: [],
    thumbnail: {
      path: "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg"
    },
    images: [],
    creators: {
      available: 0,
      collectionURI: "",
      items: [],
      returned: 0
    },
    characters: {
      available: 1,
      collectionURI: "",
      items: [
        {
          resourceURI: `http://gateway.marvel.com/v1/public/characters/${id}`,
          name: characterName
        }
      ],
      returned: 1
    },
    stories: {
      available: 0,
      collectionURI: "",
      items: [],
      returned: 0
    },
    events: {
      available: 0,
      collectionURI: "",
      items: [],
      returned: 0
    }
  }));
}

// Helper function to generate mock series
function generateMockSeries(characterId: string, count: number) {
  const id = parseInt(characterId, 10);
  const character = mockCharacters.find(char => char.id === id);
  const characterName = character ? character.name : 'Marvel Character';
  
  return Array.from({ length: count }).map((_, index) => ({
    id: 2000 + index,
    title: `${characterName} ${['Adventures', 'Chronicles', 'Saga', 'Legacy', 'Origins'][index % 5]}`,
    description: `A series featuring the incredible adventures of ${characterName}.`,
    resourceURI: `http://gateway.marvel.com/v1/public/series/${2000 + index}`,
    urls: [],
    startYear: 2020 + (index % 5),
    endYear: 2029,
    rating: "Rated T",
    type: "ongoing",
    modified: "2020-07-21T10:30:10-0400",
    thumbnail: {
      path: "https://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available",
      extension: "jpg"
    },
    creators: {
      available: 0,
      collectionURI: "",
      items: [],
      returned: 0
    },
    characters: {
      available: 1,
      collectionURI: "",
      items: [
        {
          resourceURI: `http://gateway.marvel.com/v1/public/characters/${id}`,
          name: characterName
        }
      ],
      returned: 1
    },
    stories: {
      available: 0,
      collectionURI: "",
      items: [],
      returned: 0
    },
    comics: {
      available: 0,
      collectionURI: "",
      items: [],
      returned: 0
    },
    events: {
      available: 0,
      collectionURI: "",
      items: [],
      returned: 0
    },
    next: null,
    previous: null
  }));
}

// Mock character data
const mockCharacters = [
  {
    "id": 1009610,
    "name": "Spider-Man",
    "description": "Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider. After witnessing the death of his uncle Ben, Peter learned that with great power, comes great responsibility.",
    "modified": "2020-07-21T10:30:10-0400",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009610",
    "urls": []
  },
  {
    "id": 1009220,
    "name": "Captain America",
    "description": "Recipient of the Super-Soldier serum, World War II hero Steve Rogers fights for American ideals as one of the world's mightiest heroes and the leader of the Avengers.",
    "modified": "2020-04-04T19:01:59-0400",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/3/50/537ba56d31087",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009220",
    "urls": []
  },
  {
    "id": 1009368,
    "name": "Iron Man",
    "description": "Wounded, captured and forced to build a weapon by his enemies, billionaire industrialist Tony Stark instead created an advanced suit of armor to save his life and escape captivity. Now with a new outlook on life, Tony uses his money and intelligence to make the world a safer, better place as Iron Man.",
    "modified": "2016-09-28T12:08:19-0400",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009368",
    "urls": []
  },
  {
    "id": 1009664,
    "name": "Thor",
    "description": "As the Norse God of thunder and lightning, Thor wields one of the greatest weapons ever made, the enchanted hammer Mjolnir. While others have described Thor as an over-muscled, oafish imbecile, he's quite smart and compassionate.",
    "modified": "2020-03-11T10:18:57-0400",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009664",
    "urls": []
  },
  {
    "id": 1009351,
    "name": "Hulk",
    "description": "Caught in a gamma bomb explosion while trying to save the life of a teenager, Dr. Bruce Banner was transformed into the incredibly powerful creature called the Hulk. An all too often misunderstood hero, the angrier the Hulk gets, the stronger the Hulk gets.",
    "modified": "2020-07-21T10:35:15-0400",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009351",
    "urls": []
  },
  {
    "id": 1009189,
    "name": "Black Widow",
    "description": "Natasha Romanoff, also known as Black Widow, is a world-renowned super spy and one of S.H.I.E.L.D.'s top agents. Her hand-to-hand combat skills, intelligence, and unpredictability make her a deadly secret weapon.",
    "modified": "2019-10-01T13:43:31-0400",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/f/30/50fecad1f395b",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009189",
    "urls": []
  },
  {
    "id": 1009338,
    "name": "Hawkeye",
    "description": "Clint Barton is an expert marksman and fighter who uses a custom-made bow and specialized arrows as his primary weapon.",
    "modified": "2016-06-22T11:43:33-0400",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/e/90/50fecaf4f101b",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009338",
    "urls": []
  },
  {
    "id": 1009282,
    "name": "Doctor Strange",
    "description": "As Earth's Sorcerer Supreme, Doctor Strange wields arcane spells and mystical artifacts to defend the planet against malevolent threats.",
    "modified": "2020-07-21T10:33:36-0400",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/5/f0/5261a85a501fe",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009282",
    "urls": []
  },
  {
    "id": 1009187,
    "name": "Black Panther",
    "description": "T'Challa is the king of the secretive and highly advanced African nation of Wakanda - as well as the powerful warrior known as the Black Panther.",
    "modified": "2018-06-19T16:39:46-0400",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/6/60/5261a80a67e7d",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1009187",
    "urls": []
  },
  {
    "id": 1010338,
    "name": "Captain Marvel (Carol Danvers)",
    "description": "Carol Danvers became one of the universe's most powerful heroes when Earth was caught in the middle of a galactic war between two alien races.",
    "modified": "2019-02-06T19:21:00-0500",
    "thumbnail": {
      "path": "https://i.annihil.us/u/prod/marvel/i/mg/6/80/5269608c1be7a",
      "extension": "jpg"
    },
    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1010338",
    "urls": []
  }
];
