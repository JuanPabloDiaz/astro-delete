import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import CharacterCard from '@/components/CharacterCard';
import '@testing-library/jest-dom';

// Mock Next.js components
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />
}));

vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  )
}));

describe('CharacterCard', () => {
  const mockCharacter = {
    id: 1009610,
    name: 'Spider-Man',
    description: 'Bitten by a radioactive spider, high school student Peter Parker gained the speed, strength and powers of a spider.',
    thumbnail: {
      path: 'http://i.annihil.us/u/prod/marvel/i/mg/3/50/526548a343e4b',
      extension: 'jpg'
    },
    resourceURI: 'http://gateway.marvel.com/v1/public/characters/1009610',
    urls: []
  };

  it('renders character name and image', () => {
    render(<CharacterCard character={mockCharacter} />);
    
    // Check if character name is rendered
    expect(screen.getByText('Spider-Man')).toBeInTheDocument();
    
    // Check if image has correct src
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', `${mockCharacter.thumbnail.path}.${mockCharacter.thumbnail.extension}`);
    expect(image).toHaveAttribute('alt', mockCharacter.name);
  });

  it('links to the character detail page', () => {
    render(<CharacterCard character={mockCharacter} />);
    
    // Check if link points to the correct character page
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/characters/${mockCharacter.id}`);
  });

  it('handles image not available scenario', () => {
    const characterWithNoImage = {
      ...mockCharacter,
      thumbnail: {
        path: 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available',
        extension: 'jpg'
      }
    };
    
    render(<CharacterCard character={characterWithNoImage} />);
    
    // Check if placeholder image is used
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/placeholder-character.jpg');
  });
});
