// components/Footer.tsx (or wherever you place it)
import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-center text-xs text-gray-600 dark:text-gray-400 py-6 mt-12 border-t border-gray-300 dark:border-gray-700">
      <div className="max-w-5xl mx-auto px-4 space-y-3">
        {/* Disclaimer Section */}
        <div className="border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/30 p-3 rounded-md text-yellow-800 dark:text-yellow-300">
          <p className="font-semibold">Disclaimer:</p>
          <p>
            This tool provides component compatibility checks based on available specifications. While we strive for accuracy, data may contain errors or omissions, and compatibility rules can be complex. Prices and specifications are illustrative and subject to change.
            <strong className="block mt-1">Always verify component compatibility and final pricing with manufacturer documentation and retailers before purchasing.</strong>
          </p>
        </div>

        {/* Links and Copyright Section */}
        <div className="flex flex-col sm:flex-row justify-center items-center sm:space-x-4 space-y-1 sm:space-y-0 pt-3">
           <p>&copy; {currentYear} [Your Name / Project Name].</p>
           {/* Separator for larger screens */}
           <span className="hidden sm:inline">|</span>
           <a
             href="[Link_To_Your_Feedback_Form_or_GitHub_Issues]" // <-- Replace with your actual link
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-indigo-600 dark:hover:text-indigo-400 underline"
           >
             Report Data Issue / Feedback
           </a>
            {/* Separator for larger screens */}
           <span className="hidden sm:inline">|</span>
           <a
             href="[Link_To_Your_Project_Repo_or_Website]" // <-- Replace with your actual link
             target="_blank"
             rel="noopener noreferrer"
             className="hover:text-indigo-600 dark:hover:text-indigo-400 underline"
           >
             View Project / Source
           </a>
           {/* Example: Optionally add data source info */}
           {/* <span className="hidden sm:inline">|</span> */}
           {/* <p>Data primarily based on manufacturer specs.</p> */}
        </div>
      </div>
    </footer>
  );
}