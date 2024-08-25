// src/components/Navbar.js
import React from 'react';

function Navbar({ setCategory, searchQuery, setSearchQuery, handleSearch }) {
  const categories = ['Cricket', 'India', 'Technology', 'Politics'];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* <a href="/" className="flex items-center">
          <img src="/images/logo.png" alt="logo" className="h-8" />
        </a> */}
        <div className="flex-grow">
          <ul className="flex space-x-4 gap-4">
            {categories.map(category => (
              <li
                key={category}
                className="cursor-pointer hover:text-gray-400"
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="e.g. Science"
          />
          <button
            className="px-4 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
