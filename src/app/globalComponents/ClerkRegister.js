'use client';
import { SignUp } from '@clerk/nextjs';
import { useEffect, useState } from 'react';


export default function ClerkRegister() {
  
  return (
    <div className="flex flex-col items-center my-2 min-h-screen px-4">    
        <SignUp
          path="/register"
          fallbackRedirectUrl="/" 
          signInUrl="/login"
          appearance={{
            elements: {
              card: "shadow-xl rounded-xl py-6",
            },
          }}
          signUpFields={[
            {
              name: 'username',
              label: 'Username',
              placeholder: 'e.g. coolrabbit',
              type: 'text',
            },
            {
              name: 'email_address',
              label: 'Email',
              type: 'email',
            },
            {
              name: 'password',
              label: 'Password',
              type: 'password',
              placeholder: 'Min 8 chars, 1 cap, 1 number, 1 symbol',
            },
          ]}
        />
      
    </div>
  );
}
