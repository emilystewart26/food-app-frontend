"use client";
import React from "react";
import LoginForm from "../globalComponents/LoginForm";


export default function LoginPage() {
  return (
      <div className="h-screen bg-cover bg-center bg-no-repeat bg-object-bottom"
      style={{ backgroundImage: "url('/images/backdrop.jpg')" }}>
      <LoginForm />
      </div>
  );
}