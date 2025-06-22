"use client"
import React from 'react';
import ClerkRegister from '../../globalComponents/ClerkRegister'; 

export default function RegisterPage() {
  return (
    <div className="h-screen bg-cover bg-center bg-no-repeat bg-object-bottom"
    style={{ backgroundImage: "url('/images/backdrop.jpg')" }}>
     <ClerkRegister />
    </div>
  );
}
