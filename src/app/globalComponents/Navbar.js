"use client";
import React from 'react';
// import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  // const { isLoggedIn, logout } = useAuth();

  return (
   <nav className="block w-full max-w-screen-lg px-4 py-2 mx-auto bg-slate-500 shadow-xl rounded-lg lg:px-8 lg:py-3 backdrop-blur-sm bg-opacity-90">
  <div className="container flex flex-wrap items-center justify-between mx-auto text-slate-800">
    <a href="/" className="mr-4 block cursor-pointer py-1.5 text-2xl text-white font-semibold">
      Food App
    </a>
    <div className="hidden lg:block">
      <ul className="flex flex-col gap-2 mt-2 mb-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <li className="flex items-center p-1 text-sm gap-x-2 text-white hover:scale-110 duration-300">
          <a href="./dashboard" className="flex items-center">Dashboard</a>
        </li>
        <li className="flex items-center p-1 text-sm gap-x-2 text-white hover:scale-110 duration-300">
          <a href="./create" className="flex items-center">Create</a>
        </li>
        <li className="flex items-center p-1 text-sm gap-x-2 text-white hover:scale-110 duration-300">
          <a href="./browse" className="flex items-center">Browse</a>
        </li>
        <button className="flex items-center p-1 text-sm gap-x-2 text-white rounded-xl bg-amber-500 px-4 py-2 hover:bg-amber-600 duration-300">
          <a href="./login" className="flex items-center">Login</a>
        </button>
      </ul>
    </div>
  </div>
</nav>
  );
};

export default Navbar;