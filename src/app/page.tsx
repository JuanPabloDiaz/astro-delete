import Image from "next/image";
import Link from "next/link";
import FeaturedCharacters from "@/components/FeaturedCharacters";

export default function Home() {
  return (
    <div className="flex flex-col gap-8 py-4">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--marvel-red)] via-[#333] to-[#111] z-0"></div>
        {/* Marvel logo overlay */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
          <div className="w-3/4 h-3/4 relative">
            <Image
              src="/marvel-logo.svg"
              alt="Marvel Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="absolute inset-0 bg-black/30 z-5"></div>
        <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 max-w-4xl">
          <h1 className="comic-title text-4xl md:text-6xl text-white mb-4">
            Explore the Marvel Universe
          </h1>
          <p className="text-white text-lg md:text-xl mb-6 max-w-2xl">
            Discover your favorite Marvel characters, comics, and stories in this
            interactive comic-styled experience.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/characters" className="comic-button">
              Browse Characters
            </Link>
            <Link href="/search" className="comic-button bg-white text-[var(--marvel-red)]">
              Search Heroes
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Characters Section */}
      <section className="py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="comic-title text-3xl">Featured Heroes</h2>
          <Link
            href="/characters"
            className="text-[var(--marvel-red)] hover:underline font-bold"
          >
            View All →
          </Link>
        </div>
        <FeaturedCharacters />
      </section>

      {/* About Section */}
      <section className="py-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="comic-title text-3xl mb-4 text-center">About This Project</h2>
          <p className="mb-4 text-center">
            This Marvel Universe Explorer is built using Next.js, TypeScript, and
            Tailwind CSS, showcasing characters and stories from the Marvel
            universe through the official Marvel API.
          </p>
          <div className="flex justify-center mt-6">
            <Link href="/about" className="comic-button">
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
