import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="py-8 max-w-4xl mx-auto">
      <h1 className="comic-title text-4xl mb-8">About Marvel Universe Explorer</h1>
      
      <div className="comic-card p-6 mb-8">
        <h2 className="comic-title text-2xl mb-4">Project Overview</h2>
        <p className="mb-4">
          Marvel Universe Explorer is a web application that leverages the official Marvel API to provide an interactive, comic-styled experience for exploring Marvel characters, comics, and series.
        </p>
        <p className="mb-4">
          This project was built with modern web technologies including Next.js, TypeScript, and Tailwind CSS, focusing on performance, accessibility, and responsive design.
        </p>
        <div className="relative h-48 md:h-64 w-full my-6 rounded-lg overflow-hidden">
          <Image
            src="/about-marvel.jpg"
            alt="Marvel Comics"
            fill
            className="object-cover"
          />
        </div>
      </div>
      
      <div className="comic-card p-6 mb-8">
        <h2 className="comic-title text-2xl mb-4">Features</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Browse and search for Marvel characters</li>
          <li>View detailed information about each character</li>
          <li>Explore comics and series featuring your favorite characters</li>
          <li>Responsive design that works on all devices</li>
          <li>Dark mode support for comfortable viewing</li>
          <li>Comic book-inspired UI with vibrant colors and animations</li>
        </ul>
      </div>
      
      <div className="comic-card p-6 mb-8">
        <h2 className="comic-title text-2xl mb-4">Technical Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-bold text-xl mb-2">Frontend</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Next.js (React framework)</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Next.js App Router</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-xl mb-2">API & Backend</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>Marvel Developer API</li>
              <li>Next.js API Routes</li>
              <li>Secure authentication handling</li>
              <li>Server-side data fetching</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="comic-card p-6">
        <h2 className="comic-title text-2xl mb-4">Attribution</h2>
        <p className="mb-4">
          Data provided by Marvel. © 2025 MARVEL
        </p>
        <p className="mb-4">
          This website is for educational purposes only. All Marvel characters, comics, and related content are property of Marvel Entertainment, LLC.
        </p>
        <div className="flex flex-wrap gap-4 mt-6">
          <Link href="/" className="comic-button">
            Return Home
          </Link>
          <a 
            href="https://developer.marvel.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="comic-button bg-gray-800 text-white"
          >
            Marvel API Docs
          </a>
          <a 
            href="https://github.com/JuanPabloDiaz/marvel" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="comic-button bg-[#333] text-white"
          >
            GitHub Repository
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
