'use client';

import { UserButton } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

// Dynamically import LowcoderAppWrapper with SSR disabled
const LowcoderAppWrapper = dynamic(
  () => import('../../components/LowcoderAppWrapper'),
  { ssr: false }
);

export default function EmbedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">HonestStok Tools</h1>
          <UserButton 
            afterSignOutUrl="/sign-in"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }}
          />
        </div>
      </header>

      <main className="flex-1 relative">
        <LowcoderAppWrapper
          appId="694b54e5cefb1b01e5640058"
          baseUrl="https://tools.honeststok.co"
        />
      </main>
    </div>
  );
}
