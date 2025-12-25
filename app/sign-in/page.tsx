import { SignIn } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export default async function SignInPage() {
  const { userId } = await auth();
  
  // If user is already signed in, redirect to embed page
  if (userId) {
    redirect('/embed');
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
