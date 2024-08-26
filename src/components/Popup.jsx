// src/components/Popup.js
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Popup({ article, onClose }) {
  const { title, description, source, publishedAt, url } = article;
  const [xurl, setUrl] = useState('');
  const token = "20738c3e64e9d405b3033df64232533f";
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  

  const formattedDate = new Date(publishedAt).toLocaleString('en-US', {
    timeZone: 'Asia/Jakarta',
  });

  const handleSummarize = async () => {
    setError('');
    setSummary('');

    try {
      const response = await fetch('http://127.0.0.1:5000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, token }),
      });

      const data = await response.json();

      if (response.ok) {
        setSummary(data.summary);
      } else {
        setError(data.error || 'Failed to summarize the article.');
      }
    } catch (err) {
      setError('Error fetching summary. Please try again.');
    }
  };

  useEffect(() => {
    if (url) {
      handleSummarize();
    }
  }, [url]);


  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-3xl mx-4 w-full">
        <h2 className="text-2xl font-semibold mb-4">{title}</h2>
        <h3 className="text-gray-600 text-sm mb-4">
          {source.name} · {formattedDate}
        </h3>
        <h3 className="text-gray-900 text-lg mb-2 underline">
          Summary :
        </h3>

        {summary && <p>{summary}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {/* <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mb-6 block"
        >
          Read Full Article
        </a> */}
        <button
          onClick={onClose}
          className="bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-700 mt-4"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
}

export default Popup;
