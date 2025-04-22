// components/Header.tsx
import React, { useState } from 'react';
import Link from 'next/link';

const Header: React.FC = () => {
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);

  // ... (productCategories data remains the same)
  const productCategories = [
      {
        items: [
            { name: 'CPUs', href: '#' },
            { name: 'CPU Coolers', href: '#' },
            { name: 'Motherboards', href: '#' },
            { name: 'Memory', href: '#' },
            { name: 'Storage', href: '#' },
            { name: 'Video Cards', href: '#' },
            { name: 'Power Supplies', href: '#' },
            { name: 'Cases', href: '#' },
        ]
      }//,
      //{
        //title: 'Peripherals',
        //items: [
            //{ name: 'Headphones', href: '#' },
            //{ name: 'Keyboards', href: '#' },
            //{ name: 'Mice', href: '#' },
            //{ name: 'Speakers', href: '#' },
            //{ name: 'Webcams', href: '#' },
        //],
      //},
     // {
        //title: 'Expansion',
        //items: [
            //{ name: 'Monitors', href: '#' },
            //{ name: 'Software', href: '#' },
            //{ name: 'Operating Systems', href: '#' },
        //],
      //},
      //{
        //title: 'Accessories',
        //items: [
            //{ name: 'Sound Cards', href: '#' },
            //{ name: 'Wired Networking', href: '#' },
            //{ name: 'Wireless Networking', href: '#' },
            //{ name: 'Case Fans', href: '#' },
            //{ name: 'Fan Controllers', href: '#' },
            //{ name: 'Thermal Compound', href: '#' },
            //{ name: 'External Hard Drives', href: '#' },
            //{ name: 'Optical Drives', href: '#' },
            //{ name: 'Removable Storage', href: '#' },
        //],
      //},
  ];

  const displayCategories = productCategories;

  // ... (navItems remain the same)
   const navItems = [
     { name: 'Builder', href: '#', hasDropdown: false },
     { name: 'Products', href: '#', hasDropdown: true },
     { name: 'Guides', href: '#', hasDropdown: false }//,
     //{ name: 'Completed Builds', href: '#', hasDropdown: false },
     //{ name: 'Trends', href: '#', hasDropdown: false },
     //{ name: 'Benchmarks', href: '#', hasDropdown: false },
   ];


  return (
    <header className="bg-[#202029] text-gray-300">
      {/* Top Bar */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-10 border-b border-gray-700">
          {/* Logo */}
          <div className="flex-shrink-0">
              <Link href="/" className="text-yellow-500 font-bold text-lg uppercase tracking-wider">
                OHMYPC
              </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Left Navigation Links */}
          <ul className="flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={item.hasDropdown ? 'relative' : ''}
                // Use dedicated hover state for the list item itself
                onMouseEnter={item.hasDropdown ? () => setIsProductsOpen(true) : undefined}
                onMouseLeave={item.hasDropdown ? () => setIsProductsOpen(false) : undefined}
              >
                <Link
                  href={item.href}
                  className="text-sm font-medium hover:text-white transition-colors duration-150"
                >
                  {item.name}
                </Link>

                {/* Products Dropdown */}
                {/* Conditionally render based on state */}
                {item.hasDropdown && isProductsOpen && (
                    <div
                      className="absolute left-0 top-full mt-1 w-auto min-w-[600px] z-20"
                      // Keep open if mouse moves onto the dropdown itself
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      {/* THIS IS THE KEY PART FOR LEFT-TO-RIGHT COLUMNS */}
                      <div className="bg-[#2c2c3a] rounded-md shadow-lg p-6 grid grid-cols-4 gap-x-8 gap-y-4">
                        {displayCategories.map(category => (
                          // Each category div becomes a grid item (column content)
                          <div key={category.title} className="space-y-2">
                            <h3 className="font-semibold text-sm text-gray-400 uppercase tracking-wider mb-3">
                              {category.title}
                            </h3>
                            {/* Items within the category stack vertically */}
                            <ul className="space-y-1">
                              {category.items.map(product => (
                                <li key={product.name}>
                                  <Link
                                    href={product.href}
                                    className="block text-sm text-gray-300 hover:text-white transition-colors duration-150"
                                  >
                                    {product.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                )}
              </li>
            ))}
          </ul>

          {/* Right Side Search */}
          <div>
            <button aria-label="Search" className="p-2 hover:text-white transition-colors duration-150">
              {/* You'll need an SVG or Icon component here for the search icon */}
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;