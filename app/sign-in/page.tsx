'use client';

import { SignIn, useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if Clerk has loaded and user is signed in
    if (isLoaded && isSignedIn) {
      router.push('/embed');
    }
  }, [isLoaded, isSignedIn, router]);

  // Show loading state while Clerk is initializing
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render SignIn if user is signed in (redirect will happen via useEffect)
  if (isSignedIn) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignIn 
        forceRedirectUrl="/embed"
        signUpForceRedirectUrl="/embed"
      />
    </div>
  );
}
