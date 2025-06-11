'use client';

import { useRouter } from 'next/navigation';

export default function UnauthorizedPage() {
    const router = useRouter();
    
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Unauthorized Access
        </h1>
        <p className="text-gray-600 mb-6">
          Please log in to access this page.
        </p>
        <button
          onClick={() => router.push('/login')}
          className="hover:cursor-pointer rounded-full text-center transition bg-gradient-to-b from-amber-500 to-amber-600 active:from-yellow-400 px-8 h-12 items-center justify-center overflow-hidden font-semibold text-white mx-auto"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
}