'use client';
import { SignIn } from '@clerk/nextjs';

export default function ClerkLogin() {
  return (
    <div className="flex justify-center items-center h-screen px-4">
      <SignIn
        appearance={{
          elements: {
            card: "shadow-lg p-6 rounded-lg",
          },
        }}
        afterSignInUrl="/" // deprecated - NEED TO FIND OUT HOW TO REPLACE !!!
        signUpUrl="/register" 
      />
    </div>
  );
}
