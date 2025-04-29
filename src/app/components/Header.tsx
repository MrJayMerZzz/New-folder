import React, { useState } from 'react';
import Link from 'next/link'; // Make sure Link is imported from next/link

const Header: React.FC = () => {
  const [isProductsOpen, setIsProductsOpen] = useState<boolean>(false);

  // Product categories data (remains the same)
  const productCategories = [
      {
        // No title for the first main column, just items
        title: '', // Explicitly empty or remove if layout handles it
        items: [
            { name: 'CPUs', href: '#' }, // Update hrefs later if needed
            { name: 'CPU Coolers', href: '#' },
            { name: 'Motherboards', href: '#' },
            { name: 'Memory', href: '#' },
            { name: 'Storage', href: '#' },
            { name: 'Video Cards', href: '#' },
            { name: 'Power Supplies', href: '#' },
            { name: 'Cases', href: '#' },
        ]
      }
      // Add other category columns here if needed in the future
      // Example:
      // {
      //   title: 'Peripherals',
      //   items: [ ... ]
      // },
  ];

  // Navigation items array
   const navItems = [
     { name: 'Builder', href: '/', hasDropdown: false }, // Keep other hrefs as '#' for now
     { name: 'Products', href: '/Product', hasDropdown: true },
     { name: 'Guides', href: '/guide', hasDropdown: false }, // <<< UPDATED THIS LINE
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
            {/* Use Link for internal navigation */}
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
                {/* Use Link for internal navigation */}
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
                      className="absolute left-0 top-full mt-1 w-auto min-w-[180px] z-20" // Adjusted min-width for single column
                      // Keep open if mouse moves onto the dropdown itself
                      onMouseEnter={() => setIsProductsOpen(true)}
                      onMouseLeave={() => setIsProductsOpen(false)}
                    >
                      <div className="bg-[#2c2c3a] rounded-md shadow-lg p-4"> {/* Simplified padding */}
                        {/* Since there's only one category object, map its items directly */}
                        {productCategories[0].items.map(product => (
                          <div key={product.name} className="py-1"> {/* Added padding around each link */}
                            <Link
                              href={product.href}
                              className="block text-sm text-gray-300 hover:text-white transition-colors duration-150"
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

          {/* Right Side Search */}
          <div>

          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
