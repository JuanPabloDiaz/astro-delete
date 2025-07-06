# Marvel Universe Explorer

![Marvel Universe Explorer](public/og-image.jpg)

A modern, responsive web application that leverages the official Marvel API to explore characters, comics, and series from the Marvel Universe. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🦸‍♂️ Browse featured Marvel characters
- 🔍 Search for characters by name
- 📚 View character details including comics and series appearances
- 🌓 Dark mode support
- 📱 Fully responsive design
- 🎨 Comic book-inspired UI with vibrant colors and animations
- ⚡ Fast performance with Next.js
- 🔒 Secure API handling with server-side authentication

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Testing**: [Vitest](https://vitest.dev/)
- **API**: [Marvel Developer API](https://developer.marvel.com/)

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn
- Marvel API keys (get them from [Marvel Developer Portal](https://developer.marvel.com/))

### Installation

1. Clone the repository:

```bash
git clone https://github.com/JuanPabloDiaz/marvel.git
cd marvel
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Create a `.env.local` file in the root directory with your Marvel API keys:

```
MARVEL_PUBLIC_KEY=your_public_key
MARVEL_PRIVATE_KEY=your_private_key
```

> **Note:** The application includes mock data and will work without API keys, but with limited functionality. For the full experience with real Marvel data, please obtain API keys from the [Marvel Developer Portal](https://developer.marvel.com/).

4. Start the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Deployment

This application can be easily deployed to:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

Make sure to set up the environment variables for your Marvel API keys in your deployment platform.

## API Authentication

The Marvel API requires authentication using a timestamp, public key, and an MD5 hash of the timestamp, private key, and public key. This project handles authentication securely through server-side API routes, ensuring that your private key is never exposed to the client.

## Project Structure

```
/
├── public/              # Static assets
├── src/
│   ├── app/            # Next.js App Router pages
│   ├── components/      # Reusable UI components
│   ├── lib/            # Utility functions and API clients
│   └── types/          # TypeScript type definitions
├── .env.example        # Example environment variables
└── README.md           # Project documentation
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Data provided by Marvel. © 2025 MARVEL
- This project is for educational purposes only

---

Created by [Juan Pablo Diaz](https://github.com/JuanPabloDiaz)