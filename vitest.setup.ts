import { vi } from 'vitest';

// Mock environment variables
process.env.MARVEL_PUBLIC_KEY = 'test-public-key';
process.env.MARVEL_PRIVATE_KEY = 'test-private-key';

// Mock Next.js useRouter
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
  }),
  useSearchParams: () => ({
    get: vi.fn((key) => {
      if (key === 'q') return 'test-query';
      return null;
    }),
  }),
  useParams: () => ({
    id: '1009610', // Spider-Man's ID for testing
  }),
}));

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: vi.fn(),
    resolvedTheme: 'light',
    themes: ['light', 'dark', 'system'],
  }),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));
