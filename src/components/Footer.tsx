"use client";

import React from "react";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Data provided by Marvel. © {currentYear} MARVEL
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
              This website is for educational purposes only.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link
              href="/about"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--marvel-red)] transition-colors"
            >
              About
            </Link>
            <a
              href="https://developer.marvel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--marvel-red)] transition-colors"
            >
              Marvel API
            </a>
            <a
              href="https://github.com/JuanPabloDiaz/marvel"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-[var(--marvel-red)] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
