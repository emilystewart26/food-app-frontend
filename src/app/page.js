'use client';
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { useUser, useAuth } from '@clerk/nextjs';
import axios from 'axios';
import { useApiClient } from '../hooks/useApiClient';
import { Peralta } from "next/font/google";

const peraltaFont = Peralta({
  subsets: ["latin"],
  weight: "400"
});


export default function Home() {
  const { user, isSignedIn,isLoaded } = useUser();
  const [syncStatus, setSyncStatus] = useState('');
  const [city, setCity] = useState('');
  const router = useRouter();
  const apiClient = useApiClient();
  

  // One-time sync logic after sign-in
    useEffect(() => {
    if (!isSignedIn || !user || !apiClient) return;

    const role = user.publicMetadata?.role;
    const setupComplete = user.publicMetadata?.setupComplete;

    if (!role && !setupComplete) {
      router.replace("/complete-profile");
      return;
    }

    const syncClerkUser = async () => {
      try {
        const res = await apiClient.apiCall("post", "users/clerk/sync", { role });
        setSyncStatus(res.message || "Sync complete");
      } catch (err) {
        console.error("Sync error:", err);
        setSyncStatus("Clerk sync failed");
      }
    };
    syncClerkUser();
  }, [isSignedIn, user, apiClient,router]); 


  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      router.push(`/browse?city=${encodeURIComponent(city.trim())}`);
    }
  };

  const displayName = user?.username || user?.emailAddresses?.[0]?.emailAddress || "Guest";

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat bg-object-bottom"
      style={{ backgroundImage: "url('/images/backdrop.jpg')" }}>
    <div className="h-screen container m-auto px-6 pt-10 md:px-12 lg:pt-10 lg:px-7">
      <div className="p-6">     
        {isLoaded && isSignedIn && (
          <>
            <h1 className="text-xl font-semibold mb-2 text-slate-700">
              Welcome, {displayName}
            </h1>
            {syncStatus && (
              <p className="text-sm text-slate-600">{syncStatus}</p>
            )}
          </>
        )}
      </div>

      <div className="relative lg:py-20 xl:py-20">
        <h1 className={`${peraltaFont.className} font-bold text-4xl text-slate-600 md:text-5xl text-center pb-10`}>
  Hungry?
</h1>
        <h3 className="font-bold text-2xl text-slate-600 text-center">
          Find local, independent establishments on your doorstep.
        </h3>

        <form onSubmit={handleSubmit} className="w-full mt-12">
          <div className="relative flex p-1 rounded-full bg-white border border-slate-500 shadow-md md:p-2 w-1/2 mx-auto">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter your location..."
              className="w-full p-4 rounded-full pr-32"
            />
            <button
              type="submit"
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full text-center transition bg-gradient-to-b from-amber-500 to-amber-600 active:from-yellow-400 px-8 h-12 flex items-center justify-center overflow-hidden font-semibold text-white group"
            >
              <span>Search</span>
              <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-5 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                >
                  <path
                    d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                    fill="currentColor"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}
