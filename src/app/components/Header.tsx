"use client";
import React, { useState } from 'react';
import Link from 'next/link'; // Make sure Link is imported from next/link

// Import ComponentTypeKey to use the keys directly
import { ComponentTypeKey } from "../constants/data";

const Header: React.FC = () => {
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);

  // Product categories data - Use query parameters for hrefs
  const productCategories = [
     {
       title: '',
       items: [
           // --- UPDATED HREFs with Query Parameters ---
           { name: 'CPUs', key: 'cpu' as ComponentTypeKey, href: '/Product?category=cpu' },
           { name: 'CPU Coolers', key: 'cpuCooler' as ComponentTypeKey, href: '/Product?category=cpuCooler' },
           { name: 'Motherboards', key: 'motherboard' as ComponentTypeKey, href: '/Product?category=motherboard' },
           { name: 'Memory', key: 'memory' as ComponentTypeKey, href: '/Product?category=memory' },
           { name: 'Storage', key: 'storage' as ComponentTypeKey, href: '/Product?category=storage' },
           { name: 'Video Cards', key: 'videoCard' as ComponentTypeKey, href: '/Product?category=videoCard' },
           { name: 'Power Supplies', key: 'powerSupply' as ComponentTypeKey, href: '/Product?category=powerSupply' },
           { name: 'Cases', key: 'case' as ComponentTypeKey, href: '/Product?category=case' },
           // --- END UPDATED HREFs ---
       ]
     }
  ];

  // Navigation items array
   const navItems = [
     { name: 'Builder', href: '/', hasDropdown: false },
     // Main "Products" link might go to the page without a category, or the first one
     { name: 'Products', href: '/Product', hasDropdown: false },
     { name: 'Guides', href: '/guide', hasDropdown: false },
   ];


  return (
    <header className="bg-[#202029] text-gray-300 border-b border-gray-700">
      {/* Main Navigation Bar */}
      <nav className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-14">

          {/* Logo on the Left */}
          <div className="flex-shrink-0 mr-6">
            <Link href="/" className="text-yellow-500 font-bold text-lg uppercase tracking-wider">
              OHMYPC
            </Link>
          </div>

          {/* Separator */}
          <span className="text-gray-600 mr-6">|</span>

          {/* Navigation Links */}
          <ul className="flex items-center space-x-6 lg:space-x-8">
            {navItems.map((item) => (
              <li
                key={item.name}
                className={item.hasDropdown ? 'relative' : ''}
                onMouseEnter={item.hasDropdown ? () => setIsProductsOpen(true) : undefined}
                onMouseLeave={item.hasDropdown ? () => setIsProductsOpen(false) : undefined}
              >
                <Link
                  href={item.href}
                  className="text-sm font-bold hover:text-white transition-colors duration-150"
                >
                  {item.name}
                </Link>

                {/* Products Dropdown */}
                {item.hasDropdown && isProductsOpen && (
                  <div
                    className="absolute left-0 top-full mt-1 w-auto min-w-[180px] z-20"
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                  >
                    <div className="bg-[#2c2c3a] rounded-md shadow-lg p-4">
                       {/* Use item's key for React key */}
                      {productCategories[0].items.map(product => (
                        <div key={product.key} className="py-1">
                          <Link
                            href={product.href} // Uses the updated hrefs with query params
                            className="block text-sm text-gray-300 hover:text-white transition-colors duration-150"
                            // Close dropdown on click (optional)
                            onClick={() => setIsProductsOpen(false)}
                          >
                            {product.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;