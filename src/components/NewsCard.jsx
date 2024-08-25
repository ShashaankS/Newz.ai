// src/components/NewsCard.js
import React from 'react';

function NewsCard({ article }) {
  const { urlToImage, title, description, source, publishedAt, url } = article;

  const formattedDate = new Date(publishedAt).toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
  });

  const summarize = (article)=>{
    console.log("fetch");
  }
  // Handling missing image and description
  const handleImageError = (e) => {
    e.target.src = 'src/assets/404.jpg'; // Provide a placeholder image
  };

  return (
    <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 transition-transform transform hover:scale-105"
        tabIndex={0}
        >
    <div
      className="relative mx-4 -mt-6 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
      <img
        src={urlToImage || 'src/assets/404.jpg'}
        alt={title || 'News image'}
        className="w-full h-48 object-cover" 
        onError={handleImageError}/>
    </div>
    <div className="p-6">
      <h5 className="block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 truncate">
      {title}
      </h5>
      <h6 className="text-gray-400 text-xs mb-2">
           {source.name} · {formattedDate}
         </h6>
      <p className="block font-sans text-base antialiased font-light leading-relaxed text-inherit truncate">
        {description}
      </p>
    </div>
    <div className="flex justify-between p-6 pt-0">
      <button
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        type="button"
        onClick={() => window.open(url, '_blank')}
        >
        Read More
      </button>
      <button
        className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
        type="button"
        onClick={summarize}
        >
        Summarize
      </button>
    </div>
  </div> 
  );
}

export default NewsCard;
