// components/Footer.tsx (or wherever you place it)
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center text-xs text-gray-600 dark:text-gray-400 py-6 mt-12 border-t border-gray-300 dark:border-gray-700">
  <div className="max-w-5xl mx-auto px-4 space-y-4">
    
    {/* Disclaimer Section */}
    <div className="border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md text-yellow-800 dark:text-yellow-300">
      <p className="font-semibold">Disclaimer:</p>
      <p>
        This tool checks PC component compatibility using specification-based logic. Although care is taken with data accuracy, some mismatches may occur.
        <strong className="block mt-1">Please double-check compatibility with official product documentation.</strong>
      </p>
    </div>

    {/* Minimal Info & Version */}
    <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-1 sm:space-y-0 pt-3">
      <p>&copy; {new Date().getFullYear()} OHMYPC</p>
      <span className="hidden sm:inline">|</span>
      <p>Version 1.0.0</p>
      <span className="hidden sm:inline">|</span>
      <p>Last updated: May 2025</p>
    </div>
  </div>
</footer>
  );
}


