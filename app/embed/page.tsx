'use client';

import { UserButton } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

// Dynamically import LowcoderAppWrapper with SSR disabled
const LowcoderAppWrapper = dynamic(
  () => import('../../components/LowcoderAppWrapper'),
  { ssr: false }
);

export default function EmbedPage() {
  const appId = process.env.NEXT_PUBLIC_LOWCODER_APP_ID || '694e246cec31655d53bca4de';
  const baseUrl = process.env.NEXT_PUBLIC_LOWCODER_BASE_URL || 'https://app.lowcoder.cloud';

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      <header className="bg-white shadow-sm flex-shrink-0">
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

      <main className="flex-1 overflow-hidden">
        <LowcoderAppWrapper
          appId={appId}
          baseUrl={baseUrl}
        />
      </main>
    </div>
  );
}
