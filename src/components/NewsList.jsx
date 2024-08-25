// src/components/NewsList.js
import React from 'react';
import NewsCard from './NewsCard';

function NewsList({ articles }) {
  return (
    <main className="py-8 bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-24">
          {articles.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </main>
    
  );
}

export default NewsList;
