"use client";
import React from "react";
//import ClerkLogin from "../globalComponents/ClerkLogin";
import dynamic from 'next/dynamic';
const ClerkLogin = dynamic(() => import('../../globalComponents/ClerkLogin'), { ssr: false });


export default function LoginPage() {
  return (
      <div className="h-screen bg-cover bg-center bg-no-repeat bg-object-bottom"
      style={{ backgroundImage: "url('/images/backdrop.jpg')" }}>
      <ClerkLogin />
      </div>
  );
}