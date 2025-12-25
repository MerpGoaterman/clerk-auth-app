'use client';

import { UserButton } from '@clerk/nextjs';
import { useState } from 'react';

export default function EmbedPage() {
  const [embedUrl, setEmbedUrl] = useState('');
  const [currentEmbed, setCurrentEmbed] = useState('');

  const handleEmbed = () => {
    setCurrentEmbed(embedUrl);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">Embed Page</h1>
          <UserButton />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Embed Content</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={embedUrl}
              onChange={(e) => setEmbedUrl(e.target.value)}
              placeholder="Enter URL to embed (e.g., https://example.com)"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleEmbed}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Embed
            </button>
          </div>
        </div>

        {currentEmbed && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 bg-gray-100 border-b">
              <p className="text-sm text-gray-600">Embedded: {currentEmbed}</p>
            </div>
            <div className="relative" style={{ height: 'calc(100vh - 300px)' }}>
              <iframe
                src={currentEmbed}
                className="w-full h-full border-0"
                title="Embedded Content"
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
            </div>
          </div>
        )}

        {!currentEmbed && (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No content embedded</h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter a URL above to embed content on this page.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
