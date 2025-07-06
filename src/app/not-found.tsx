import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="comic-card max-w-2xl w-full p-6 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 bg-[var(--marvel-yellow)] text-black transform rotate-12 px-8 py-2 font-bold text-xl z-10">
          404
        </div>
        
        <h1 className="comic-title text-5xl mb-6 text-[var(--marvel-red)]">
          OOPS! PAGE NOT FOUND
        </h1>
        
        <div className="relative h-64 w-full mb-6">
          <Image
            src="/404-hulk.jpg"
            alt="Hulk smashing"
            fill
            className="object-contain"
          />
        </div>
        
        <p className="text-xl mb-8">
          Even the Hulk couldn&apos;t find the page you&apos;re looking for! It might have been moved, 
          deleted, or never existed in the first place.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link href="/" className="comic-button">
            Return Home
          </Link>
          <Link href="/characters" className="comic-button bg-gray-800 text-white">
            Browse Characters
          </Link>
        </div>
      </div>
    </div>
  );
}
