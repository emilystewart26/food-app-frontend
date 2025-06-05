"use client";

import React from "react";
import RegisterForm from "../../globalComponents/RegisterForm";
import { SignUpButton } from "@clerk/nextjs";

export default function RegisterPage() {
  return (
    <div className="max-w-md mx-auto mt-20">
      <RegisterForm />

      <div className="text-center mt-6">
        <p className="text-gray-500 mb-2">or</p>

        <SignUpButton mode="modal" redirecturl="/dashboard">
          <button className="w-full bg-blue-600 border border-gray-300 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
            Continue with Google
          </button>
        </SignUpButton>
      </div>
    </div>
  );
}
