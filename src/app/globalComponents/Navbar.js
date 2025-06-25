"use client";

import React, { useState } from "react";
import {
  UserButton,
  SignedIn,
  SignedOut,
  SignOutButton,
  useUser,
} from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return null;

  const role = user?.publicMetadata?.role || "user";

  const canView = {
    dashboard: role === "user" || role === "admin",
    create: role === "vendor" || role === "admin",
    browse: true,
  };

  const renderLinks = () => (
    <>
      {canView.dashboard && (
        <li>
          <a href="/dashboard" className="text-md hover:text-lg duration-300">Dashboard</a>
        </li>
      )}
      {canView.create && (
        <li>
          <a href="/create" className="text-md hover:text-lg duration-300">Create</a>
        </li>
      )}
      {canView.browse && (
        <li>
          <a href="/browse" className="text-md hover:text-lg duration-300">Browse</a>
        </li>
      )}
    </>
  );

  return (
    <nav className="block w-full px-4 py-2 bg-slate-500 shadow-xl rounded-lg lg:px-8 lg:py-3 backdrop-blur-sm bg-opacity-90">
      <div className="flex items-center justify-between text-white">
        <a href="/" className="block cursor-pointer py-1.5 text-2xl font-semibold">
          Food App
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Menu */}
        <div className="hidden lg:block">
          <ul className="flex flex-row items-center gap-6">
            {renderLinks()}
            <SignedOut>
              <li>
                <a
                  href="/login"
                  className="rounded-full transition bg-gradient-to-b from-amber-500 to-amber-600 px-6 h-8 flex items-center font-semibold text-white hover:cursor-pointer"
                >
                  Login
                </a>
              </li>
            </SignedOut>
            <SignedIn>
              <li>
                <SignOutButton>
                  <button className="rounded-full transition bg-gradient-to-b from-amber-500 to-amber-600 px-6 h-8 flex items-center font-semibold text-white hover:cursor-pointer">
                    Sign Out
                  </button>
                </SignOutButton>
              </li>
              <li><UserButton afterSignOutUrl="/" /></li>
            </SignedIn>
          </ul>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-4">
          <ul className="flex flex-col gap-4 text-white">
            {renderLinks()}
            <SignedOut>
              <li>
                <a
                  href="/login"
                  className="rounded-full transition bg-gradient-to-b from-amber-500 to-amber-600 px-6 h-8 flex items-center justify-center font-semibold text-white hover:cursor-pointer"
                >
                  Login
                </a>
              </li>
            </SignedOut>
            <SignedIn>
              <li>
                <SignOutButton>
                  <button className="rounded-full transition bg-gradient-to-b from-amber-500 to-amber-600 px-6 h-8 flex items-center justify-center font-semibold text-white hover:cursor-pointer">
                    Sign Out
                  </button>
                </SignOutButton>
              </li>
              <li><UserButton afterSignOutUrl="/" /></li>
            </SignedIn>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;